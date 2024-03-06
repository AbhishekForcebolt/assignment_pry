import * as React from "react";

import InputsCard from "./cards/inputsCard";
import { useTagstore } from "../store/zustand";

interface ILayout_SidebarProps {}

const Layout_Sidebar: React.FunctionComponent<ILayout_SidebarProps> = () => {
  const { tags } = useTagstore();

  return (
    <div className=" ">
      <div className="h-20 flex items-center p-5 border border-gray-300">
        <p className="text-xl text-bold">Inputs</p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 max-h-[100vh] overflow-y-auto">
        {tags?.map((tag) => {
          return <InputsCard name={tag?.name} value={tag?.value} key={tag?.id}></InputsCard>;
        })}
      </div>
    </div>
  );
};

export default Layout_Sidebar;
