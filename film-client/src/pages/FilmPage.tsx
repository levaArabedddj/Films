import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import filmService from '../services/film-service';
import { FullFilmResponse } from '../types/response/films';
import ShootingDayPopup from '../components/ShootingDayPopup';
import FinancePopup from '../components/FinancePopup';
import ScriptPopup from '../components/ScriptPopup';
import scriptService from '../services/script-service';
import shootingDayService from '../services/shootingDay-service';
import financeService from '../services/finance-service';
import AssignActorPopup from '../components/AssignActorPopup';
import AssignCrewPopup from '../components/AssignCrewPopup';
import staffService from '../services/staff-service';

const FilmPage = () => {
	const { id } = useParams();
	const [film, setFilm] = useState<FullFilmResponse>();
	const [loading, setLoading] = useState(true);
	const [isShootingDayPopupOpen, setShootingDayPopupOpen] = useState(false);
	const [isFinancePopupOpen, setFinancePopupOpen] = useState(false);
	const [isScriptPopupOpen, setScriptPopupOpen] = useState(false);
    const [isActorPopupOpen, setActorPopupOpen] = useState(false);
	const [isCrewPopupOpen, setCrewPopupOpen] = useState(false);

	useEffect(() => {
		const getAllFilmData = async () => {
			try {
				if (!id) throw Error('Id is undefined');
				const data = await filmService.getOneWithDetails(+id);
				setFilm(data);
			} catch (error) {
				console.log('error', error);
			} finally {
				setLoading(false);
			}
		};
		getAllFilmData();
	}, []);

	if (!film || !id) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-8 max-w-4xl mx-auto ">
			<h1 className="text-3xl font-bold mb-4">{film.title}</h1>
			<p className="text-gray-700 dark:text-gray-400 mb-4">
				{film.description}
			</p>

			<div className="mb-6 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-800">
						<tr>
							<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
								Genre
							</th>
							<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
								Created At
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
						<tr>
							<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
								{film.genre}
							</td>
							<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
								{film.createdAt}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{/* Shooting Days */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Shooting Days</h2>
				<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
					<table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-800">
							<tr>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Date
								</th>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Location
								</th>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Duration (hours)
								</th>

								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
							{film.shootingDay.map((day) => (
								<tr key={day.id}>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										{new Date(day.shooting_day).toDateString()}
									</td>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										{day.shooting_location}
									</td>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										{day.estimated_duration_hours}
									</td>

									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<button
											onClick={async () => {
												await shootingDayService.delete(+id, day.id);
												window.location.reload();
											}}
											className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
									</td>
								</tr>
							))}

							<tr>
								<td colSpan={6} className="px-4 py-4 text-center">
									<button
										onClick={() => setShootingDayPopupOpen(true)}
										className="text-blue-600 dark:text-blue-400 hover:underline"
									>
										+ Add new shooting day
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* Finance */}
			{
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Finance</h2>
					<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-800">
								<tr>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Budget
									</th>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Actor Salary
									</th>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Crew Salary
									</th>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Advertising Cost
									</th>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Editing Cost
									</th>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Equipment Cost
									</th>

									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
								{film.finance?.id && (
									<tr>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											${film.finance?.budget}
										</td>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											${film.finance?.actor_salary}
										</td>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											${film.finance?.crew_salary}
										</td>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											${film.finance?.advertising_cost}
										</td>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											${film.finance?.editing_cost}
										</td>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											${film.finance?.equipment_cost}
										</td>

										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											<button
												onClick={async () => {
													await financeService.delete(+id);
													window.location.reload();
												}}
												className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-5 h-5"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</button>
										</td>
									</tr>
								)}
								{!film.financeId && (
									<tr>
										<td colSpan={6} className="px-4 py-4 text-center">
											<button
												onClick={() => setFinancePopupOpen(true)}
												className="text-blue-600 dark:text-blue-400 hover:underline"
											>
												+ Create New Film
											</button>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			}

			{/* Script */}
			{
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Script</h2>
					<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-800">
								<tr>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Content
									</th>
									<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
								{film.script?.content && (
									<tr>
										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											{film.script.content}
										</td>

										<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											<button
												onClick={async () => {
													await scriptService.delete(+id);
													window.location.reload();
												}}
												className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-5 h-5"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</button>
										</td>
									</tr>
								)}
								{!film.scriptId && (
									<tr>
										<td colSpan={6} className="px-4 py-4 text-center">
											<button
												className="text-blue-600 dark:text-blue-400 hover:underline"
												onClick={() => setScriptPopupOpen(true)}
											>
												+ Create script for film
											</button>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			}

			{/* Actors */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Actors</h2>

				<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-800">
							<tr>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Name
								</th>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Rating
								</th>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Salary per Hour
								</th>

								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
							{film.actors.map((actor) => (
								<tr key={actor.id}>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										{actor.full_name}
									</td>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										{actor.rating}
									</td>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										${actor.salary_per_hour}
									</td>

									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<button
											onClick={async () => {
												await staffService.unassignActor(actor.id, film.id)
												window.location.reload();
											}}
											className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
									</td>
								</tr>
							))}

							<tr>
								<td colSpan={6} className="px-4 py-4 text-center">
									<button className="text-blue-600 dark:text-blue-400 hover:underline"
									onClick={() => setActorPopupOpen(true)}	
									>
										+ Assign actor
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* Crew Members */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Crew Members</h2>
				<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-800">
							<tr>
								<th
									scope="col"
									className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Salary per Hour
								</th>
								<th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
							{film.crew_members.map((member) => (
								<tr key={member.id}>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										{member.full_name}
									</td>
									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										${member.salary_per_hour}
									</td>

									<td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<button
											onClick={async () => {
												await staffService.unassignCrewMember(member.id, film.id)
												window.location.reload();
											}}
											className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
									</td>
								</tr>
							))}

							<tr>
								<td colSpan={6} className="px-4 py-4 text-center">
									<button
										onClick={() => {setCrewPopupOpen(true)}}
										className="text-blue-600 dark:text-blue-400 hover:underline"
									>
										+ Assign crew member
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<ShootingDayPopup
				isOpen={isShootingDayPopupOpen}
				onClose={() => setShootingDayPopupOpen(false)}
			/>
			<FinancePopup
				isOpen={isFinancePopupOpen}
				onClose={() => setFinancePopupOpen(false)}
			/>
			<ScriptPopup
				isOpen={isScriptPopupOpen}
				onClose={() => setScriptPopupOpen(false)}
			/>
			<AssignCrewPopup
				filmId={film.id}
				isOpen={isCrewPopupOpen}
				onClose={() => setCrewPopupOpen(false)}
			/>
			<AssignActorPopup
				filmId={film.id}
				isOpen={isActorPopupOpen}
				onClose={() => setActorPopupOpen(false)}
			/>
		</div>
	);
};

export default FilmPage;
