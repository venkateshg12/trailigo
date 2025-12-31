import Chatbox from "@/components/Chatbox";
import Itinerary from "@/components/Itinerary";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreateTrip = () => {
    return (
        <div>
            <div>
                <nav className="flex justify-between px-5 py-2 items-center border border-b sticky border-b-red-400">
                    <div className="flex-shrink-0 z-50 md:pl-[2rem] 2xl: pl-[3rem] cursor-pointer">
                        <h1 className="text-[1.7rem] text-black font-retro 2xl:text-[3rem]"><a href="/"> Trailigo</a> </h1>
                    </div>
                    <div className="max-w-sm flex items-between font-bold justify-between  flex-1">
                        <Link to="/home" className=" hover:underline active:scale-[0.95]">Home</Link>
                        <Link to="/pricing" className=" hover:underline active:scale-[0.95]">Pricing</Link>
                        <Link to="/contact" className=" hover:underline active:scale-[0.95]">Contact Us</Link>
                    </div>
                    <div>
                        <Button>My Trips</Button>
                    </div>
                </nav>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div>
                    <Chatbox />
                </div>
                <div className="col-span-2">
                    <Itinerary />
                </div>
            </div>
        </div>
    )
}

export default CreateTrip;
