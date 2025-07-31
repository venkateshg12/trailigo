import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from 'gsap';

type HomeInfoItem = {
    details: string
    image: string
}

type HomeInfoProps = {
    items: HomeInfoItem[]
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
        const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null)
        if (cards.length === 0) return;
        gsap.set(cards, { yPercent: 50, opacity: 0 })
        const timeline = gsap.timeline({ repeat: -1 })
        const animationDuration = 1.3;
        const displayDuration = 1.4;
        cards.forEach((card, index) => {
            const startTime = index * (animationDuration + displayDuration);
            timeline.to(card, { yPercent: 0, opacity: 1, duration: animationDuration, ease: "power2.out" }, startTime);
            timeline.to(card, { yPercent: 0, opacity: 1, duration: displayDuration }, startTime + animationDuration);
            timeline.to(card, { yPercent: -50, opacity: 0, duration: animationDuration }, startTime + animationDuration + displayDuration);
            timeline.set(card, {
                yPercent: 100
            }, startTime + (animationDuration * 2) + displayDuration);
        });

        return () => {
            timeline.kill();
        }
    }, { scope: containerRef }) 

    return (
        <>
            <div ref={containerRef} className="relative min-h-[500px] md:min-h-[300px] w-full overflow-hidden">
                <div className="relative h-full w-full overflow-hidden">
                    {items.map((item, index) => (
                        <div key={index} ref={addToRefs} className="absolute top-0 left-0 right-0 bottom-0 p-4 flex justify-center md:justify-end items-center">
                            <Card details={item.details} image={item.image} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default HomeInfoCard;

type CardProps = {
    image: string,
    details: string,
}

export const Card = ({ details, image }: CardProps) => {
    return (
        <>
            <div className='md:ml-auto mx-auto md:mx-0 bg-white max-w-full'>
                <div className="p-3  shadow-[10px_13px_24px_rgba(0,0,0,0.1)] mx-auto md:mx-0  rounded-2xl inline-block max-w-full">
                    <div className="flex gap-2 items-center md:flex-row flex-col-reverse flex-1 ">
                        <div className=" max-w-[19rem] md:text-start text-center md:max-w-lg 2xl:max-w-[70rem] text-wrap">
                            <span className="2xl:text-[1.6rem]">{details}</span>
                        </div>
                        <figure className=" overflow-hidden h-[10rem] object-cover w-[16rem] md:min-w-[18rem] md:min-h-[12rem] rounded-2xl ">
                            <img src={image} alt="" className=" h-[10rem] object-cover w-[16rem] md:min-w-[18rem] md:min-h-[12rem] rounded-2xl zoom_In 2xl:min-w-[18rem] 2xl:min-h-[12rem]" />
                        </figure>
                    </div>
                </div>
            </div>
        </>
    )
} 