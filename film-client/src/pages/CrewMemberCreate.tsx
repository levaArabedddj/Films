import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';
import InputField from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import staffService from '../services/staff-service';
import { useNavigate } from 'react-router-dom';

const CrewMemberCreate = () => {
	const [fullName, setFullName] = useState('');
	const [salaryPerHour, setSalaryPerHour] = useState<number>(0);
	const [error, setError] = useState<string>('');

	const navigate = useNavigate();
	const handleSubmit = async () => {
		const crewMemberData = {
			full_name: fullName,
			salary_per_hour: salaryPerHour,
		};

		try {
			await staffService.createCrewMember(crewMemberData);
			navigate('/staff');
		} catch (error) {
			setError('There was an error creating the crew member.');
		}
	};

	return (
		<FormContainer title="Create New Crew Member" handleSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
				<InputField
					id="full_name"
					label="Full Name"
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					required
				/>
				<InputField
					id="salary_per_hour"
					label="Salary per Hour"
					type="number"
					value={salaryPerHour}
					onChange={(e) => setSalaryPerHour(Number(e.target.value))}
					required
				/>
			</div>

			{error && <ErrorMessage message={error} />}

			<div className="flex justify-end mt-6">
				<SubmitButton label="Save" />
			</div>
		</FormContainer>
	);
};

export default CrewMemberCreate;
