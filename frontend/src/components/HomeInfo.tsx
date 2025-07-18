
type HomeInfo = {
    details : string,
    image : string,
}
const HomeInfo = ({details, image} : HomeInfo) => {
  return (
    <div>
        <div className="flex md:flex-row flex-1 items-center pl-[5rem] 2xl:pl-[20rem] mb-[10rem] mt-[5rem] justify-start gap-5">
            <span className="max-w-lg 2xl:max-w-3xl 2xl:text-[1.5rem]">{details}</span>
            <figure className="max-w-[14rem] max-h-[10rem] 2xl:max-w-[20rem] 2xl:max-h-[15rem]  ">
                <img src={image} alt="" className=""  />
            </figure>
        </div>
    </div>
  )
}

export default HomeInfo
