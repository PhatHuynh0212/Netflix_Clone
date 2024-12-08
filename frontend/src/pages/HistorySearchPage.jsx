import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_URL } from "../utils/constant.js";
import { formatDate } from "../utils/function.js";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const HistorySearchPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.content);
      } catch (error) {
        console.log(error.message);
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  const handleDeleteSearch = async (item) => {
    try {
      await axios.delete(`/api/v1/search/history/${item.id}`);
      setSearchHistory(
        searchHistory.filter((newListItem) => newListItem.id !== item.id)
      );
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete search item!");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Search History</h2>
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl">No search history found!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Search History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {searchHistory?.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-700 rounded flex items-center"
            >
              <img
                src={SMALL_IMG_URL + item.image}
                alt={item.title + "image"}
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">
                  {item.title.length > 22
                    ? item.title.slice(0, 16) + "..."
                    : item.title}
                </span>
                <span className="text-gray-400">
                  {formatDate(item.createAt)}
                </span>
              </div>
              <div className="ml-auto flex flex-col items-center gap-4">
                <span
                  className={`py-1 px-2 min-w-20 text-center rounded-full text-sm ml-auto ${
                    item.searchType === "movie"
                      ? "bg-red-600"
                      : item.searchType === "tv"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
                </span>
                <Trash
                  className="size-6 cursor-pointer hover:fill-red-600 hover:text-red-600 transition-all duration-200"
                  onClick={() => handleDeleteSearch(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySearchPage;
