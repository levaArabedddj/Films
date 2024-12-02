import React, { ReactNode } from 'react';

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className=" fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
			<div className="relative bg-white p-6 rounded-md shadow-md dark:bg-gray-800">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};

export default Popup;
