import { Link } from 'react-router-dom';

interface Column {
	key: string;
	label: string;
}

interface EntityTableProps<T> {
	data: T[];
	columns: Column[];
	linkPath?: string;
	deleteItem: (id: number) => Promise<void>;
}

const EntityTable = <T extends { id: number }>({
	data,
	columns,
	linkPath,
	deleteItem,
}: EntityTableProps<T>) => {
	return (
		<section className="container px-4 mx-auto">
			<h2 className="text-lg font-medium text-gray-800 dark:text-white">
				Entity List
			</h2>
			<div className="flex flex-col mt-3">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-800">
									<tr>
										{columns.map((column) => (
											<th
												key={column.key}
												scope="col"
												className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>
												{column.label}
											</th>
										))}
										<th scope="col" className="relative py-3.5 px-4">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
									{data.map((item) => (
										<tr key={item.id}>
											{columns.map((column) => (
												<td
													key={column.key}
													className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
												>
													{item[column.key as keyof T]?.toString()}
												</td>
											))}
											<td className="px-4 py-4 text-sm whitespace-nowrap">
												<div className="flex items-center gap-x-6">
													<button
														onClick={async () => {
															await deleteItem(item.id);
															window.location.reload();
														}}
														className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
													>
														Delete
													</button>
												</div>
											</td>
										</tr>
									))}
									<tr>
										<td
											colSpan={columns.length + 1}
											className="px-4 py-4 text-center"
										>
											<Link
												to={`${linkPath}/new`}
												className="text-blue-600 dark:text-blue-400 hover:underline"
											>
												+ Create new
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

export default EntityTable;
