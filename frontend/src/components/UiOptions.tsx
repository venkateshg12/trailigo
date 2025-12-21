import { SelectBudgetOptions, SelectTravelsList } from "@/constants/constant"

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
                        onClick={() => onSelectOptions("Budget Selected: " +budget[index]+ " " +item.title)}
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