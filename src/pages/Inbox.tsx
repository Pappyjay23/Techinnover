import { IoMailSharp } from "react-icons/io5";

const Inbox = () => {
  return (
    <main className="flex-1 p-2 overflow-hidden flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-fit bg-[#F5F3FF] rounded-lg p-10">
        <IoMailSharp className="text-[#4F35F3] text-4xl lg:text-5xl mb-4" />
        <h1 className="text-3xl font-bold text-black mb-2">Inbox</h1>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Stay connected with your messages.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-black text-center">
            The inbox feature is coming soon! You'll be able to send and receive messages easily.
          </p>
          <div className="mt-6 bg-gray-300 h-2 rounded-full overflow-hidden">
            <div className="bg-[#4F35F3] h-full w-1/4 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-sm text-center mt-2">
            Feature completion: 25%
          </p>
        </div>
      </div>
    </main>
  );
};

export default Inbox;
