import { MainLayout } from "../components/index";
import { Hero, Articles, CTA } from "../pages/pages";

export default function Home() {
	return (
		<MainLayout>
			<Hero />
			<Articles />
			<CTA />
		</MainLayout>
	);
}
