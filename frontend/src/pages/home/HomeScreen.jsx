import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.js";
import { ORIGINAL_IMG_URL } from "../../utils/constant.js";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  console.log("trendingContent: ", trendingContent);

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />

        <img
          src={ORIGINAL_IMG_URL + trendingContent?.backdrop_path}
          alt="Image screen"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/60 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black/80 via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.original_title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "13+"}
            </p>
            <p className="mt-4 text-lg text-justify">
              {trendingContent?.overview.length > 220
                ? trendingContent?.overview.slice(0, 220) + "..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className="mt-8 flex">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="mr-4 py-2 px-4 bg-white hover:bg-white/80 text-black font-bold rounded flex items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>

            <Link
              to={`/watch/${trendingContent?.id}`}
              className="py-2 px-4 bg-gray-500/70 hover:bg-gray-500 text-white rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
