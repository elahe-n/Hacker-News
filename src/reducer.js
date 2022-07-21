import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_STORIES:
      return {
        ...state,
        stories: action.payload.hits,
        nbPages: action.payload.nbPages,
        loading: false,
      };

    case HANDLE_SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
        page: 0,
      };

    case REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter(
          (item) => item.objectID !== action.payload
        ),
      };

    case HANDLE_PAGE:
      if (action.payload === "next") {
        let nextPage = state.page + 1;
        if (state.page === state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      } else {
        let prevPage = state.page - 1;
        if (state.page === 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
export default reducer;
