import React from 'react';

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
	<p className="mt-4 text-red-500">{message}</p>
);

export default ErrorMessage;
