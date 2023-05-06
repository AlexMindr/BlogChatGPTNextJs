import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center m-20">
      <div
        className="inline-block text-accent-red h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-r-transparent 
align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}

export default Loading;
