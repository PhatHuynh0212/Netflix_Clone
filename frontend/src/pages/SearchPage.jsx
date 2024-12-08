import { useState } from "react";
import { useContentStore } from "../store/content.js";
import Navbar from "../components/Navbar.jsx";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_URL } from "../utils/constant.js";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchIndex, setSearchIndex] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchIndex}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching in the right category"
        );
      } else {
        toast.error("An error, please try again later.");
      }
    }
  };

  console.log("result", results);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search category */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-700"
            } hover:bg-red-700 transition-all duration-200`}
            onClick={() => handleTabClick("movie")}
          >
            Movie
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-700"
            } hover:bg-red-700 transition-all duration-200`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-700"
            } hover:bg-red-700 transition-all duration-200`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        {/* Search input */}
        <form
          className="mx-auto mb-8 max-w-2xl flex gap-4 items-stretch"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchIndex}
            onChange={(e) => setSearchIndex(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="flex gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search size={22} /> Search
          </button>
        </form>

        {/* Search result */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results?.map((result) => {
            if (!result.profile_path && !result.poster_path) return null;
            return (
              <div key={result.id} className="p-4 bg-gray-800 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_URL + result.profile_path}
                      alt={result.name}
                      className="mx-auto max-h-96 rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={`/watch/${result.id}`}
                    onClick={() => setContentType(activeTab)}
                  >
                    <img
                      src={ORIGINAL_IMG_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold text-center text-balance">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
