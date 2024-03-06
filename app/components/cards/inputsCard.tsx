import * as React from "react";

interface IInputsCardProps {
  name:string;
  value:number
}

const InputsCard: React.FunctionComponent<IInputsCardProps> = ({name, value}) => {
  return (
    <div className="w-full border border-gray-300">
      <div className=" bg-gray-200 w-full p-2 text-lg">{name}</div>
      <div className="w-full p-2 text-base">Value:{value}</div>
    </div>
  );
};

export default InputsCard;
