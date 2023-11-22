function Navbar() {
	return (
		<header className="flex justify-around	">
			<img src="https://picsum.photos/100" alt="logo" />
			<nav className="flex">
				<ul className="flex items-center gap-4">
					<li>Accueil</li>
					<li>Lorem ipsum</li>
					<li>Contact</li>
				</ul>
			</nav>
		</header>
	);
}

export default Navbar;
