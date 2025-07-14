import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HamburgerMenu, { navlinks } from "../constants/constant";

const Navbar = () => {
    const [openNav, setOpenNav] = useState<boolean>(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileNavRef = useRef<HTMLDivElement>(null);

    const toggleScreenLock = () => {
        if (!openNav) {
            setOpenNav(true);
        } else {
            animateMenuClose();
        }
    };

    const animateMenuClose = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setOpenNav(false);
            }
        });
    }

    return (
        <div >
            <div className="w-full bg-transparent">
                <div className=" px-4 md:px-8 lg:px-7  py-5 md:py-6 lg:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0 z-50 md:pl-[2rem] 2xl: pl-[3rem] cursor-pointer">
                            <h1 className="text-[1.7rem] font-michroma 2xl:text-[3rem]"><a href="/"> Trailigo</a> </h1>
                        </div>
                        <div className=" md:flex items-center justify-evenly gap-5 xl:gap-[1.4vw] 2xl:text-[1vw] md:text-[1.1rem] hidden 2xl:mr-[7rem]">
                            <nav ref={navRef} className="font-montreal cursor-pointer flex items-center gap-5 lg:gap-6 xl:gap-8 2xl:gap-[1.4vw] font-bold mr-[5rem]">
                                {navlinks.map((item, index) => (
                                    <a /* href={`#${item.toLowerCase()}`} */
                                        key={index}
                                        className="nav-link cursor-pointer inline-block relative font-kanit"
                                        onClick={() => {
                                            const target = document.getElementById(item.toLowerCase());
                                            if (target) {
                                                target.scrollIntoView({ behavior: "smooth" });
                                            }
                                        }}
                                    > {item}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="md:hidden z-50" onClick={toggleScreenLock}>
                            <HamburgerMenu />
                        </div>
                    </div>
                </div>
            </div >
            {
                openNav && (
                    <>
                        <div ref={mobileMenuRef} className="relative md:hidden flex flex-col font-montreal z-50  bg-white h-screen text-black items-center justify-center">
                            <nav ref={mobileNavRef} className="flex flex-col items-center justify-center -mt-[50vh] pl-[1rem] gap-3 text-[1.7rem]">
                                {
                                    navlinks.map((item, index) => (
                                        <a href={`#${item.toLowerCase()}`} key={index} className="inline-block cursor-pointer"
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                                opacity: 0,
                                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
                                            }}
                                            onClick={toggleScreenLock}
                                        > {item}</a>
                                    ))
                                }
                            </nav>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default Navbar;