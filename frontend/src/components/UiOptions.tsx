import { SelectBudgetOptions, SelectTravelsList } from "@/constants/constant"
import { useState } from "react";

export const GroupSizedUi = ({ onSelectOptions }: any) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4  gap-2 items-center mt-1">
            {
                SelectTravelsList.map((item, index) => (
                    <div
                        onClick={() => onSelectOptions(item.title + ": " + item.people)}
                        key={index}
                        className="cursor-pointer p-3 text-sm mb-1 md:text-xl rounded-xl bg-white  border hover:border-primary">
                        <h2>{item.icon}</h2>
                        <h2 className="font-retro">{item.title}</h2>
                    </div>
                ))
            }
        </div>
    )
}
export const BudgetUi = ({ budget, onSelectOptions }: { budget: string[]; onSelectOptions: any }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-1">
            {
                SelectBudgetOptions.map((item, index) => (
                    <div
                        onClick={() => onSelectOptions("Budget Selected: " + budget[index] + " " + item.title)}
                        className="cursor-pointer flex gap-3  flex-col items-center bg-white p-3 text-sm md:text-xl rounded-xl border hover:border-primary"
                        key={index}>
                        <div className="flex gap-3 items-center justify-start">
                            <h2 className="bg-gray-300 rounded-full md:p-1">{item.icon}</h2>
                            <h2 className="font-retro">{item.title}</h2>
                        </div>
                        <p className="text-xs md:text-sm font-mono bg-gray-300 p-1 rounded-md text-black font-bold">
                            {budget[index]}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export const TripDuration = ({ onSelectOptions }: { onSelectOptions: any }) => {
    const [days, setDays] = useState(1);

    return (
        <>
            <div className="grid grid-col-3 bg-white rounded-xl justify-center my-3 gap-3 p-2">
                <div className="flex gap-5 justify-center">
                    <button onClick={() => setDays(prev => Math.max(1, prev - 1))} className="cursor-pointer hover:scale-[1.2] active:scale-[0.97]  font-bold text-3xl">-</button>
                    <h1 className="font-bold text-3xl w-7 text-center" >{days}</h1>
                    <button onClick={() => setDays(prev => prev + 1)} className="cursor-pointer hover:scale-[1.2] active:scale-[0.97]  font-bold text-3xl">+</button>
                </div>
                <button
                    className="bg-red-500 px-2 w-fit hover:scale-[1.05] active:scale-[0.97] cursor-pointer text-white rounded-md text-xl font-bold text-center"
                    onClick={() => onSelectOptions(days > 1 ? days + " days" : days + " day")}>submit
                </button>

            </div>
        </>
    )
}

export const InterestsUi = ({ interests }: { interests: string[] }) => {
    console.log(interests);
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2  mt-3 items-center justify-center">
                {
                    interests.map((item, index) => (
                        <div className="bg-white text-sm md:text-md font-retro tracking-wider rounded-md cursor-pointer grid items-center justify-center py-2  text-black" key={index}>
                            {item}
                        </div>
                    ))}
            </div>
        </>
    )
}