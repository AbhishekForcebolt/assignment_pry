import * as React from "react";

import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import CalcInput_Input from "./input";

interface ICalcInputProps {
  sections: string[]
}

const CalcInput: React.FunctionComponent<ICalcInputProps> = ({sections}) => {
  const sectionFields = sections.map((section, i) => {
    return {
      id: i,
      name: section,
      value: "",
      isError: false,
    };
  });

  const [fields, setFields] = React.useState(sectionFields);

  const changeField = (id: number, property: string, value: string | boolean) => {
    setFields((fieldItems) =>
      fieldItems?.map((fieldItem) => {
        if (fieldItem?.id === id) {
          return {
            ...fieldItem,
            [property]: value,
          };
        } else {
          return fieldItem;
        }
      })
    );
  };

  const items: CollapseProps["items"] = fields?.map((field) => {
    return {
      key: field?.id,
      label: (
        <div>
          <div className="w-full border-b text-sm font-bold border-gray-300 p-1">
            {field?.name}
          </div>
          {field?.isError ? (
            <div className="p-1 text-lg text-bold text-red-500">Error: Inavlid Syntax</div>
          ) : (
            <div className="p-1 text-lg text-bold"># {field?.value}</div>
          )}
        </div>
      ),
      children: <CalcInput_Input id={field?.id} changeField={changeField}></CalcInput_Input>,
    };
  });

  return (
    <div className="w-full border">
      <Collapse items={items} defaultActiveKey={["0"]} />
    </div>
  );
};

export default CalcInput;
