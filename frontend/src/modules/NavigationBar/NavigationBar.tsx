import { useState } from "react";
import "./NavigationBar.css";

import ToggleAsideButton from "./ToggleAsideButton";

const NavigationBar = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <ToggleAsideButton isOpened={isOpened} setIsOpened={setIsOpened} />
      <div
        className={` bg-black/30 pointer-events-none w-[100vw] h-[100vh] fixed z-50 transition-all animate-duration-800 ${
          isOpened ? " opacity-100" : "opacity-0"
        }`}
      ></div>
      <nav
        className={` w-64 h-[100vh] bg-[var(--md-sys-color-inverse-primary-transparent)] fixed z-[100] transition-all ${
          isOpened ? " left-0" : " -left-64"
        }
         flex flex-col font-bold items-center gap-20 py-64`}
      >
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/about">About</a>
      </nav>
    </div>
  );
};

export default NavigationBar;
