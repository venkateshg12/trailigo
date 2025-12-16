import { Button } from "@/components/ui/button";
import queryClient from "@/config/queryClient";
import { logOut } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { mainPageImageContent } from "@/constants/constant";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
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


  const animateToNext = (nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }
    });

    if (nextBgRef.current) {
      gsap.set(nextBgRef.current, { opacity: 0, scale: 1.1, backgroundImage: `url(${mainPageImageContent[nextIndex].image})` });
    }

    tl.to(bgRef.current, { scale: 1.2, opacity: 0, duration: 0.8, ease: "power1.inOut" }, "-=0.4")
      .to(nextBgRef.current, {
        opacity: 1, scale: 1, duration: 1, ease: "power2.out",
        onComplete: () => {
          if (bgRef.current && nextBgRef.current) {
            bgRef.current.style.backgroundImage = `url(${mainPageImageContent[nextIndex].image})`;
            gsap.set(bgRef.current, { opacity: 1, scale: 1 });
            gsap.set(nextBgRef.current, { opacity: 0 });
          }
        }
      }, "-=0.4"
      )
      .fromTo(titleRef.current, { y: -150, opacity: 0,  scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power1.in" }, "-=0.4")
      .fromTo(aboutRef.current, { y: -150, duration:1, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8")
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % mainPageImageContent.length;
      animateToNext(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex])

  const currentContent = mainPageImageContent[currentIndex];

  return (
    <>
      <div className="h-[100vh] w-full relative overflow-hidden">
        <div className="absolute z-20 inset-0 /*bg-gradient-to-t from-black/10*/ bg-black/40 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/50 pointer-events-none" />
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${currentContent.image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.9)",
          }}
        />
        <div
          ref={nextBgRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${currentContent.image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.9)",
          }}
        />
        <div className="flex  h-full justify-center gap-[10%] items-center  z-50 relative">
          <div>
            <div  className="text-white font-bold p-1 bg-red-500 text-[7rem] overflow-hidden"><span ref={titleRef}>{currentContent.country}</span></div>
            <div className="max-w-[42rem]">
              <span ref={aboutRef} className="text-white">{currentContent.about}</span>
            </div>
          </div>
          <div>
            <img src={mainPageImageContent[1].smallImg} className="w-[20rem] h-[28rem]" alt="" />
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => logout()}>Log Out</Button>
        <Link to="/create-trip">
        <Button className="m-5 ">Create Trip</Button>
        </Link>
      </div>
    </>
  )
}

export default MainPage;
