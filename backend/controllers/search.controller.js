import { User } from "../models/user.model.js";
import { fetchTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const user = await User.findById(req.user._id);

    // Fix bug duplicate history search item
    const isAlreadyInHistory = user.searchHistory.some(
      (item) =>
        item.id === response.results[0].id && item.searchType === "person"
    );

    if (!isAlreadyInHistory) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            title: response.results[0].name,
            image: response.results[0].profile_path,
            searchType: "person",
            createAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const user = await User.findById(req.user._id);

    const isAlreadyInHistory = user.searchHistory.some(
      (item) =>
        item.id === response.results[0].id && item.searchType === "movie"
    );

    if (!isAlreadyInHistory) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            title: response.results[0].title,
            image: response.results[0].poster_path,
            searchType: "movie",
            createAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const user = await User.findById(req.user._id);

    const isAlreadyInHistory = user.searchHistory.some(
      (item) => item.id === response.results[0].id && item.searchType === "tv"
    );

    if (!isAlreadyInHistory) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            title: response.results[0].name,
            image: response.results[0].poster_path,
            searchType: "tv",
            createAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchTV controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in getSearchHistory controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller: ",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}
