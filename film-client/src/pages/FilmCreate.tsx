import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import InputField from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import ErrorMessage from '../components/ErrorMessage';
import filmService from '../services/film-service';

const FilmCreateForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [genre, setGenre] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			await filmService.create({ title, description, genre });
			navigate('/');
		} catch (err) {
			//@ts-ignore
			setError(err.response?.data?.message || 'An error occurred');
		}
	};

	return (
		<FormContainer title="Create New Film" handleSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
				<InputField
					id="title"
					label="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<InputField
					id="description"
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<InputField
					id="genre"
					label="Genre"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
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

export default FilmCreateForm;
