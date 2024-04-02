import React from "react";
import { RiLoader4Line } from "react-icons/ri";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <RiLoader4Line className="animate-spin text-xl text-white" />
    </div>
  );
};

export default Loading;