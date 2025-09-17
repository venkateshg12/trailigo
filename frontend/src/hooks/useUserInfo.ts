import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api";

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry : 0,
    });
}