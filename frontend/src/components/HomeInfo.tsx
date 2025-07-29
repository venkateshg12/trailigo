
type HomeInfo = {
    details : string,
    image : string,
}
const HomeInfo = ({details, image} : HomeInfo) => {
  return (
    <div>
        <div className="flex md:flex-row flex-1 items-center min-[800px]:pl-[5rem] max-[800px]:mx-2 max-[800px]:gap-[5rem] 2xl:pl-[20rem] max-[800px]:flex-col-reverse  mb-[7rem] mt-[5rem]  gap-5">
            <span className="max-w-lg 2xl:max-w-3xl 2xl:text-[1.5rem]">{details}</span>
            <figure className="max-w-[14rem] max-h-[10rem] mb-4 2xl:max-w-[20rem] 2xl:max-h-[15rem]  ">
                <img src={image} alt="" className=""  />
            </figure>
        </div>
    </div>
  )
}

export default HomeInfo
