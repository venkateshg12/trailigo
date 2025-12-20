import { SelectBudgetOptions, SelectTravelsList } from "@/constants/constant"

export const GroupSizedUi = ({onSelectOptions} : any) =>{
    return(
        <div className="grid grid-cols-2 md:grid-cols-4  gap-2 items-center mt-1">
            {
                SelectTravelsList.map((item,index) =>(
                    <div 
                    onClick = {() => onSelectOptions(item.title+":" +item.people)}
                    key={index}
                     className="cursor-pointer p-3 text-sm mb-1 md:text-xl rounded-xl bg-white  border hover:border-primary">
                        <h2>{item.icon}</h2>
                        <h2>{item.title}</h2>
                    </div>
                ))
            }
        </div>
    )
}
export const BudgetUi = ({onSelectOptions} : any) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-1">
            {
                SelectBudgetOptions.map((item,index) => (
                    <div 
                    onClick={() => onSelectOptions(item.title+":" +item.desc)}
                    className="cursor-pointer bg-white p-3 text-sm md:text-xl rounded-xl border hover:border-primary"
                    key={index}>
                        <h2>{item.icon}</h2>
                        <h2>{item.title}</h2>
                    </div>
                ))
            }
        </div>
    )

}