import { useEffect, useState } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";

const useGetTrendingContent = () => {
  const { contentType } = useContentStore();
  const [trendingContent, setTrendingContent] = useState(null);

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        let validContent = null;

        while (!validContent) {
          const res = await axios.get(`/api/v1/${contentType}/trending`);
          if (res.data.content?.backdrop_path) {
            validContent = res.data.content;
          }
        }

        setTrendingContent(validContent);
      } catch (error) {
        console.log("Error fetching trending content:", error.message);
      }
    };

    getTrendingContent();
  }, [contentType]);
  return { trendingContent };
};

export default useGetTrendingContent;
