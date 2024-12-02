import { useEffect, useState } from 'react';
import { Actor, CrewMember } from '../types/response/films';
import staffService from '../services/staff-service';
import Popup from './Popup';
import AssignActorTable from './ActorAssignTable';
import CrewAssignTable from './CrewAssignTable';

const AssignCrewPopup: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	filmId: number;
}> = ({ isOpen, onClose, filmId }) => {
	const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);

	useEffect(() => {
		try {
			const getCrewMembers = async () => {
				const response = await staffService.getCrewMembers();
				setCrewMembers(response);
			};
			getCrewMembers();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleAssign = async (crew: CrewMember) => {
		try {
			await staffService.assignCrew(crew.id, filmId);
			window.location.reload();
		} catch (error) {
			console.error(`Failed to assign crew member ${crew.full_name}:`, error);
		}
	};

	return (
		<Popup isOpen={isOpen} onClose={onClose}>
			<div className="overflow-hidden">
				<CrewAssignTable crewMembers={crewMembers} onAssign={handleAssign} />
        
			</div>
		</Popup>
	);
};

export default AssignCrewPopup;
