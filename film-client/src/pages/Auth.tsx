import { useState } from 'react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

const Auth = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
				<div className="w-full max-w-md">
					<div className="flex justify-center mx-auto">
						<img
							className="w-auto h-7 sm:h-8"
							src="https://merakiui.com/images/logo.svg"
							alt=""
						/>
					</div>

					<div className="flex items-center justify-center mt-6">
						<button
							onClick={() => setIsLogin(true)}
							className={`w-1/3 pb-4 font-medium text-center capitalize ${
								isLogin
									? 'border-b-2 border-blue-500 text-gray-800 dark:border-blue-400 dark:text-white'
									: 'border-b text-gray-500 dark:border-gray-400 dark:text-gray-300'
							}`}
						>
							Sign In
						</button>

						<button
							onClick={() => setIsLogin(false)}
							className={`w-1/3 pb-4 font-medium text-center capitalize ${
								!isLogin
									? 'border-b-2 border-blue-500 text-gray-800 dark:border-blue-400 dark:text-white'
									: 'border-b text-gray-500 dark:border-gray-400 dark:text-gray-300'
							}`}
						>
							Sign Up
						</button>
					</div>
					{isLogin ? <SignIn /> : <SignUp />}
				</div>
			</div>
		</section>
	);
};

export default Auth;
