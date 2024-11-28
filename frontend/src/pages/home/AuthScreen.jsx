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
      <div className="h-2 w-full bg-[#2b2b2b]" aria-hidden="true" />

      {/* Enjoy TV */}
      <div className="py-10 text-white bg-black">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-center items-center">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, ChromeCast, Apple TV,
              Blue-ray players, and more.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="TV image" className="mt-4 z-10 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[52%] z-0"
              playsInline="true"
              autoPlay="true"
              muted="true"
              loop="true"
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#2b2b2b]" aria-hidden="true" />

      {/* Download */}
      <div className="py-10 text-white bg-black">
        <div className="mx-auto max-w-6xl px-4 flex flex-col-reverse md:flex-row justify-center items-center">
          {/* Left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things Image"
                className="mt-4"
              />
              <div className="absolute flex items-center gap-2 bottom-5 left-1/2 -translate-x-1/2 bg-black w-[65%] lg:w-[55%] h-16 lg:h-24 border border-gray-500 rounded-md px-2 md:px-4">
                <img
                  src="stranger-things-sm.png"
                  alt="ST Poster"
                  className="h-full"
                />
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm lg:text-lg">Stranger Things</span>
                    <span className="text-xs lg:text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <div>
                    <img
                      src="/download-icon.gif"
                      alt="download gif"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorite easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#2b2b2b]" aria-hidden="true" />

      {/* Watch everywhere */}
      <div className="py-10 text-white bg-black">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-center items-center">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet, laptop
              and TV.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative">
            <img
              src="/device-pile.png"
              alt="Device image"
              className="mt-4 z-10 relative"
            />
            <video
              className="absolute top-[5%] left-1/2 -translate-x-1/2 h-[65%] max-w-[63%] z-0"
              playsInline="true"
              autoPlay="true"
              muted="true"
              loop="true"
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#2b2b2b]" aria-hidden="true" />

      {/* Create profile */}
      <div className="py-10 text-white bg-black">
        <div className="mx-auto max-w-6xl px-4 flex flex-col-reverse md:flex-row justify-center items-center">
          {/* Left side */}
          <div className="flex-1">
            <img src="/kids.png" alt="Device image" className="mt-4" />
          </div>
          {/* Right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profile for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them - free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
