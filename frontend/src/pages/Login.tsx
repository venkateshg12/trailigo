import ImageAnimation from "@/components/ImageAnimation";
import { handleGoogleLogin, LoadingDots } from "@/constants/constant";
import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.png";

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [anotherDot, setAnotherDot] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: signIn, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/create-trip', {
        replace: true,
      })
    }
  })

  return (
    <div>
      <div className="absolute inset-0 bg-black/20">
        <ImageAnimation />
      </div>
      <div className="min-h-screen absolute inset-0 flex px-4  items-center justify-center bg-black/50  z-40">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[100%] max-w-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ email, password });
            }}
            className=" flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-center">Login</h2>
            {/* {isError && (
            <div className="text-center text-red-600 text-sm">
              {Array.isArray(error?.errors)
                ? error.errors.map((err: any, idx: number) => (
                  <div key={idx}>{err.message}</div>
                ))
                : error?.message || "Something went wrong"}
            </div>
          )} */}

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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  signIn({ email, password });
                }
              }}
            />
            <div className="text-end">
              <Link to="/password/forgot" className="blue hover:underline text-blue-800 cursor-pointer">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-3 cursor-pointer text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              {isPending ? <LoadingDots /> : 'login'}
            </button>
            <div className="flex gap-2 justify-center">
              <span>Don't have an account ?</span>{" "}
              <Link to="/register" className="text-blue-700 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
          <div className="text-center"><span className=" text-gray-400">Or</span></div>
          <button
            onClick={handleGoogleLogin}
            className="font-kanit w-full mt-2 text-center px-4 py-1 cursor-pointer flex items-center justify-center text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <img src={google} alt="google png" className="w-16 h-12" />
            <span onClick={() => setAnotherDot(true)} > {anotherDot ? <LoadingDots /> : 'Continue with google'}</span>
          </button>
        </div>
      </div>
    </div >
  )
}

export default SignIn;
