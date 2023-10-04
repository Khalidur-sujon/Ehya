import { Footer, MainLayout } from "../components";
import ContactCard from "../components/ContactCard";
import Header from "../components/Header";

MainLayout;

function Contact() {
	return (
		<>
			<Header />
			<ContactCard />
			<Footer />
		</>
	);
}

export default Contact;
