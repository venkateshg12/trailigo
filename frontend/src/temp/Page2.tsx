
const Page2 = () => {
    return (
        <div>
            <div className="flex h-full justify-center gap-[10%] items-center z-50 relative px-4">
                <div className="max-w-2xl">
                    <div ref={titleRef} className="text-white font-bold text-4xl md:text-7xl mb-4">
                        <span>{currentContent.country}</span>
                    </div>
                    <div ref={aboutRef} className="max-w-[42rem]">
                        <span className="text-white text-sm md:text-base leading-relaxed">
                            {currentContent.about}
                        </span>
                    </div>
                </div>
                <div className="flex-shrink-0 bg-white relative w-[40rem] h-[30rem] overflow-hidden">
                    {mainPageImageContent.map((item, index) => (
                        <img
                            key={index}
                            data-image-index={index}
                            src={item.smallImg}
                            className="absolute flex items-center w-[16rem] h-[20rem] md:w-[20rem] md:h-[28rem] object-cover rounded-lg shadow-2xl"
                            alt={item.country}
                            style={{
                                opacity: index === currentIndex ? 1 : 0,
                                transform: index === currentIndex ? 'translateX(0)' : 'translateX(300px)',
                                zIndex: index === currentIndex ? 2 : 1
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page2
