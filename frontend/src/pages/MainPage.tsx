import { Button } from "@/components/ui/button";
import queryClient from "@/config/queryClient";
import { logOut } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { mainPageImageContent } from "@/constants/constant";

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
    <>
      <div className="h-[100vh] w-full relative">
        <div className="absolute z-20 inset-0 /*bg-gradient-to-t from-black/10*/ bg-black/40 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/50 pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${mainPageImageContent[1].image})`,
            backgroundPosition: 'center center', // Better for mobile
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            // opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 0.5s ease",
            filter: "brightness(0.9)",
          }}
        >
        </div>
        <div className="flex  h-full justify-center gap-[10%] items-center  z-50 relative">
          <div>
            <div className="text-white font-bold text-[7rem]"><span>{mainPageImageContent[0].country}</span></div>
            <div className="max-w-[42rem]">
            <span className="text-white">{mainPageImageContent[1].about}</span>
            </div>
          </div>
          <div>
            <img src={mainPageImageContent[1].smallImg} className="w-[20rem] h-[28rem]" alt="" />
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => logout()}>Log Out</Button>
      </div>
    </>
  )
}

export default MainPage;
