import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="logo-netflix"
          className="w-32 md:w-48"
        />
        <Link to={"/login"} className="text-white bg-red-500 px-3 py-1 rounded">
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <div className="mx-auto py-40 px-4 flex flex-col items-center justify-center text-white text-center max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-5">Start at 70,000đ.Cancel anytime.</p>
        <p className="mb-5">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {/* Form email */}
        <form className="flex flex-col md:flex-row gap-4 w-[55%]">
          <input
            type="email"
            id="email"
            className="flex-1 py-2 px-4 rounded bg-black/70 border border-gray-700"
            placeholder="Email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="flex items-center justify-center w-fit self-center lg:gap-2 bg-red-500 text-lg lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded">
            Get Started
            <ChevronRight className="size-7 lg:size-9" />
          </button>
        </form>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
    </div>
  );
};

export default AuthScreen;
