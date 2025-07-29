import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from 'gsap';


type HomeInfoItem = {
    details: string,
    image: string,
    className: string,
}

type HomeInfoProps = {
    items: HomeInfoItem[];
}
const HomeInfoCard = ({ items }: HomeInfoProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    cardRefs.current = []

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    useGSAP(() => {
        const cards = cardRefs.current.filter((card): card is HTMLDivElement => card != null);

        if (cards.length === 0) return;

        cards.forEach((card, index) => {
            if (index !== 0) {
                gsap.set(card, { yPercent: 100 });
            }
        });

        // Creating infinite timeline
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        cards.forEach((card, index) => {

            timeline.to(card, {
                scale: 0.9,
                borderRadius: "10px",
                duration: 1,
                ease: "power2.out"
            });

            // Bring next card up 
            const nextIndex = (index + 1) % cards.length;
            timeline.to(
                cards[nextIndex],
                {
                    yPercent: 0,
                    duration: 1,
                    ease: "power2.out"
                },
                "<"
            );

            // Move current card down after a delay
            timeline.to(card, {
                yPercent: -100,
                duration: 1,
                ease: "power2.in"
            }, "+=1");

            // Reset current card position for next cycle
            timeline.set(card, {
                yPercent: 100,
                scale: 1,
                borderRadius: "0px"
            });
        });

        // Cleanup function
        return () => {
            timeline.kill();
        };
    }, { scope: containerRef });
    return (
        <div ref={containerRef} className="relative h-[500px] w-full overflow-hidden">
            <div className="relative h-full">
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={addToRefs}
                        className='absolute inset-0 z-50 w-full h-full'
                    >
                        <Card
                            details={item.details}
                            image={item.image}
                            className={item.className}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}


type CardProps = {
    details: string,
    image: string,
    className: string,
}
export const Card = ({ details, image, className }: CardProps) => {
    return (
        <div>
            <div className={`flex ${className || ' '} max-[800px]:p-5  max-[800px]:m-3 min-[800px]:max-w-[90%] h-auto flex-col md:flex-row  md:p-4 items-center gap-[3rem] max-[800px]:text-center   border border-blue-300/100 shadow-lg shadow-gray-400/20 rounded-xl `}>
                <span className="max-w-lg 2xl:max-w-4xl 2xl:text-[1.6rem] tracking-wider font-freight font-bold">{details}</span>
                <figure className="overflow-hidden rounded-lg max-w-[25rem] max-h-[20rem] 2xl:max-w-[35rem] 2xl:max-h-[30rem] shadow-lg">
                    <img src={image}
                        alt="image"
                        className="  object-cover w-full h-full cursor-pointer zoom_In" />
                </figure>
            </div>
        </div>
    )
}
export default HomeInfoCard;
