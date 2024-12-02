import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Layout from './pages/Layout';
import Staff from './pages/Staff';
import Error from './pages/Error';
import FilmPage from './pages/FilmPage';
import FilmCreate from './pages/FilmCreate';
import CrewMemberCreate from './pages/CrewMemberCreate';
import ActorCreate from './pages/ActorCreate';

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/staff" element={<Staff />} />
					<Route path="/film/:id" element={<FilmPage />} />
					<Route path="/film/new" element={<FilmCreate />} />
					<Route path="/actor/new" element={<ActorCreate />} />
					<Route path="/crew/new" element={<CrewMemberCreate />} />
				</Route>
				<Route path="/error" element={<Error />} />
				<Route path="*" element={<Error />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</>
	);
}

export default App;
