const HowItWorks = () => {
  return (
    <div
      id="how-it-works"
      className="w-full px-6 md:px-10 py-0 text-center mt-10 "
    >
      {" "}
      <h3 className="text-2xl font-bold text-white mb-2">How it works</h3>{" "}
      <h6 className="text-lg  mb-2 ">
        Three simple steps to transform your productivity{" "}
      </h6>
      <div className="grid  md:grid-cols-3 gap-1 px-2 ">
        {" "}
        <div className="text-center     p-8  rounded-2xl">
          {" "}
          <div className="w-12 h-12  bg-white/10  rounded-[50%]  flex items-center justify-center mx-auto mb-4">
            {" "}
            1
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">
            Chat with Assistant
          </h4>{" "}
          <p className="text-white/80 text-sm">
            Simply start a conversation. Tell your AI assistant what you need to
            do, schedule, or organize.
          </p>{" "}
        </div>{" "}
        <div className="text-center  p-8  rounded-2xl">
          {" "}
          <div className="w-12 h-12 bg-white/10  rounded-[50%] flex items-center justify-center mx-auto mb-4">
            {" "}
            2
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">
            Schedule & Manage{" "}
          </h4>{" "}
          <p className="text-white/80 text-sm">
            Your assistant automatically handles scheduling, task creation, and
            calendar management.
          </p>{" "}
        </div>{" "}
        <div className="text-center p-8 rounded-2xl">
          {" "}
          <div className="w-12 h-12 rounded-[50%] bg-white/10  flex items-center justify-center mx-auto mb-4">
            {" "}
            3{" "}
          </div>{" "}
          <h4 className="text-white font-semibold mb-2">
            Get Daily Insights
          </h4>{" "}
          <p className="text-white/80 text-sm">
            Receive personalized reports and insights to optimize your
            productivity and stay on track.
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default HowItWorks;
