import { Star } from "lucide-react";
import type { Hotels } from "./Chatbox";
import { FINAL_DATA } from "@/constants/constant";
import { useMutation } from "@tanstack/react-query";
import { getPlacesInfo } from "@/lib/trip";
import { useEffect } from "react";

export type Props = {
  hotel: Hotels;
}
const destination = FINAL_DATA?.destination;

const HotelCardItem = ({ hotel }: Props) => {
  const { mutate: getgoolePlacesInfo } = useMutation({
    mutationFn: getPlacesInfo,
    onSuccess: (data) => {
      console.log("data fetch successfully", data);
    },
  });

  useEffect(() => {
     if (!hotel) return;
    const placeName = hotel?.hotel_name + "," + destination;
    hotel && getgoolePlacesInfo(placeName);
  }, [hotel]);
  return (
    <div
      className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl m-1 transition-all duration-300"
    >
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={"https://placehold.co/400x250"}
          alt={hotel?.hotel_name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-mono font-semibold text-gray-900 leading-tight">
            {hotel?.hotel_name}
          </h3>

          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {hotel?.rating}
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-1">
          {hotel?.hotel_address}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2">
          {hotel?.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-blue-600">
            {hotel?.price_per_night}
            <span className="text-sm text-gray-500"> / night</span>
          </span>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${hotel?.hotel_name}, ${destination}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:text-violet-500 hover:underline hover:scale-[1.04] active:scale-[0.97] transition"
          >
            View details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelCardItem;
