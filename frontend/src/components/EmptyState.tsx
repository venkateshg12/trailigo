import { registerAnimateCharsEffect } from "@/animations/animation";
import { ASuggestions } from "@/constants/constant";
import gsap from "gsap";
import { useEffect } from "react";

const EmptyState = ({onSelectOptions}:any) => {
    useEffect(() => {
        registerAnimateCharsEffect();
        gsap.effects.animateChars(".animation", { opacity: 0, duration: 0.5, staggerAmount: 0.5, staggerFrom: "random", ease: "power1.out", });
    }, [])



    return (
        <>
            <div className="animation flex flex-col gap-2 justify-center items-center">
                <h2 className="text-gray-400  font-montreal md:text-xl text-md">Welcome to </h2>
                <h1 className="font-tumbler md:text-4xl">Trailigo</h1>
                <span>Create your next <span className="text-blue-500 font-bold font-montreal">travel </span>experience with{" "}<span className="text-blue-500 font-bold font-montreal">AI </span></span>
                <span className="text-gray-400  font-montreal md:text-md text-sm whitespace-normal">Get personalized travel plans, discover great destinations, and plan your dream trip easily with the help of AI.</span>
            </div>
            <div className="flex flex-col gap-5 mt-7 items-start ">
                {
                    ASuggestions.map((item, index) => (
                        <div 
                        onClick={() => onSelectOptions(item.title)}
                        key={index} 
                        className="flex gap-1 items-center rounded-md   w-full hover:ring-gray-400 p-1 hover:ring cursor-pointer">
                            <span className="text-red-500">{item.icon}</span>
                            <h1 className="text-[0.8rem]">{item.title}</h1>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default EmptyState
