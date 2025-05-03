import { useState } from "react";

export default function Intro() {
  const [username, setUsername] = useState("");

  const isDisabled = username.trim() === "";

  return (
    <div className="h-screen grid place-items-center bg-LeadBackground">
      <div className="w-[31.25rem] rounded-2xl border border-LeadGray p-6">
        <h4 className="text-black font-bold text-[1.38rem]">Welcome to CodeLeap network</h4>
        <h5 className="mt-6">Please enter your username</h5>
        <input
          className="w-full h-8 mt-2 rounded-lg border border-LeadInput px-4"
          placeholder="John Doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex justify-end items-center">
          <button
            className="bg-LeadButton text-white rounded-lg w-[112px] h-8 mt-4 font-bold cursor-pointer disabled:cursor-not-allowed"
            disabled={isDisabled}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
