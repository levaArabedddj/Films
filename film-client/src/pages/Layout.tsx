import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				<div className="px-4 py-2">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Layout;
