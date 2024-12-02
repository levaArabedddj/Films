import React from 'react';

interface InputFieldProps {
	id: string;
	label: string;
	type?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const FormInput: React.FC<InputFieldProps> = ({
	id,
	label,
	type = 'text',
	value,
	onChange,
	required = false,
}) => (
	<div className="mb-2">
		<label className="text-gray-700 dark:text-gray-200" htmlFor={id}>
			{label}
		</label>
		<input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			required={required}
			className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
		/>
	</div>
);

export default FormInput;
