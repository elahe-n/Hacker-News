import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?"; // https://hn.algolia.com/api/v1/search?query=react //

const AppContext = React.createContext();

const initialState = {
  stories: [],
  loading: true,
  searchTerm: "REACT",
  page: 0,
  nbPages: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.searchTerm}&page=${state.page}`);
  }, [state.searchTerm, state.page]);

  const searchHandler = (param) => {
    dispatch({ type: HANDLE_SEARCH, payload: param });
  };

  const removeHandler = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const pageHandler = (param) => {
    dispatch({ type: HANDLE_PAGE, payload: param });
  };

  return (
    <AppContext.Provider
      value={{
        removeHandler,
        pageHandler,
        searchHandler,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
