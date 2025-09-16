import ImageAnimation from "@/components/ImageAnimation";
import { Spinner } from "@/constants/constant";
import { fetchUser, onSubmit } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ApiError {
    message: string;
}


const VerifyEmail = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();


    const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 5 * 60 * 1000,
    })


    const { mutate: onOtpSubmit, isError: isMutationError, error: mutationError } = useMutation({
        mutationFn: onSubmit,
        onSuccess: () => {
            navigate("/create-trip", {
                replace: true,
            })
        },
        onError: (err: any) => {
            console.log(err);
        }
    })

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    if (isUserLoading) {
        // A container to center the spinner on the screen
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner />
            </div>
        );
    }


    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (isNaN(Number(val))) return;

        const newOtp = [...otp];
        newOtp[index] = val.substring(val.length - 1);
        setOtp(newOtp);

        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        //submit trigger
        const combinedOtp = newOtp.join("");
        const userId = user?.id;
        const code = combinedOtp;
        if (combinedOtp.length === 6 && userId) onOtpSubmit({ userId, code });
    }

    const handleClick = (index: number) => {
        // For better UX, clicking an input should select its content
        inputRefs.current[index]?.setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        //  Move focus to the previous input on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const displayError = isUserError ? userError : mutationError;
    const isDisplayingError = isUserError || isMutationError;

    return (
        <div>
            <div className="relative">
                <div className="absolute inset-0">
                    <ImageAnimation />
                </div>
                <div className="min-h-screen absolute inset-0 flex items-center justify-center z-50">
                    <div
                        className="bg-white  p-8 rounded-xl min-w-[10rem] min-h-[10rem] mx-1 shadow-lg w-[100%] max-w-lg flex flex-col gap-4"
                    >
                        <div>
                            <div className="text-center font-freight font-bold text-[3rem]">Enter OTP</div>
                            <div className="text-center"><span>sent to the{' '} {user?.email || 'your email'}</span></div>
                        </div>
                        {isDisplayingError && (
                            <div className="text-center text-red-600 text-[1.4rem]">
                                {(displayError as AxiosError<ApiError>)?.response?.data?.message || displayError?.message}
                            </div>
                        )}
                        <div className="flex justify-center flex-row gap-4">
                            {
                                otp.map((value, index) => {
                                    return (
                                        <input
                                            key={index}
                                            type="text"
                                            ref={(input: HTMLInputElement | null): void => {
                                                inputRefs.current[index] = input;
                                            }}
                                            value={value}
                                            onChange={(e) => handleChange(index, e)}
                                            onClick={() => handleClick(index)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="border-2 border-gray-400 focus:border-3 rounded-2xl focus:border-black w-[4rem] h-[4rem] text-center text-[2rem]"
                                        >
                                        </input>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;
