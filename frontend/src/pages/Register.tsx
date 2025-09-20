import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";
import ImageAnimation from "@/components/ImageAnimation";
import { handleGoogleLogin, LoadingDots } from "@/constants/constant";
import google from "../assets/google.png";
const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [dot, setDot] = useState<boolean>(false);
  const [anotherDot, setAnotherDot] = useState<boolean>(false);
  const navigate = useNavigate();

  interface ApiError {
    errors?: Array<{ message: string }>;
    message?: string;
  }

  interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const { mutate: createAccount, isError, error } = useMutation<any, ApiError, RegisterData>({
    mutationFn: register,
    onSuccess: () => {
      navigate('/verify-email', { replace: true });
    },
    onError: () => {
      setDot(false); // Also a good idea to stop loading on error
    },
  });


  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword
    );
  };
  const handleClick = () => {
    if (!isError && isFormValid()) {
      setDot(true);
    }
  }



  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/20">
        <ImageAnimation />
      </div>
      <div className="min-h-screen absolute -my-7 md:0 px-4 inset-0 bg-black/10 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl mx-1 shadow-lg w-[100%] max-w-lg flex flex-col gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createAccount({ name, email, password, confirmPassword })
            }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold font-kanit text-center ">Create Account</h2>
            {isError && (
              <div className="text-center text-red-600 text-sm">
                {error?.errors?.[0]?.message || error?.message || "Something went wrong"}
              </div>
            )}
            <input
              type="string"
              placeholder="Name"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => { setName(e.target.value) }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createAccount({ name, email, password, confirmPassword })
                }
              }}
            />
            <button
              type="submit"
              onClick={handleClick}
              className="font-kanit w-full px-4 py-3 cursor-pointer text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              {dot ? <LoadingDots /> : 'Register'}
            </button>
            <div className="flex font-kanit gap-2 justify-center">
              <span>Already have an account ?</span>{" "}
              <Link to="/signin" className="text-blue-700 hover:underline">
                Sign In
              </Link>
            </div>
            <div className="text-center text-gray-500"><span>Or</span></div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="font-kanit w-full text-center px-4 py-1 cursor-pointer flex items-center justify-center text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <img src={google} alt="google png" className="w-16 h-12" />
            <span onClick={() => setAnotherDot(true)} > {anotherDot ? <LoadingDots /> : 'Continue with google'}</span>
          </button>
        </div>
      </div>
    </div >
  )
}

export default Register;