import { Button } from "@/components/ui/button";
import queryClient from "@/config/queryClient";
import { logOut } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { mainPageImageContent } from "@/constants/constant";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Page = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs for animation targets
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      navigate('/', { replace: true });
    }
  });

  // Animation function
  const animateToNext = (nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }
    });

    // 1. Animate current content out (upward)
    tl.to([titleRef.current, aboutRef.current], {
      y: -100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.in"
    })
    // 2. Animate image out (slide left and fade)
    .to(imageRef.current, {
      x: -200,
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.in"
    }, "-=0.4")
    
    // 3. Change background image with fade effect
    .to(bgRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
      onComplete: () => {
        // Update background image
        if (bgRef.current) {
          bgRef.current.style.backgroundImage = `url(${mainPageImageContent[nextIndex].image})`;
        }
      }
    }, "-=0.2")
    
    // 4. Fade background back in
    .to(bgRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power1.inOut"
    })
    
    // 5. Animate new content in (from bottom)
    .fromTo([titleRef.current, aboutRef.current], {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.3")
    
    // 6. Animate new image in (from right)
    .fromTo(imageRef.current, {
      x: 200,
      opacity: 0,
      scale: 0.8
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.2)"
    }, "-=0.6");
  };

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % mainPageImageContent.length;
      animateToNext(nextIndex);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Manual navigation
  const goToSlide = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      animateToNext(index);
    }
  };

  // Initial animations on mount
  useGSAP(() => {
    if (!titleRef.current || !aboutRef.current || !imageRef.current) return;

    // Set initial states
    gsap.set([titleRef.current, aboutRef.current], {
      y: 50,
      opacity: 0
    });
    gsap.set(imageRef.current, {
      x: 100,
      opacity: 0,
      scale: 0.8
    });

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to([titleRef.current, aboutRef.current], {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(imageRef.current, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.2)"
    }, "-=0.6");

  }, []);

  const currentContent = mainPageImageContent[currentIndex];

  return (
    <>
      <div ref={containerRef} className="h-[100vh] w-full relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute z-20 inset-0 bg-black/40 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/50 pointer-events-none" />
        
        {/* Background image */}
        <div
          ref={bgRef}
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${currentContent.image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.9)",
          }}
        />

        {/* Main content */}
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
          
          <div className="flex-shrink-0">
            <img 
              ref={imageRef}
              src={currentContent.smallImg} 
              className="w-[15rem] h-[20rem] md:w-[20rem] md:h-[28rem] object-cover rounded-lg shadow-2xl" 
              alt={currentContent.country}
            />
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
          {mainPageImageContent.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              } disabled:cursor-not-allowed`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => goToSlide((currentIndex - 1 + mainPageImageContent.length) % mainPageImageContent.length)}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => goToSlide((currentIndex + 1) % mainPageImageContent.length)}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-50">
          <div 
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: `${((currentIndex + 1) / mainPageImageContent.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Logout section */}
      <div className="p-8 bg-gray-100">
        <Button 
          onClick={() => logout()}
          disabled={isPending}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          {isPending ? 'Logging out...' : 'Log Out'}
        </Button>
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

export default Page;