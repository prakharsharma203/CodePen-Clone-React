const UserAuthReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_NULL":
      return {
        ...state,
        user: null,
      };
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.projects,
      };
    case "SET_PROJECTS_NULL":
      return {
        ...state,
        projects: null,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    case "SET_SEARCH_TERM_EMPTY ":
      return {
        ...state,
        searchTerm: "",
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default UserAuthReducer;
