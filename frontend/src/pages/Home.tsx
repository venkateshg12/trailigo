
import { useEffect, useRef, useState } from "react";
import { address, HomeInfoOne, homeInfoOneOne, homeInfoOneTwo, image11, images } from "@/constants/constant";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";
import SplitText from "gsap/SplitText";
import { Link } from "react-router-dom";
import HomeInfoCard from "@/components/HomeInfoCard";
import desImage1 from "@/assets/destinations1.webp"
import desImage2 from "@/assets/destination2.webp"
import HomeInfo from "@/components/HomeInfo";

gsap.registerPlugin(SplitText);


const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const addressRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    // Animate new slide in
    const animateSlideIn = (el: HTMLElement | null) => {
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity: 0, scale: 1.1 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
            }
        );
    };

    // Animate current slide out
    const animateSlideOut = (el: HTMLElement | null) => {
        if (!el) return;
        gsap.to(el, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "power2.inOut",
        });
    };

    // Move to next slide
    const goToNextSlide = () => {
        const currentSlide = slideRefs.current[currentIndex];
        animateSlideOut(currentSlide);

        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
    };

    // Auto-play setup
    useEffect(() => {
        intervalRef.current = setInterval(goToNextSlide, 3000);
        return () => clearInterval(intervalRef.current!);
    }, [currentIndex]);

    // Animate new slide when index changes
    useEffect(() => {
        animateSlideIn(slideRefs.current[currentIndex]);
    }, [currentIndex]);

    useGSAP(() => {
        animateSlideIn(slideRefs.current[currentIndex]);
        // Animate address text
        if (addressRef.current) {
            gsap.fromTo(
                addressRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.8,
                    ease: "power2.out",
                }
            );
        }
    }, [currentIndex]);

    useGSAP(() => {
        const split = new SplitText(titleRef.current, {
            type: "chars",
        });

        gsap.from(split.chars, {
            duration: 0.3,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
        });

        return () => {
            split.revert();
        };
    }, []);
    return (
        <>
            <div className="relative w-full h-screen overflow-hidden bg-black">
                <div className="absolute inset-0">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            ref={(el) => { slideRefs.current[index] = el; }}
                            className={`absolute  inset-0 ${index === currentIndex ? "z-20" : "z-10"
                                }`}
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundPosition: 'center center', // Better for mobile
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                                opacity: index === currentIndex ? 1 : 0,
                                transition: "opacity 0.5s ease",
                                filter: "brightness(0.9)",
                            }}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 z-50 px-[1rem] flex flex-col items-center bg-black/50 md:-mt-[12rem] justify-center">
                    <h1 ref={titleRef} className="text-white max-[500px]:text-[3rem]  min-[500px]:text-[5rem] 2xl:text-[7rem] font-bold font-tumbler tracking-widest">Trailigo</h1>
                    <span className="text-white text-center 2xl:text-[3rem] md:text-[1.4rem] text-[1rem] font-montreal">Your personal  travel curator—designing unforgettable journeys tailored to your style, interests, and budget.</span>
                    <Link to="/signin">
                        <button className="px-3 py-1 bg-red-500 text-white rounded-2xl my-3 text-xl md:text-2xl 2xl:text-4xl ring-2 cursor-pointer floating active:scale-95 ring-white">Explore Now</button>
                    </Link>
                </div>
                <div ref={addressRef} className="absolute z-30 right-10 bottom-15 md:right-20 md:bottom-15 text-white text-right">
                    <span className="block text-[2.6rem] md:text-[3.5rem] 2xl:text-[5rem] text-gray-300 font-retro tracking-wide">
                        {address[currentIndex]?.ad1}
                    </span>
                    <span className="block text-[2rem] 2xl:text-[4rem] font-montreal font-light text-gray-400">
                        {address[currentIndex]?.ad2}
                    </span>
                </div>

                <div className="absolute z-20 inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />
            </div>

            <div>
                <div className="min-h-screen w-full py-6 2xl:py-20 flex justify-center flex-col gap-12 md:gap-[7rem] md:px-[7rem]">
                    <HomeInfo details={homeInfoOneOne} image={desImage1} />
                    <HomeInfoCard items={HomeInfoOne} />
                </div>
            </div>

            {/* 
            <div>
                <div className="h-screen w-full py-10 flex flex-col items-center flex-1 ">
                    <HomeInfo details={homeInfoOneOne} image={desImage2} />
                </div>
            </div> */}
        </>
    );
};

export default Home;