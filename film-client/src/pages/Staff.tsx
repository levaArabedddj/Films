import { useEffect, useState } from 'react';
import ActorTable from '../components/ActorTable';
import CrewMemberTable from '../components/CrewMemberTable';
import { Actor, CrewMember } from '../types/response/films';
import staffService from '../services/staff-service';

const Staff = () => {
	const [actors, setActors] = useState<Actor[]>([]);
	const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);

	useEffect(() => {
		try {
			const getActors = async () => {
				const response = await staffService.getActors();
				setActors(response);
			};
			const getCrewMembers = async () => {
				const response = await staffService.getCrewMembers();
				setCrewMembers(response);
			};
			getActors();
			getCrewMembers();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className="flex flex-col gap-6">
			<ActorTable actors={actors} />
			<CrewMemberTable crewMembers={crewMembers} />
		</div>
	);
};

export default Staff;
