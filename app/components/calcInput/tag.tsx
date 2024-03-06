import * as React from "react";

interface ICalcInput_TagProps {
  name: string;
  isOperator: boolean;
}

const CalcInput_Tag: React.FunctionComponent<ICalcInput_TagProps> = ({
  name,
  isOperator,
}) => {
  return (
    <div className="inline-flex flex-none max-w-full mx-[2px]">
      {isOperator ? (
        <span>{name}</span>
      ) : (
        <span
          className="bg-[#D3D3D3] h-6 px-2 rounded leading-[22px] relative overflow-hidden whitespace-nowrap text-ellipsis"
          style={{ border: "apx solid transparent" }}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default CalcInput_Tag;
