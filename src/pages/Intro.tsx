import { useState } from "react";
import { useNavigate } from "react-router"; 

export default function Intro() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); 

  const isDisabled = username.trim() === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isDisabled) return;

    localStorage.setItem("username", username.trim());

    navigate("/dashboard");
  };

  return (
    <div className="h-screen grid place-items-center bg-LeadBackground">
      <form onSubmit={handleSubmit} className="w-[31.25rem] rounded-2xl border border-LeadGray bg-white p-6">
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
            type="submit"
            className="bg-LeadButton text-white rounded-lg w-[112px] h-8 mt-4 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDisabled}
          >
            ENTER
          </button>
        </div>
      </form>
    </div>
  );
}