import { Outlet } from "react-router-dom";

function Root() {
	return (
		<div>
			<nav>
				<ul>
					<li>Accueil</li>
					<li>Lorem ipsum</li>
					<li>Contact</li>
				</ul>
			</nav>
			<Outlet />
			<footer>
				<p>Créer avec ❤️ par _votre_team_ </p>
			</footer>
		</div>
	);
}

export default Root;
