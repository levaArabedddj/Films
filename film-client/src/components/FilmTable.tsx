import { Link } from 'react-router-dom';
import { Film } from '../types/response/films';
import filmService from '../services/film-service';

const FilmTable = ({ films }: { films: Film[] }) => {
	return (
		<section className="container px-4 mx-auto">
			<h2 className="text-lg font-medium text-gray-800 dark:text-white">
				Movies List
			</h2>
			<div className="flex flex-col mt-3">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th
											scope="col"
											className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Title
										</th>
										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Description
										</th>
										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Genre
										</th>
										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											User ID
										</th>
										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Created At
										</th>
										<th scope="col" className="relative py-3.5 px-4">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
									{films &&
										films.map((movie) => (
											<tr key={movie.id}>
												<td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
													{movie.title}
												</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
													{movie.description}
												</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
													{movie.genre}
												</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
													{movie.userId}
												</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
													{new Date(movie.createdAt).toLocaleDateString()}
												</td>
												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<div className="flex items-center gap-x-6">
														<button
															onClick={async () => {
																await filmService.delete(movie.id);
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

														<Link
															to={`/film/${movie.id}`}
															className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
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
																	d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
																/>
															</svg>
														</Link>
													</div>
												</td>
											</tr>
										))}

									<tr>
										<td colSpan={6} className="px-4 py-4 text-center">
											<Link
												to="/film/new"
												className="text-blue-600 dark:text-blue-400 hover:underline"
											>
												+ Create New Film
											</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FilmTable;
