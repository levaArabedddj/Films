import React, { ReactNode } from 'react';

interface FormContainerProps {
	title: string;
	handleSubmit: () => void;
	children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({
	title,
	children,
	handleSubmit,
}) => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
		className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
	>
		<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
			{title}
		</h2>
		{children}
	</form>
);

export default FormContainer;
