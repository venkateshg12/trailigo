import { useState } from "react";
import bananaBeach from "../assets/beacch.webp";
import burjAlarab from "../assets/burj-alarab.webp";
import glacier from "../assets/glacier.webp";
import mountain from "../assets/mountain.webp";
import switzerland from "../assets/switzerland.webp";

export const navlinks = [{ name: "Home", path: "/" },{ name: "Register", path: "/register" },{ name: "Sign In", path: "/signin" }];

export const images = [bananaBeach, burjAlarab, glacier, mountain, switzerland]

export const address = [
  { ad1: "Bali", ad2: "Indonesia" },
  { ad1: "Burj Al Arab", ad2: "Dubai" },
  { ad1: "Mount Cook", ad2: "New Zealand" },
  { ad1: "Reinefjorden", ad2: "Norway" },
  { ad1: "Lake Lucerne", ad2: "Switzerland" },
];
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