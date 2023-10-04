import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//pages
import HomePage from "./pages/HomePage";
import {
	ArticleDetailsPage,
	RegisterPage,
	LoginPage,
	ProfilePage,
	AdminLayout,
	Admin,
	Comments,
	NewPost,
	ManagePost,
	EditPost,
} from "./pages/pages.js";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";

function App() {
	return (
		<div className="font-opensans">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/blog/:slug" element={<ArticleDetailsPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/faq" element={<Faq />} />
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Admin />} />
					<Route path="posts/manage" element={<ManagePost />} />
					<Route
						path="posts/manage/edit/:slug"
						element={<EditPost />}
					/>
				</Route>
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
