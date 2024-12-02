import staffService from '../services/staff-service';
import { Actor } from '../types/response/films';
import EntityTable from './EntityTable';

const ActorTable = ({ actors }: { actors: Actor[] }) => {
	const columns = [
		{ key: 'full_name', label: 'Full Name' },
		{ key: 'rating', label: 'Rating' },
		{ key: 'salary_per_hour', label: 'Salary per Hour' },
	];

	return (
		<EntityTable
			deleteItem={staffService.deleteActor}
			data={actors}
			columns={columns}
			linkPath="/actor"
		/>
	);
};

export default ActorTable;
