import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_URL, SMALL_IMG_URL } from "../utils/constant.js";
import { formatDate } from "../utils/function.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No trailers found!");
          setTrailers([]);
        }
      }
    };

    getTrailer();
  }, [id, contentType]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No similar content found!");
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [id, contentType]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No content details found!");
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [id, contentType]);

  const handlePrevious = () => {
    if (currentTrailer > 0) setCurrentTrailer(currentTrailer - 1);
  };
  const handleNext = () => {
    if (currentTrailer < trailers.length - 1)
      setCurrentTrailer(currentTrailer + 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="relative h-screen text-white bg-black">
        <div className="max-w-6xl mx-auto">
          <Navbar />

          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              No content founded!{" "}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto px-4 py-4 h-full container">
        <Navbar />

        {/* Change trailer buttons */}
        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mt-4 mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${
                currentTrailer === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailer === 0}
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${
                currentTrailer === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailer === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Play Screen */}
        <div className="aspect-video p-2 sm:px-10 md:px-32">
          {trailers?.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailer]?.key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-2xl text-center mt-10">
              No trailers available for{" "}
              <span className="font-bold text-red-500">
                {content?.title || content?.name}
              </span>
            </h2>
          )}
        </div>

        {/* Content Details */}
        <div className="max-w-6xl mt-4 mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="mb-4 md:mb-2">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-4 text-lg">
              {formatDate(content?.release_date || content?.first_air_date)} |{" "}
              {content?.adult ? (
                <span className="text-red-500 text-lg">18+</span>
              ) : (
                <span className="text-green-500 text-lg">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg text-justify">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[500px] md:max-h-[600px] rounded-lg"
          />
        </div>

        {/* Similar Movie/Tv shows */}
        {similarContent.length > 0 && (
          <div className="relative mt-12 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h2>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent?.map((content) => {
                if (content?.poster_path === null) return null;
                return (
                  <Link
                    key={content?.id}
                    to={`/watch/${content?.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_URL + content?.poster_path}
                      alt="Movie image"
                      className="w-full h-auto rounded-md"
                    />
                    <h3 className="mt-2 text-lg font-semibold text-center">
                      {content?.title || content?.name}
                    </h3>
                  </Link>
                );
              })}

              <ChevronLeft
                className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-[85px] lg:-left-24 md:size-20 lg:size-24 text-white hover:text-red-600 transition-all duration-300 rounded-full cursor-pointer"
                onClick={scrollLeft}
              />
              <ChevronRight
                className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-[85px] lg:-right-24 md:size-20 lg:size-24 text-white hover:text-red-600 transition-all duration-300 rounded-full cursor-pointer"
                onClick={scrollRight}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
