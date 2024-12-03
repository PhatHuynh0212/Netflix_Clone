import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_URL } from "../utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = ({ category }) => {
  const [content, setContent] = useState([]);
  const { contentType } = useContentStore();
  const [showArrow, setShowArrow] = useState(false);

  const sliderRef = useRef(null);

  const formatCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formatContentType = contentType === "movie" ? "Movie" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);

  console.log("content ", content);

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

  return (
    <div
      className="relative bg-black text-white px-5 md:px-20"
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formatCategoryName} - {formatContentType}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content?.map((item) => (
          <Link
            key={item.id}
            to={`/watch/${item.id}`}
            className="relative group min-w-[250px]"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_URL + item.backdrop_path}
                alt="Movie image category"
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>
      {showArrow && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-6 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 text-white hover:text-gray-300 z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft className="size-18 md:size-20" />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-6 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 text-white hover:text-gray-300 z-10"
            onClick={scrollRight}
          >
            <ChevronRight className="size-18 md:size-20" />
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
