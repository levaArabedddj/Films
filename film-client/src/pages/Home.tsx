import { useEffect, useState } from 'react';
import { Film } from '../types/response/films';
import filmService from '../services/film-service';
import FilmTable from '../components/FilmTable';
import { Link } from 'react-router-dom';

const Home = () => {
	const [films, setFilms] = useState<Film[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await filmService.getMany();
				setFilms(response);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error)
		return (
			<div>
				<p className='mb-3'>Error: {error.response.data.message}</p>
				{error.status === 401 && <Link to="/auth" className='bg-red-600 hover:bg-red-800 p-3 rounded-md'>Got to auth page</Link>}
			</div>
		);
	return (
		<div>
			<FilmTable films={films} />
		</div>
	);
};

export default Home;
