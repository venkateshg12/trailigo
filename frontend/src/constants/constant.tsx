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


import React from 'react';
import ImageAnimation from "@/components/ImageAnimation";
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