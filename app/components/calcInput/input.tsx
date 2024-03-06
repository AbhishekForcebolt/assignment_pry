import * as React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useTagstore } from "../../store/zustand";
import CalcInput_Tag from "./tag";
import { ALLOWED_OPERATORS } from "../utils/constants";
import { evaluate } from "mathjs";

interface ICalcInput_InputProps {
  id: number;
  changeField: (id: number, property: string, value: string | boolean) => void;
}

type LabelData = {
  id: string;
  label: string;
  mathValue: string | number;
  name: string;
  isOperator: boolean;
};

const CalcInput_Input: React.FunctionComponent<ICalcInput_InputProps> = ({
  id,
  changeField,
}) => {
  const options: SelectProps["options"] = [];
  const [selectedValues, setSelectedValues] = React.useState<[] | LabelData[]>(
    []
  );
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const { tags } = useTagstore();


  const selectValue = (options: any) => {
    const newValue = {
      id: options?.id,
      label: options?.label,
      mathValue: options?.mathValue,
      name: options?.name,
      isOperator: ALLOWED_OPERATORS.includes(options?.name),
    };
    setSelectedValues((val) => [...val, newValue]);
    setSearchValue("");
    setIsDropDownOpen(false);
  };

  tags.forEach((tag) => {
    options.push({
      ...tag,
      label: tag.name,
      value: tag.name,
      mathValue: tag.value,
    });
  });

  const handleSearch = (value: string) => {
    const newValue = {
      label: value,
      name: value,
    };
    switch (true) {
      case ALLOWED_OPERATORS.includes(value):
        selectValue(newValue);
        setIsDropDownOpen(false);
        setSearchValue("");
        break;
      default:
        setIsDropDownOpen(true);
        setSearchValue(value);
    }
  };

  const handleKeyDown = (key: string) => {
    if (key === "Backspace") {
      setSelectedValues((val) => val.slice(0, val.length - 1));
    }
  };

  React.useEffect(() => {
    if (selectedValues?.length > 0) {
      try {
        let expression = "";
        let isLastValueOperator = true;
        selectedValues.forEach((value) => {
         if (!isLastValueOperator && !value?.isOperator) {
            throw new Error("Invalid Syntax");
          }
          if (value?.isOperator) {
            isLastValueOperator = true;
            expression += value?.name;
          } else {
            isLastValueOperator = false;
            expression += value?.mathValue;
          }
        });

        const evaluation = evaluate(expression);
        changeField(id, "value", evaluation);
        changeField(id, "isError", false);
      } catch (err) {
        changeField(id, "isError", true);
      }
    } else {
      changeField(id, "value", "");
      changeField(id, "isError", false);
    }
  }, [selectedValues]);

  return (
    <div>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Tags Mode"
        options={options}
        labelInValue
        allowClear
        popupMatchSelectWidth={false}
        tagRender={(props) => {
          return (
            <CalcInput_Tag
              name={props.label as string}
              isOperator={ALLOWED_OPERATORS.includes(props.label as string)}
            ></CalcInput_Tag>
          );
        }}
        searchValue={searchValue}
        value={selectedValues as any}
        onKeyDown={(e) => {
          handleKeyDown(e?.key);
        }}
        onSearch={(value) => {
          handleSearch(value);
        }}
        onSelect={(data, options) => {
          selectValue(options);
        }}
        autoClearSearchValue={true}
        open={isDropDownOpen}
        size="large"
      />
    </div>
  );
};

export default CalcInput_Input;
