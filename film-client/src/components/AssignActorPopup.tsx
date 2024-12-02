import { useEffect, useState } from 'react';
import { Actor } from '../types/response/films';
import staffService from '../services/staff-service';
import Popup from './Popup';
import AssignActorTable from './ActorAssignTable';

const AssignActorPopup: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	filmId: number;
}> = ({ isOpen, onClose, filmId }) => {
	const [actors, setActors] = useState<Actor[]>([]);

	useEffect(() => {
		const getActors = async () => {
			try {
				const response = await staffService.getActors();
				setActors(response);
			} catch (error) {
				console.error('Failed to fetch actors:', error);
			}
		};
		if (isOpen) {
			getActors();
		}
	}, [isOpen]);

	const handleAssign = async (actor: Actor) => {
		try {
			await staffService.assignActor(actor.id, filmId);
			window.location.reload();
			alert(`Assigned ${actor.full_name}`);
		} catch (error) {
			console.error(`Failed to assign actor ${actor.full_name}:`, error);
		}
	};

	return (
		<Popup isOpen={isOpen} onClose={onClose}>
			<div className="overflow-hidden">
				<AssignActorTable actors={actors} onAssign={handleAssign} />
			</div>
		</Popup>
	);
};

export default AssignActorPopup;
