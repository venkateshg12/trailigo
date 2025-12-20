import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { submitUserData } from "@/lib/openai";
import EmptyState from "./EmptyState";
import { BudgetUi, GroupSizedUi } from "./UiOptions";

type Message = {
    role: string,
    content: string,
    ui?: string
}
const Chatbox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);





    const submitUserResponse = async (input?: string) => {
        const text = input ?? userInput;
        if (!text?.trim()) return;
        try {
            setUserInput('');
            const newMsg: Message = {
                role: 'user',
                content: text
            }
            setMessages((prev: Message[]) => [...prev, newMsg]);
            setIsLoading(true);
            const response = await submitUserData({ messages: [...messages, newMsg] });
            setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: response?.resp, ui: response?.ui }])
            console.log(response?.resp);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

    const renderGenerativeUi = (ui: string) => {
        if (ui === 'budget') {
            return <BudgetUi onSelectOptions={(v: string) => submitUserResponse(v)} />
        } else if (ui === 'groupSize') {
            return <GroupSizedUi onSelectOptions={(v: string) => submitUserResponse(v)} />
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
                                    <div className="px-3 py-1 text-sm md:text-md rounded-md bg-gray-200 text-black">
                                        {msg.content}
                                        {renderGenerativeUi(msg.ui ?? '')}
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
                    <Button onClick={submitUserResponse} size={'icon'} className="absolute cursor-pointer active:scale-[1.05] hover:scale-[0.95] bg-blue-700 bottom-2 right-2"><Send className=" h-4 w-4" /></Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox;
