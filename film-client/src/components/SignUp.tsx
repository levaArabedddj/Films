import { FormEvent, useState } from 'react';
import authService from '../services/auth-service';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			return;
		}

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		const response = await authService.register(
			firstName,
			lastName,
			email,
			password
		);

		if (response) {
			navigate('/');
		}
	};

	return (
		<form className="w-full max-w-md" onSubmit={handleSignUp}>
			<div className="relative flex items-center mt-8">
				<span className="absolute">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</span>
				<input
					type="text"
					className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					placeholder="First name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>

			<div className="relative flex items-center mt-4">
				<span className="absolute">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</span>
				<input
					type="text"
					className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					placeholder="Last name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>

			<div className="relative flex items-center mt-4">
				<span className="absolute">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</span>
				<input
					type="email"
					className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					placeholder="Email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="relative flex items-center mt-4">
				<span className="absolute">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</span>
				<input
					type="password"
					className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className="relative flex items-center mt-4">
				<span className="absolute">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</span>
				<input
					type="password"
					className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>

			<div className="mt-6">
				<button
					type="submit"
					className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
				>
					Sign Up
				</button>
			</div>
		</form>
	);
};

export default SignUp;
