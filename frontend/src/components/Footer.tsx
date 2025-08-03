import { InfoOne, InfoTwo } from "@/constants/constant";
import facebook from "@/assets/facebook.png";
import linkedin from "@/assets/linkedin.png";
import twitter from "@/assets/twitter.png";
import instagram from "@/assets/instagram.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="min-h-[300px] flex  items-center flex-col md:flex-row justify-center md:justify-between mx-[10rem] gap-20">
        <Link to="/">
        <h1 className=" max-[500px]:text-[3rem] mt-10 md:mt-0  min-[500px]:text-[5rem] 2xl:text-[7rem] font-bold font-tumbler cursor-pointer tracking-widest">Trailigo</h1>
        </Link>
        <div className="flex gap-10">
          <div className="flex flex-col font-bold font-montreal ">
            {
              InfoOne.map((info, index) => (
                <span key={index} className="cursor-pointer hover:underline text-nowrap text-[3vw] md:text-2xl ">{info}</span>
              ))
            }
          </div>
          <div className="flex flex-col font-bold font-montreal">
            {
              InfoTwo.map((info, index) => (
                <span key={index} className="cursor-pointer text-[3vw] text-nowrap md:text-2xl hover:underline">{info}</span>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-10  my-10  items-center cursor-pointer">
        <img src={twitter} alt="" className="md:w-[2rem] md:h-[2rem] w-[9vw] h-[9vw] hover:scale-[1.05]" />
        <img src={facebook} alt="" className="md:w-[2rem] md:h-[2rem] w-[9vw] h-[9vw]  hover:scale-[1.05]" />
        <img src={instagram} alt="" className="md:w-[2rem] md:h-[2rem] w-[9vw] h-[9vw]  hover:scale-[1.05]" />
        <img src={linkedin} alt="" className="md:w-[2rem] md:h-[2rem] w-[9vw] h-[9vw]  hover:scale-[1.05]" />
      </div>
    </div>
  )
}
export default Footer;