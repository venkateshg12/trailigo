import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Chatbox = () => {
    return (
        <div className="mx-5 h-[85vh] flex flex-col">
            <section className="overflow-y-auto flex-1 p-4">
                <div className="flex justify-end mt-2">
                    <div className="px-3 py-1 bg-blue-500 rounded-md text-white">
                        User message
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="px-3 py-1 rounded-md bg-gray-200 text-black">
                        AI agent
                    </div>
                </div>
            </section>
            <section>
                <div className="border rounded-2xl shadow-md border-gray-300  p-3 relative">
                    <Textarea placeholder="Create a trip for Swizterland from India"
                    className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none "/>
                    <Button size={'icon'} className="absolute cursor-pointer active:scale-[1.05] hover:scale-[0.95] bg-blue-700 bottom-2 right-2"><Send className=" h-4 w-4"/></Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox;
