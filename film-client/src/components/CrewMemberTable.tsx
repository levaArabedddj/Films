import staffService from '../services/staff-service';
import { CrewMember } from '../types/response/films';
import EntityTable from './EntityTable';

const CrewMemberTable = ({ crewMembers }: { crewMembers: CrewMember[] }) => {
	const columns = [
		{ key: 'full_name', label: 'Full Name' },
		{ key: 'salary_per_hour', label: 'Salary per Hour' },
	];

	return (
		<EntityTable
			deleteItem={staffService.deleteCrewMember}
			data={crewMembers}
			columns={columns}
			linkPath="/crew"
		/>
	);
};

export default CrewMemberTable;
