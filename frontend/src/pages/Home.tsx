
import { useEffect, useRef, useState } from "react";
import { details2, homeInfoFour, HomeInfoOne, homeInfoThree, HomeInfoTwo, LoadingSpinnerWithProgress } from "@/constants/constant";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import desImage1 from "@/assets/destinations1.webp"
import desImage2 from "@/assets/destination2.webp"
import HomeInfo from "@/components/HomeInfo";
import HomeInfoCardOne from "@/components/HomeInfoCardOne";
import HomeInfoCardTwo from "@/components/HomeInfoCardTwo";
import Footer from "@/components/Footer";
import ImageAnimation from "@/components/ImageAnimation";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger"
import { registerAnimateCharsEffect } from "@/animations/animation";
import { useImagePreloader } from "@/hooks/useImageLoader";


gsap.registerPlugin(SplitText, ScrollTrigger);

const Home = () => {
    const [animationsReady, setAnimationsReady] = useState<boolean>(false);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const imagesSources = [
        desImage1,
        desImage2,
        ...HomeInfoOne.map(item => item.image),
        ...HomeInfoTwo.map(item => item.image),
    ];
    const { imagesLoaded, loadingProgress } = useImagePreloader(imagesSources);
    useGSAP(() => {
        if (!imagesLoaded || !animationsReady) return;
        registerAnimateCharsEffect();
        gsap.effects.animateChars(".char7", { opacity: 0, duration: 0.5, staggerAmount: 0.5, staggerFrom: "random", ease: "power1.out", });
        gsap.effects.animateChars(".char8", { opacity: 0, duration: 0.5, staggerAmount: 0.5, staggerFrom: "random", ease: "power1.out", });
        gsap.effects.animateChars(".char3", { opacity: 0, x: "1em", duration: 1.5, ease: "power4.out", staggerAmount: 0.8, })
        gsap.effects.animateChars(".char4", { opacity: 0, x: "1em", duration: 1.5, ease: "power4.out", staggerAmount: 0.8, })
    }, [imagesLoaded, animationsReady]);

    useGSAP(() => {
        if (!imagesLoaded || !animationsReady || !titleRef.current) return;
        gsap.set(titleRef.current, { visibility: "hidden" });
        const split = new SplitText(titleRef.current, {
            type: "chars",
        });
        gsap.set(split.chars, { autoAlpha: 0 });
        gsap.set(titleRef.current, { visibility: "visible" });

        gsap.to(split.chars, {
            duration: 0.5,
            autoAlpha: 1,
            stagger: 0.1,
            ease: "power2.out",
        });
        return () => {
            split.revert();
        };
    }, [imagesLoaded, animationsReady]);

    // set animations ready after images load delay for smooth transitions
    useEffect(() => {
        if (imagesLoaded) {
            setTimeout(() => {
                setAnimationsReady(true);
                console.log('All images loaded, animations ready');
            }, 100);
        }
    }, [imagesLoaded]);

    if (!imagesLoaded) {
        return <LoadingSpinnerWithProgress progress={loadingProgress} />;
    }

    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <ImageAnimation />
                </div>
                <div className="absolute inset-0 z-50 px-[1rem] flex flex-col items-center bg-black/50 md:-mt-[12rem] justify-center">
                    <h1 ref={titleRef}  style={{ visibility: 'hidden' }} className="text-white   max-[500px]:text-[3rem]  min-[500px]:text-[5rem] 2xl:text-[7rem] font-bold font-tumbler tracking-widest">Trailigo</h1>
                    <span className="char-7 text-white text-center 2xl:text-[3rem] md:text-[1.4rem] text-[1rem] font-montreal ">Your personal  travel curator—designing unforgettable journeys tailored to your style, interests, and budget.</span>
                    <Link to="/signin">
                        <button className="px-3 py-1 bg-red-500 text-white rounded-2xl my-3 text-xl md:text-2xl 2xl:text-4xl ring-2 cursor-pointer floating active:scale-95 ring-white">Explore Now</button>
                    </Link>
                </div>
                <div>
                </div>
            </div>
            <div className="my-10 md:my-20 px-2">
                <div className="font-bold text-center md:text-3xl cursor-pointer 2xl:text-5xl font-retro text-blue-500 hover:text-blue-800">
                    <span className="char3 text-black">Organize, <span className="text-blue-500 hover:text-blue-800 hover:scale-[1.5]">Book</span>, and <span className="text-blue-500 hover:text-blue-800 hover:scale-[1.15]">Explore</span> with Ease  </span>
                </div>
                <div className="text-center py-3">
                    <span className="char8 md:max-w-2xl font-freight font-semibold max-w-sm 2xl:max-w-4xl text-[0.7rem] md:text-xl 2xl:text-3xl inline-block ">{details2}</span>
                </div>
            </div>
            <div className="min-h-screen w-full py-6 2xl:py-20 flex justify-center flex-col gap-12 md:gap-[7rem] md:px-[7rem]">
                <HomeInfo details={homeInfoThree} image={desImage1} className="md:mx-0" />
                <HomeInfoCardOne items={HomeInfoOne} />
            </div>
            <div className="my-10 px-2">
                <div className="font-bold text-center md:text-3xl cursor-pointer 2xl:text-5xl font-retro text-blue-500 hover:text-blue-800">
                    <span className="char4 text-black">Smart Travel Planner  –  </span>
                    <span className="char4 ">Everything You Need in One Place</span>
                </div>
                <div className="text-center py-3">
                    <span className="char7 md:max-w-2xl font-freight font-semibold max-w-sm 2xl:max-w-4xl text-[0.7rem] md:text-xl 2xl:text-3xl inline-block ">{details2}</span>
                </div>
            </div>
            <div>
                <div className="min-h-screen w-full py-6 2xl:py-20 flex justify-center flex-col gap-12 md:gap-[7rem] md:px-[7rem]">
                    {/* <div className="scroll-fade-in"> */}
                    <HomeInfo details={homeInfoFour} image={desImage2} className="md:ml-auto" />
                    {/* </div> */}
                    <HomeInfoCardTwo items={HomeInfoTwo} />
                </div>
            </div>
            <div className="w-full h-0.5 bg-red-400 shadow-2xl opacity-55 overflow-hidden" />
            <Footer />
        </>
    );
};

export default Home;