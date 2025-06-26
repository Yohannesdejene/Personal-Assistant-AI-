import Image from "next/image";
const SeeItInAction = () => {
  return (
    <div
      id="how-it-works"
      className="w-full px-6 md:px-10 py-0 text-center mt-10 mb-30 "
    >
      {" "}
      <h3 className="text-2xl font-bold text-white mb-2">
        See It In Action
      </h3>{" "}
      <h6 className="text-lg  mb-10 ">
        Experience the power of AI-driven productivity{" "}
      </h6>
      <div className="  flex flex-col md:flex-row  gap-5">
        <div className="w-full md:w-1/2">
          <img src="/seeInActionOne.png" alt="image" />
        </div>
        <div className="w-full md:w-1/2">
          <img src="/seeInActionTwo.png" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default SeeItInAction;
