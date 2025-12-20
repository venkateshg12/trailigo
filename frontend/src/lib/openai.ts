import API from "@/config/appClient"
type ChatMessage = {
    role: string;
    content: string;
};

type SubmitUserDataPayload = {
    messages: ChatMessage[];
};

export const submitUserData = async (data: SubmitUserDataPayload) => {

    const response = await API.post("/processUserInfo", data);
    return response.data;
}