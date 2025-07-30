import { useState } from "react";
import bananaBeach from "../assets/beacch.webp";
import burjAlarab from "../assets/burj-alarab.webp";
import glacier from "../assets/glacier.webp";
import mountain from "../assets/mountain.webp";
import switzerland from "../assets/switzerland.webp";

export const navlinks = [{ name: "Home", path: "/" }, { name: "Register", path: "/register" }, { name: "Sign In", path: "/signin" }];

export const images = [bananaBeach, burjAlarab, glacier, mountain, switzerland]


export const image11 = "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const image12 = "https://images.pexels.com/photos/19756845/pexels-photo-19756845.jpeg";
export const image13 = "https://images.pexels.com/photos/12369262/pexels-photo-12369262.jpeg";
export const image21 = "https://images.pexels.com/photos/17362088/pexels-photo-17362088.jpeg";
export const image22 = "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg";
export const image23 = "https://images.pexels.com/photos/33210214/pexels-photo-33210214.jpeg";
export const image3 = "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const image4 = "https://plus.unsplash.com/premium_photo-1673697239633-5f5b91092bd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


export const address = [
    { ad1: "Bali", ad2: "Indonesia" },
    { ad1: "Burj Al Arab", ad2: "Dubai" },
    { ad1: "Mount Cook", ad2: "New Zealand" },
    { ad1: "Reinefjorden", ad2: "Norway" },
    { ad1: "Lake Lucerne", ad2: "Switzerland" },
];


export const homeInfoOneOne = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoOneTwo = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoOneThree = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoTwoOne = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoTwoTwo = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoTwoThree = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoThree = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoFour = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoFive = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."
export const homeInfoSix = "Design your dream trip effortlessly with Trip Planner AI. Our intelligent system curates the ideal travel itinerary by blending your favorite attractions, restaurants, and accommodations — all tailored to match your style and schedule."


export const HomeInfoOne = [
    {
        details: homeInfoOneOne,
        image: image11,
     
    },
    {
        details: homeInfoOneTwo,
        image: image12,
    },
       
    {
        details: homeInfoOneThree,
        image: image13,
    }
]

export const houseInfoTwo = [
     {
        details : homeInfoTwoOne,
        image : image21,
        className : "min-[800px]:justify-center",
    },
     {
        details : homeInfoTwoTwo,
        image : image22,
        className : "min-[800px]:justify-center",
    },
     {
        details : homeInfoTwoThree,
        image : image23,
        className : "min-[800px]:justify-center",
    }
]


interface HamburgerMenuProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
}


const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    size = 32,
    color = '#fff',
    strokeWidth = 3,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                onClick={toggleMenu}
                className={`relative p-2 focus:outline-none  rounded-md transition-all duration-200 `}
                style={{ width: size + 16, height: size + 16 }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <div className="relative" style={{ width: size, height: size }}>
                    {/* Top line */}
                    <div
                        className="absolute left-0 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                            width: size,
                            height: strokeWidth,
                            backgroundColor: color,
                            top: isOpen ? '50%' : '25%',
                            transform: isOpen
                                ? 'translateY(-50%) rotate(45deg)'
                                : 'translateY(-50%) rotate(0deg)',
                            transformOrigin: 'center'
                        }}
                    />

                    {/* Bottom line */}
                    <div
                        className="absolute left-0 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                            width: size,
                            height: strokeWidth,
                            backgroundColor: color,
                            top: isOpen ? '50%' : '75%',
                            transform: isOpen
                                ? 'translateY(-50%) rotate(-45deg)'
                                : 'translateY(-50%) rotate(0deg)',
                            transformOrigin: 'center'
                        }}
                    />
                </div>
            </button>
        </div>
    );
};

export default HamburgerMenu;