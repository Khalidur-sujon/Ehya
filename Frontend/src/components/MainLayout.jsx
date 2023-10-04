//components
import { Header, Footer } from "./index";

function MainLayout({ children }) {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default MainLayout;
