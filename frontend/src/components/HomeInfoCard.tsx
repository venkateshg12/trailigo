import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from 'gsap';


type HomeInfoItem = {
    details: string,
    image: string,
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
        const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
        
        if (cards.length === 0) return;
        gsap.set(cards, {yPercent : 100});

        // Creating infinite timeline
        const timeline = gsap.timeline({ repeat: -1});

        cards.forEach((card, index) => {
            const startTime  = index * 2;
            timeline.to(card, { yPercent: 0, duration: 1, ease: "power2.out" }, startTime);
            timeline.to(card, { yPercent: 0, duration: 1}, startTime + 1);
            timeline.to(card, { yPercent: -100, duration: 1, ease : "power2.in"}, startTime + 2);
            timeline.set(card , {yPercent : 100}, startTime + 3);
        });

        // Cleanup function
        return () => {
            timeline.kill();
        };
    }, { scope: containerRef });
    return (
        <div ref={containerRef} className="relative h-[500px] w-full overflow-hidden">
            <div className="relative w-full h-full">
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={addToRefs}
                        className='absolute w-[100%] h-[100%] flex items-center justify-center'
                    >
                        <Card
                            details={item.details}
                            image={item.image}
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
}
export const Card = ({ details, image }: CardProps) => {
    return (
        <div>
            hello world
        </div>
    )
}
export default HomeInfoCard;