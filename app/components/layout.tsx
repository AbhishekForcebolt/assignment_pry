"use client";

import * as React from "react";

import Layout_Sidebar from "./sidebar";
import { useTagstore } from "../store/zustand";
import { GET_TAGS_URL } from "../requests";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

interface ILayout_MainProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function App({ children }: ILayout_MainProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout_Main>{children} </Layout_Main>
    </QueryClientProvider>
  );
}

const Layout_Main: React.FunctionComponent<ILayout_MainProps> = ({
  children,
}) => {
  const {  addTags } = useTagstore();

  const { isPending, error } = useQuery({
    queryKey: ["tagsData"],
    queryFn: () =>
      fetch(GET_TAGS_URL).then(async (res) => {
        let allTags = await res.json();
        addTags(allTags);
        return allTags;
      }),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex min-h-screen flex-col border items-center justify-between bg-gradient-to-b  from-slate-200 via-gray-100 to-zinc-50 bg-white text-black">
      <div className="z-10 w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="border w-full ">
          <div className="grid grid-cols-9 gap-4">
            <div className="col-span-2 border border-gray-300">
              <Layout_Sidebar></Layout_Sidebar>
            </div>
            <div className="col-span-7 border border-gray-300">
              <div className="h-20 flex items-center p-5 border-gray-300">
                <p className="text-xl text-bold">Formulas</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
