import React from 'react';

interface SubmitButtonProps {
	label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
	<button
		type="submit"
		className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
	>
		{label}
	</button>
);

export default SubmitButton;
