
type HomeInfo = {
  details: string,
  image: string,
}
const HomeInfo = ({ details, image }: HomeInfo) => {
  return (
    <div className="p-3 outline-1 outline-blue-300 shadow-[0_12px_24px_rgba(0,0,0,0.2)]  mx-auto md:mx-0 rounded-2xl inline-block max-w-fit">
      <div className="flex gap-2 items-center md:flex-row flex-col-reverse ">
        <div className=" max-w-[19rem] md:text-start text-center md:max-w-lg 2xl:max-w-[70rem] text-wrap">
          <span className="2xl:text-[1.6rem]">{details}</span>
        </div>
        <figure className="">
          <img src={image} alt="" className=" h-[10rem] w-[10rem] md:max-w-[10rem] md:max-h-[10rem] 2xl:min-w-[18rem] 2xl:min-h-[18rem]" />
        </figure>
      </div>
    </div>
  )
}

export default HomeInfo
