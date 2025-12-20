import React from 'react';
import { useState } from "react";
import bananaBeach from "../assets/beacch.webp";
import burjAlarab from "../assets/burj-alarab.webp";
import glacier from "../assets/glacier.webp";
import mountain from "../assets/mountain.webp";
import switzerland from "../assets/switzerland.webp";
import ImageAnimation from "@/components/ImageAnimation";
import { Earth, Globe, Landmark, MapPinHouse } from 'lucide-react';

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

export const mainPageImageContent = [
    {
        image: "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        smallImg: "https://images.unsplash.com/photo-1597735881932-d9664c9bbcea?q=80&w=683&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Kerala",
        about: "Kerala is a state on the southwestern coast of India, along the Arabian Sea. It’s famous for its natural beauty, rich culture, and high literacy rate."
    },
    {
        image: "https://images.unsplash.com/photo-1620562423895-ad4924643d43?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        smallImg: "https://images.unsplash.com/photo-1514970746-d4a465d514d0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Switzerland",
        about: "Switzerland is a landlocked country in Central Europe, famous for its breathtaking landscapes, high living standards, and neutrality in world politics."
    },
    {
        image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        smallImg: "https://images.unsplash.com/photo-1601823984263-b87b59798b70?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Darjeeling",
        about: "Darjeeling is a hill station in West Bengal, India, located in the Lesser Himalayas at about 2,000 meters (6,700 ft) above sea level. It’s famous for its tea, views of the Kanchenjunga (the world’s third-highest mountain), and colonial charm."
    },
    {
        image: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        smallImg: "https://images.unsplash.com/photo-1603755962670-a6f92be76d5e?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Japan",
        about: "An island nation in East Asia, made up of 4 main islands — Honshu, Hokkaido, Kyushu, and Shikoku — plus thousands of smaller ones.Surrounded by the Pacific Ocean, with mountains (like Mt. Fuji), forests, hot springs, and bustling cities."
    },
    {
        image: "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        smallImg: "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "france",
        about: "France 🇫🇷 is a country in Western Europe known for its rich history, art, culture, and fashion. Its capital, Paris, is famous for landmarks like the Eiffel Tower and the Louvre Museum. France is celebrated for its cuisine, wine, and romantic charm"
    },
]


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


export const InfoOne = ["About", "Contact Us", "Careers", "Culture", "Blog"];
export const InfoTwo = ["Getting Started", "Help Center", "Server Status", "Support", "Report a bug"]

export const HomeInfoOne = [
    {
        details: homeInfoOneOne,
        image: image11,
        className: "md:ml-auto"

    },
    {
        details: homeInfoOneTwo,
        image: image12,
        className: "md:ml-auto"
    },

    {
        details: homeInfoOneThree,
        image: image13,
        className: "md:ml-auto"
    }
]


export const HomeInfoTwo = [
    {
        details: homeInfoTwoOne,
        image: image21,
        className: "md:mr-auto",
    },
    {
        details: homeInfoTwoTwo,
        image: image22,
        className: "md:mr-auto",
    },
    {
        details: homeInfoTwoThree,
        image: image23,
        className: "md:mr-auto",
    }
]

export const Suggestions = [
    {
        title : 'Discover Hidden Gems',
        icon : <Landmark className='text-blue-500 h-5 w-5 hover:text-red-400' />
    },
    {
        title: 'Begin Your Travel Story',
        icon: <Earth className='text-blue-500 h-5 w-5 hover:text-red-400' />
    },
    {
        title : 'Uncover Wild Adventures',
        icon : <Globe className='text-blue-500 h-5 w-5 hover:text-red-400' />
    }

]

export const ASuggestions = [
    {
        title : "Plan a new Trip",
        icon : <Globe className='text-blue-500 h-5 w-5 hover:text-red-400' />
    },
    {
        title : "Inspire me where to go",
        icon :   <MapPinHouse className='text-blue-500 h-5 w-5 hover:text-red-400' />
    },
    {
        title : "Discover Hidden Gems",
        icon : <Landmark className='text-blue-500 h-5 w-5 hover:text-red-400'/>
    },
    {
        title : "Adventure Destinations",
        icon : <Earth className='text-blue-500 h-5 w-5 hover:text-red-400'/>
    }
]

export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo travel experience focused on self-discovery and exploration',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'A romantic getaway for two travelers exploring together',
    icon: '💑',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A joyful family trip filled with bonding and shared memories',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A fun-filled adventure with friends, laughter, and unforgettable moments',
    icon: '👫',
    people: '5 to 7 People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs and travel on a tight budget',
    icon: '💸',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs balanced while enjoying a comfortable trip',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Travel in style without worrying about expenses',
    icon: '💎',
    color: 'bg-purple-100 text-purple-600'
  }
];


export const details2 = "Take the stress out of trip planning. Our intelligent platform helps you manage flights, hotels, bookings, and even travel tips—everything you need, all in one convenient spot.";

export interface User {
    email: string;
    verified: boolean;
    createdAt: string;
}


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


export const Spinner = () => {
    return <div className="spinner"></div>;
};


export const LoadingDots = () => {

    return (
        <>
            <div className="flex space-x-1 justify-center items-center">
                <div className='dotAnimation1 text-white rounded-full animate-pulse text-2xl'>•</div>
                <div className='dotAnimation2 text-white rounded-full animate-pulse text-2xl'>•</div>
                <div className='dotAnimation3 text-white rounded-full animate-pulse text-2xl'>•</div>
                <div className='dotAnimation4 text-white rounded-full animate-pulse text-2xl'>•</div>
            </div>
        </>
    )

}

export const Verified = () => {
    return (
        <div className="relative">
            <div className="absolute inset-0 ">
                <ImageAnimation />
            </div>
            <div className="min-h-screen absolute inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl text-center shadow-lg">
                    <div className="flex justify-center items-center">
                        <svg className="mx-auto h-10 w-10 text-green-500" fill="none" viewBox="0 0 34 10" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="mt-4 text-2xl font-bold font-kanit">Email Verified!</h2>
                    </div>
                    <p className="mt-2 text-gray-600">Redirecting you now...</p>
                </div>
            </div>
        </div>
    );
}

export const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
}

export const LoadingSpinnerWithProgress = ({ progress }: { progress: number }) => (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
            {/* Main Spinner */}
            <div className="relative">
                <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
                <div
                    className="absolute top-0 left-0 w-20 h-20 border-4 border-t-white border-r-white/60 rounded-full animate-spin"
                    style={{
                        animationDuration: '1s',
                    }}
                ></div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-white rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
                <div className="text-white font-montreal text-xl mb-2">
                    Loading Experience... {progress}%
                </div>
                <div className="text-white/60 font-montreal text-sm">
                    {progress < 50 ? 'Preparing your journey' :
                        progress < 80 ? 'Loading destinations' :
                            'Lets go...'}
                </div>
            </div>

            {/* Trailigo Brand */}
            <div className="absolute bottom-10">
                <h2 className="text-white/40 font-tumbler text-2xl tracking-widest">Trailigo</h2>
            </div>
        </div>
    </div>
);
