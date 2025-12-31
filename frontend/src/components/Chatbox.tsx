import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { submitUserData } from "@/lib/openai";
import EmptyState from "./EmptyState";
import { BudgetUi, FinalUi, GroupSizedUi, InterestsUi, TripDuration } from "./UiOptions";
import { useMutation } from "@tanstack/react-query";
import { saveTrip } from "@/lib/trip";
import { v4 as uuidv4 } from 'uuid';


type Message = {
    role: string;
    content: string;
    ui?: string | null;
    budget?: string[] | undefined;
    interests?: string[] | undefined;
}

export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: Hotels[],
    itinerary: Itinerary[]
}

export type Hotels = {
    hotel_name?: string,
    hotel_address ?: string,
    description?: string,
    geo_coordinates : GeoCoordinates,
    hotel_image_url?:string,
    price_per_night?:string,
    rating? : number,
}

export type Itinerary = {
  day?: number;
  day_plan?: string;
  best_time_to_visit_day?: string;
  activities?: Activity[];
};

export type Activity = {
  place_name?: string;
  place_address?: string;
  place_details?: string;
  geo_coordinates?: GeoCoordinates;
  place_image_url?: string;
  best_time_to_visit?: string;
  ticket_pricing?: string;
  time_spent?: string;
};

type GeoCoordinates = {
  latitude?: number;
  longitude?: number;
};


const Chatbox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [isFinal, setIsFinal] = useState(false);
    const [tripDetais, setTripDetails] = useState<TripInfo>();

    const { mutate: saveTripPlan } = useMutation({
        mutationFn: saveTrip,
        onSuccess: (data) => {
            console.log("Trip saved", data);
        },
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);


    const submitUserResponse = async (input?: string) => {
        const text = input ?? userInput;
        if (!text?.trim()) return;
        const newMsg: Message = {
            role: 'user',
            content: text
        }
        const updatedMessages = [...messages, newMsg];
        try {
            setUserInput('');
            setMessages(updatedMessages);
            setIsLoading(true);
            const response = await submitUserData({ messages: updatedMessages, isFinal: isFinal });
            console.log(response);

            if (isFinal && response) {
                const tripId = uuidv4();
                setTripDetails(response);
                saveTripPlan({ tripId: tripId, trip_plan: response });
            }
            !isFinal && setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: response?.resp,
                    ui: response?.ui,
                    budget: response?.budget,
                    interests: response?.interests
                }

            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg) return;
        if (lastMsg.ui === 'final') {
            setIsFinal(true);
            setUserInput('Ok Great!')
        }
    }, [messages])

    useEffect(() => {
        if (isFinal && userInput) {
            submitUserResponse();
        }
    }, [isFinal]);

    const renderGenerativeUi = (msg: Message) => {
        if (msg.ui === 'budget' && Array.isArray(msg.budget)) {
            return <BudgetUi onSelectOptions={(v: string) => submitUserResponse(v)} budget={msg?.budget} />
        } else if (msg.ui === 'groupSize') {
            return <GroupSizedUi onSelectOptions={(v: string) => submitUserResponse(v)} />
        } else if (msg.ui === 'tripDuration') {
            return <TripDuration onSelectOptions={(v: string) => submitUserResponse(v)} />
        } else if (msg.ui === 'interests' && Array.isArray(msg.interests)) {
            return <InterestsUi onSelectOptions={(v: string) => submitUserResponse(v)} interests={msg?.interests} />
        } else if (msg.ui === 'final') {
            return <FinalUi viewTrip={() => console.log()} disabled={isFinal} />
        }
        return null;
    }


    return (
        <div className="mx-5 h-[85vh] flex flex-col">
            <section className="overflow-y-auto flex-1 p-4">
                {messages.length === 0 ? (
                    <EmptyState onSelectOptions={(v: string) => { submitUserResponse(v) }} />
                ) : (
                    <>
                        {messages.map((msg: Message, index) => (
                            msg.role === "user" ? (
                                <div className="flex justify-end mt-5" key={index}>
                                    <div className="px-3 py-1 text-sm md:text-md bg-blue-500 rounded-md text-white">
                                        {msg.content}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex mt-5" key={index}>
                                    <div className="px-3 py-2 text-sm md:text-md  rounded-md bg-gray-200 text-black">
                                        {msg.content}
                                        {renderGenerativeUi(msg)}
                                    </div>
                                </div>
                            )
                        ))}

                        {isLoading && (
                            <div className="flex mt-2">
                                <div className="flex items-center gap-2 px-3 py-3 rounded-md bg-gray-200">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot delay-1"></span>
                                    <span className="typing-dot delay-2"></span>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={bottomRef} />
            </section>
            <section>
                <div className="border rounded-2xl  shadow-md border-gray-400  p-3 relative">
                    <Textarea
                        placeholder="Create a trip for Swizterland from India"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                submitUserResponse();
                            }
                        }}
                        className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none " />
                    <Button onClick={() => submitUserResponse()} size={'icon'} className="absolute cursor-pointer active:scale-[1.05] hover:scale-[0.95] bg-blue-700 bottom-2 right-2"><Send className=" h-4 w-4" /></Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox;