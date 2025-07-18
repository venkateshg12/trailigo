import { image1 } from '@/constants/constant';

type HomeInfo = {
    details : string,
    image : string,
    className : string,
}
const HomeInfoCard = ({details, image, className} : HomeInfo) => {
    return (
        <div>
            <div className={`flex ${className || ' '} max-w-[70%] h-full flex-col md:flex-row max-[800px]:h-screen p-4 items-center gap-[3rem] max-[800px]:justify-between  border border-gray-300/30 shadow-lg shadow-gray-400/20 rounded-xl backdrop-blur-sm`}>
                <span className="max-w-lg 2xl:max-w-4xl 2xl:text-[1.6rem] tracking-wider font-freight font-bold">{details}</span>
                <figure className="overflow-hidden rounded-lg max-w-[25rem] max-h-[20rem] 2xl:max-w-[35rem] 2xl:max-h-[30rem] shadow-lg">
                    <img src={image} alt="image" className="  object-cover w-full h-full transition-transform duration-5  00 ease-in-out hover:scale-110 cursor-pointer" />
                </figure>
            </div>
        </div>
    )
}

export default HomeInfoCard;
