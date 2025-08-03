type CardProps = {
    image: string,
    details: string,
    className : string
}

export const Card = ({ details, image, className }: CardProps) => {
    return (
        <>
            <div className={` ${className} outline outline-blue-400/50  shadow-[1px_7px_4px_rgba(10,10,10,0.1)] my-5 mx-auto md:mx-0  bg-white max-w-fit rounded-2xl overflow-hidden`}>
                <div className="p-3  mx-auto md:mx-0  rounded-2xl inline-block max-w-full">
                    <div className="flex gap-2 items-center md:flex-row flex-col-reverse flex-1 ">
                        <div className=" max-w-[19rem] md:text-start text-center md:max-w-lg 2xl:max-w-[70rem] text-wrap">
                            <span className="2xl:text-[1.6rem]">{details}</span>
                        </div>
                        <figure className=" overflow-hidden h-[10rem] object-cover w-[16rem] md:min-w-[18rem] md:min-h-[12rem] 2xl:min-w-[25rem] 2xl:min-h-[20rem] rounded-2xl">
                            <img src={image} alt="" className=" h-[10rem] object-cover w-[16rem] md:min-w-[18rem] md:min-h-[12rem] rounded-2xl zoom_In 2xl:min-w-[30rem] 2xl:min-h-[20rem]" />
                        </figure>
                    </div>
                </div>
            </div>
        </>
    )
} 