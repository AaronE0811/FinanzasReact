"use client";
import { useState } from "react";
import Main from "./components/main";
import Login from "./login/page";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div
      className={`min-h-screen w-full ${darkMode ? "bg-[#121212] text-[#F9FAFB]" : "bg-[#F9FAFB] text-[#121212]"} flex flex-col items-center `}
    >
      <Login />
    </div>
  );
}
