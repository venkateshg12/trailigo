import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";
import ImageAnimation from "@/components/ImageAnimation";

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name , setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: createAccount, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/verify-email', {
        replace: true,
      })
    },
    onError: (err: any) => {
      console.log("Mutation Error:", err);
    },
  })

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <ImageAnimation />
      </div>
      <div className="min-h-screen absolute inset-0 flex items-center justify-center z-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAccount({ name, email, password, confirmPassword })
          }}
          className="bg-white p-8 rounded-xl mx-1 shadow-lg w-[100%] max-w-lg flex flex-col gap-4"
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
            onChange={(e) => {setName(e.target.value)}}
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
                createAccount({name, email, password, confirmPassword })
              }
            }}
          />
          <button
            type="submit"
            className="font-kanit w-full px-4 py-3 cursor-pointer text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Register
          </button>
          <div className="flex font-kanit gap-2 justify-center">
            <span>Already have an account ?</span>{" "}
            <Link to="/login" className="text-blue-700 hover:underline">
              Sign In
            </Link>
          </div>
          <span className="font-retro text-center text-4xl">Trailigo</span>
        </form>
      </div>
    </div >
  )
}

export default Register;