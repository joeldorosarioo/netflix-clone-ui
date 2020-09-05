import React, { useEffect, useState } from 'react';

import './App.css';

import Tmdb from './Tmdb';

import AppBar from './components/AppBar';
import FeaturedMovie from './components/FeaturedMovie';
import MovieRow from './components/MovieRow';

export default () => {
	const [movieList, setMovieList] = useState([]);
	const [featuredData, setFeaturedData] = useState(null);
	const [blackAppBar, setBlackAppBar] = useState(false);

	useEffect(() => {
		const loadAll = async () => {
			// Pegando a lista total
			let list = await Tmdb.getHomeList();
			setMovieList(list);

			// Pegando o featured (filme em destaque)
			let originals = list.filter(i => i.slug === 'originals');
			let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
			
			let chosen = originals[0].items.results[randomChosen];
			let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

			setFeaturedData(chosenInfo);			
		}

		loadAll();
	}, []);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setBlackAppBar(true);
			} else {
				setBlackAppBar(false);
			}
		}

		window.addEventListener('scroll', scrollListener);

		return () => {
			window.removeEventListener('scroll', scrollListener);
		}
	}, []);


	return (
		<div className="page">
			<AppBar black={ blackAppBar } />

			{
				featuredData &&
					<FeaturedMovie item={ featuredData } />
			}

			<section className="lists">
				{
					movieList.map((item, key) => (
						<MovieRow key={ key } title={ item.title } items={ item.items } />
					))
				}
			</section>

			<footer>
				Feito com <span role="img" aria-label="coração">❤️</span> por Joel Oliveira<br />
				Todos os direitos das imagens são da Netflix.<br />
				Dados Extraidos do site TheMovieDB.org
			</footer>

			{ movieList.length <= 0 &&
				<div className="loading">
					<img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando..." />
				</div>
			}			
		</div>
	);
}
