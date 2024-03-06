"use client";
import CalcInput from "./components/calcInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <CalcInput
        sections={["Employees Count", "Customer Count", "Students Count"]}
      ></CalcInput>
    </main>
  );
}
