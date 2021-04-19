import React from 'react';

import './styles.css';

export default ({ black }) => {
	return (
		<header className={ black ? 'black' : '' }>
			<div className="header--logo">
				<a href="/">
					<img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-5.png" alt="Netflix" />
				</a>
			</div>

			<div className="header--user">
				<a href="/">
					<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="Usuário" />

				</a>
			</div>
		</header>
	);
}
