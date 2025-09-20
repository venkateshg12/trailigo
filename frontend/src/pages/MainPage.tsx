import queryClient from "@/config/queryClient";
import { logOut } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

   const { mutate: logout, isPending, isError, error } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      navigate('/', {
        replace: true,
      })
    }
  })
  return (
    <div>
        Map in page of the revenge.
        <button onClick={() => logout()} className="px-2 py-3 bg-blue-500 rounded-2xl">log Out</button>
    </div>
  )
}

export default MainPage;
