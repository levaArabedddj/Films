import React, { useState } from 'react';
import Popup from './Popup'; // Assuming Popup is already created
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import { useParams } from 'react-router-dom';
import financeService from '../services/finance-service';

const FinancePopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose,
}) => {
	const { id } = useParams();
	const [budget, setBudget] = useState<number>(0);
	const [actorSalary, setActorSalary] = useState<number>(0);
	const [crewSalary, setCrewSalary] = useState<number>(0);
	const [advertisingCost, setAdvertisingCost] = useState<number>(0);
	const [editingCost, setEditingCost] = useState<number>(0);
	const [equipmentCost, setEquipmentCost] = useState<number>(0);

	const handleSubmit = () => {
		if (!id) throw new Error("Project ID not found");

		const financeData = {
			budget,
			actor_salary: actorSalary,
			crew_salary: crewSalary,
			advertising_cost: advertisingCost,
			editing_cost: editingCost,
			equipment_cost: equipmentCost,
		};

		financeService
			.create(financeData, +id)
			.then(() => {
				window.location.reload();
			})
			.catch(error => {
				console.error("Failed to create finance entry:", error);
			});

		onClose();
	};

	return (
		<Popup isOpen={isOpen} onClose={onClose}>
			<h3 className="text-xl font-semibold mb-4">Add Finance Details</h3>
			<FormContainer title="" handleSubmit={handleSubmit}>
				<FormInput
					id="budget"
					type="number"
					value={budget}
					onChange={(e) => setBudget(Number(e.target.value))}
					label="Budget"
					required
				/>
				<FormInput
					id="actor_salary"
					type="number"
					value={actorSalary}
					onChange={(e) => setActorSalary(Number(e.target.value))}
					label="Actor Salary"
					required
				/>
				<FormInput
					id="crew_salary"
					type="number"
					value={crewSalary}
					onChange={(e) => setCrewSalary(Number(e.target.value))}
					label="Crew Salary"
					required
				/>
				<FormInput
					id="advertising_cost"
					type="number"
					value={advertisingCost}
					onChange={(e) => setAdvertisingCost(Number(e.target.value))}
					label="Advertising Cost"
					required
				/>
				<FormInput
					id="editing_cost"
					type="number"
					value={editingCost}
					onChange={(e) => setEditingCost(Number(e.target.value))}
					label="Editing Cost"
					required
				/>
				<FormInput
					id="equipment_cost"
					type="number"
					value={equipmentCost}
					onChange={(e) => setEquipmentCost(Number(e.target.value))}
					label="Equipment Cost"
					required
				/>
				<SubmitButton label="Create Finance Entry" />
			</FormContainer>
		</Popup>
	);
};

export default FinancePopup;
