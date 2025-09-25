import { Button } from "@/components/ui/button";
import queryClient from "@/config/queryClient";
import { mainPageImageContent } from "@/constants/constant";
import { logOut } from "@/lib/api";
import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      navigate('/', { replace: true });
    }
  });

  const animateToNext = (nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }
    });

    // Prepare next background
    if (nextBgRef.current) {
      gsap.set(nextBgRef.current, {opacity: 0,scale: 1.1,backgroundImage: `url(${mainPageImageContent[nextIndex].image})`});
    }

    // Complex animation sequence
    // Phase 1: Current content exit with stagger
    tl.to(titleRef.current, {y: -150,opacity: 0,rotateX: -45,duration: 0.8,ease: "power2.in"})
    .to(aboutRef.current, {y: -100,opacity: 0,duration: 0.6,ease: "power2.in"}, "-=0.6")
    .to(imageRef.current, {x: -300,opacity: 0,scale: 0.6,rotation: -15,duration: 1,ease: "power2.in"}, "-=0.4")
    
    // Phase 2: Background transition with zoom effect
    .to(bgRef.current, {scale: 1.2,opacity: 0,duration: 0.8,ease: "power1.inOut"}, "-=0.4")
    .to(nextBgRef.current, {opacity: 1,scale: 1,duration: 1,ease: "power2.out",
      onComplete: () => {
        // Swap backgrounds
        if (bgRef.current && nextBgRef.current) {
          bgRef.current.style.backgroundImage = `url(${mainPageImageContent[nextIndex].image})`;
          gsap.set(bgRef.current, { opacity: 1, scale: 1 });
          gsap.set(nextBgRef.current, { opacity: 0 });
        }
      }
    }, "-=0.4"
  )
    
    // Phase 3: New content entrance with bounce
    .fromTo(titleRef.current, {y: 200,opacity: 0,rotateX: 45,scale: 0.8}, 
      {y: 0,opacity: 1,rotateX: 0,scale: 1,duration: 1.2,ease: "back.out(1.4)"}, "-=0.2")
    .fromTo(aboutRef.current, {y: 150,opacity: 0}, 
      {y: 0,opacity: 1,duration: 1,ease: "power2.out"}, "-=0.8")
    .fromTo(imageRef.current, {x: 400,opacity: 0,scale: 0.6,rotation: 20}, 
      {x: 0,opacity: 1,scale: 1,rotation: 0,duration: 1.4,ease: "elastic.out(1, 0.6)"}, "-=0.6");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % mainPageImageContent.length;
      animateToNext(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useGSAP(() => {
    // Initial entrance animations
    gsap.set([titleRef.current, aboutRef.current, imageRef.current], {
      opacity: 0
    });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(titleRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.2)"
    })
    .fromTo(aboutRef.current, {
      y: 80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1")
    .fromTo(imageRef.current, {
      x: 200,
      opacity: 0,
      scale: 0.6
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.8)"
    }, "-=0.8");
  }, []);

  const currentContent = mainPageImageContent[currentIndex];

  return (
    <>
      <div className="h-[100vh] w-full relative overflow-hidden">
        <div className="absolute z-20 inset-0 bg-black/40 pointer-events-none" />
        
        {/* Current background */}
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
        
        {/* Next background for smooth transitions */}
        <div
          ref={nextBgRef}
          className="absolute inset-0"
          style={{
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.9)",
            opacity: 0
          }}
        />

        <div className="flex h-full justify-center gap-[10%] items-center z-50 relative px-4">
          <div className="max-w-2xl">
            <div ref={titleRef} className="text-white font-bold text-4xl md:text-7xl mb-4">
              <span>{currentContent.country}</span>
            </div>
            <div ref={aboutRef} className="max-w-[42rem]">
              <span className="text-white text-sm md:text-base leading-relaxed">
                {currentContent.about}
              </span>
            </div>
          </div>
          
          <div>
            <img 
              ref={imageRef}
              src={currentContent.smallImg} 
              className="w-[15rem] h-[20rem] md:w-[20rem] md:h-[28rem] object-cover rounded-lg shadow-2xl" 
              alt={currentContent.country}
            />
          </div>
        </div>

        {/* Enhanced navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
          {mainPageImageContent.map((item, index) => (
            <button
              key={index}
              onClick={() => animateToNext(index)}
              disabled={isAnimating || index === currentIndex}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white text-black' 
                  : 'bg-white/20 text-white hover:bg-white/40'
              } disabled:cursor-not-allowed`}
            >
              {item.country}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 bg-gray-100">
        <Button 
          onClick={() => logout()}
          disabled={isPending}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {isPending ? 'Logging out...' : 'Log Out'}
        </Button>
      </div>
    </>
  );
};