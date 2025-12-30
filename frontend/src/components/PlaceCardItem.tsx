import { Clock, ExternalLink, Ticket } from "lucide-react";
import type { Activity } from "./Chatbox";
import { FINAL_DATA } from "@/constants/constant";

const destination = FINAL_DATA?.destination;

export type Props = {
    activity : Activity;
}

const PlaceCardItem = ({activity}:Props) => {
    return (
        <div
            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={"https://placehold.co/400x250"}
                    alt={activity?.place_name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 space-y-3">
                <h2 className="text-lg font-semibold font-freight text-gray-900">
                    {activity?.place_name}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {activity?.place_details}
                </p>
                <div className="flex flex-wrap gap-4 text-sm pt-2">
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                        <Ticket className="w-4 h-4" />
                        {activity?.ticket_pricing}
                    </span>
                    <span className="flex items-center gap-1 text-orange-600 font-medium">
                        <Clock className="w-4 h-4" />
                        {activity?.best_time_to_visit}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                        ⏱ {activity?.time_spent}
                    </span>
                </div>
            </div>
            <div className="text-center py-2">
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${activity?.place_name}, ${destination}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-black hover:scale-[1.04] active:scale-[0.97] justify-center cursor-pointer w-full transition"
                >
                    View
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    )
}

export default PlaceCardItem;
