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
        <div className="absolute h-[10rem] bg-black/40 z-50" />
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
          {/* <img src={mainPageImageContent[1].image} alt="" className="w-full h-screen" /> */}
        </div>
        <div className="flex flex-col">
          <div>
            <span></span>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div>
        Map in page of the revenge.
        <Button onClick={() => logout()}>Log Out</Button>
      </div>
    </>
  )
}

export default MainPage;
