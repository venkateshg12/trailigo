import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { mutate: signIn, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      })
    },
    onError: (err: any) => {
      console.log("Mutation Error:", err);
    },
  })

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn({ email, password });
          }}
          className="bg-white p-8 rounded-xl shadow-lg w-[100%] max-w-lg flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {isError && (
            <div className="text-center text-red-600 text-sm">
              {Array.isArray(error?.errors)
                ? error.errors.map((err: any, idx: number) => (
                  <div key={idx}>{err.message}</div>
                ))
                : error?.message || "Something went wrong"}
            </div>
          )}

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
            {isPending ? 'Logging in' : 'login'}
          </button>
          <div className="flex gap-2 justify-center">
            <span>Don't have an account ?</span>{" "}
            <Link to="/register" className="text-blue-700 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div >
  )
}

export default SignIn;
