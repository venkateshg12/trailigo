import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { Card } from './Card';

type HomeInfoItem = {
    details: string
    image: string
    className: string
}

type HomeInfoProps = {
    items: HomeInfoItem[]
}


const HomeInfoCardOne = ({ items }: HomeInfoProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    cardRefs.current = []

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };
    useGSAP(() => {
        const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null)
        if (cards.length === 0) return;
        gsap.set(cards, { yPercent: 100, opacity: 0 })
        const timeline = gsap.timeline({ repeat: -1 })
        const animationDuration = 1;
        const displayDuration = 1.4;
        cards.forEach((card, index) => {
            const startTime = index * (animationDuration + displayDuration);
            timeline.to(card, { yPercent: 0, opacity: 1, duration: animationDuration, ease: "power2.out" }, startTime);
            timeline.to(card, { yPercent: 0, opacity: 1, duration: displayDuration }, startTime + animationDuration);
            timeline.to(card, { yPercent: -100, opacity: 0, duration: animationDuration }, startTime + animationDuration + displayDuration);
            timeline.set(card, {
                yPercent: 100
            }, startTime + (animationDuration * 2) + displayDuration);
        });

        return () => {
            timeline.kill();
        }
        gsap.set(cards, { yPercent: 0, opacity: 1 });
    }, { scope: containerRef })

    return (
        <>
            <div ref={containerRef} className="min-h-[400px] relative ">
                <div className="relative ">
                    {items.map((item, index) => (
                        <div ref={addToRefs} key={index} className="absolute inset-0 p-4 ">
                            <Card details={item.details} image={item.image} className={item.className} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default HomeInfoCardOne;

