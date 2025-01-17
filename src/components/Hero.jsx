import ReferModal from "./modals/ReferModal";

function Hero() {
  return (
    <div className=" flex justify-center items-center">
      <div className="w-[80%] bg-[#eff5ff] flex flex-col lg:flex-row justify-between items-center py-10 px-8 rounded-2xl gap-3">
        <div className="w-[50%] flex flex-col gap-8">
          <h1 className="text-4xl lg:text-7xl font-bold">Lets Learn & Earn</h1>
          <p className="text-md lg:text-2xl font-light">
            Get a chances to win upto <br />
            <span className="text-[#1b70e2] font-medium text-lg lg:text-4xl">
              Rs.15,000
            </span>
          </p>
          <ReferModal />
        </div>
        <div className="w-[50%] object-cover rounded-md">
          <img
            className="h-full w-full bg-[#eff5ff]"
            src="https://www.shoppre.com/img/refer-and-earn/refer-and-earn-shoppre-shipping.png"
            alt="REFER IMAGE"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
