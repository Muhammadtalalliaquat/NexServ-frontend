
export default function NextServLoader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-t-pink-600 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin shadow-lg mb-4"></div>
      <span className="text-xl font-bold text-gray-800">NexServ</span>
    </div>
    // <div className="flex flex-col justify-center items-center min-h-screen">
    //   <div className="relative z-10 flex flex-col items-center">
    //     <h1 className="text-4xl font-bold mb-2">
    //       <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
    //         NexServ
    //       </span>
    //     </h1>

    //     <p className="text-gray-400 text-sm flex items-center gap-2">
    //       <span>Loading</span>
    //       <span className="flex gap-1">
    //         <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></span>
    //         <span
    //           className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
    //           style={{ animationDelay: "0.1s" }}
    //         ></span>
    //         <span
    //           className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
    //           style={{ animationDelay: "0.2s" }}
    //         ></span>
    //       </span>
    //     </p>
    //   </div>
    // </div>
  );
}
