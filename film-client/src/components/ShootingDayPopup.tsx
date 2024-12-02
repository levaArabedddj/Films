import React, { useState } from 'react';
import Popup from './Popup'; // Assuming Popup is already created
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import shootingDayService from '../services/shootingDay-service';
import { useParams } from 'react-router-dom';

const ShootingDayPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose,
}) => {
	const { id } = useParams();
	const [shootingDay, setShootingDay] = useState<string>('');
	const [shootingTime, setShootingTime] = useState<number>(8);
	const [shootingLocation, setShootingLocation] = useState<string>('');
	const [estimatedDuration, setEstimatedDuration] = useState<number>(5);

	const handleSubmit = () => {
		if (!id) throw new Error();

		shootingDayService
			.create(
				{
					shooting_day: new Date(shootingDay).toISOString(),
					shooting_time: shootingTime,
					shooting_location: shootingLocation,
					estimated_duration_hours: estimatedDuration,
				},
				+id
			)
			.then(() => {
				window.location.reload();
			});
		onClose();
	};

	return (
		<Popup isOpen={isOpen} onClose={onClose}>
			<h3 className="text-xl font-semibold mb-4">Add Shooting Day</h3>
			<FormContainer title="" handleSubmit={handleSubmit}>
				<FormInput
					id="shooting_day"
					type="date"
					value={shootingDay}
					onChange={(e) => {
						setShootingDay(e.target.value);
						console.log(e.target.value);
					}}
					label="shooting day"
					required
				/>
				<FormInput
					id="shooting_time"
					type="number"
					value={shootingTime}
					onChange={(e) => setShootingTime(Number(e.target.value))}
					label="shooting time"
					required
				/>
				<FormInput
					id="shooting_location"
					type="string"
					value={shootingLocation}
					onChange={(e) => setShootingLocation(e.target.value)}
					label="shooting location"
					required
				/>
				<FormInput
					id="estimated_duration"
					type="number"
					value={estimatedDuration}
					onChange={(e) => setEstimatedDuration(Number(e.target.value))}
					label="estimated duration"
					required
				/>
				<SubmitButton label="Create new date" />
			</FormContainer>
		</Popup>
	);
};

export default ShootingDayPopup;
