
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


const HomeInfoCardTwo = ({ items }: HomeInfoProps) => {
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
        gsap.set(cards, {
            xPercent: -120,
            opacity: 0,
            scale: 0.85,
            rotationY: 25,
            filter: "blur(12px)",
            transformOrigin: "center center",
        })

        const timeline = gsap.timeline({ repeat: -1 })
        const animationDuration = 1.4
        const displayDuration = 2.2
        const exitDuration = 1

        cards.forEach((card, index) => {
            const startTime = index * (animationDuration + displayDuration * 0.6)

            timeline.to(
                card,
                {
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    filter: "blur(0px)",
                    duration: animationDuration,
                    ease: "power3.out",
                },
                startTime,
            )

            timeline.to(
                card,
                {
                    scale: 1.03,
                    rotationY: -2,
                    duration: displayDuration * 0.5,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: 1,
                },
                startTime + animationDuration,
            )

            timeline.to(
                card,
                {
                    opacity: 0,
                    scale: 0.9,
                    rotationY: -20,
                    filter: "blur(10px)",
                    duration: exitDuration,
                    ease: "power2.in",
                },
                startTime + animationDuration + displayDuration,
            )

            // Reset for next cycle
            timeline.set(
                card,
                {
                    xPercent: 50,
                    opacity: 0,
                    scale: 0.85,
                    rotationY: 25,
                    filter: "blur(12px)",
                },
                startTime + animationDuration + displayDuration + exitDuration,
            )
        })

        return () => {
            timeline.kill()
        }
    }, { scope: containerRef })
return (
    <div>
        <>
            <div ref={containerRef} className="min-h-[400px] md:min-h-[300px] 2xl:min-h-[400px] min-w-[400px] overflow-x-hidden ">
                <div className="relative ml-5">
                    {items.map((item, index) => (
                        <div ref={addToRefs} key={index} className="absolute inset-0 p-4">
                            <Card details={item.details} image={item.image} className={item.className} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    </div>
)
}
export default HomeInfoCardTwo;