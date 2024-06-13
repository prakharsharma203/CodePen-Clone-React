export const SET_USER = (user)=>{
  return{
    type : "SET_USER",
    user : user

  }
};

export const SET_USER_NULL = () =>{
  return{
    type : "SET_USER_NULL",
    user:null
  }
}

export const SET_PROJECTS = (projects)=>{
  return{
    type : "SET_PROJECTS",
    projects : projects

  }
};

export const SET_PROJECTS_NULL = () =>{
  return{
    type : "SET_PROJECTS_NULL",
  }
}

export const SET_SEARCH_TERM = (searchTerm)=>{
  return{
    type : "SET_SEARCH_TERM",
    searchTerm : searchTerm

  }
};

export const SET_SEARCH_TERM_EMPTY = () =>{
  return{
    type : "SET_SEARCH_TERM_EMPTY",
  }
}

export const deleteProject = (projectId) => {
  return {
    type: "DELETE_PROJECT",
    payload: projectId,
  };
};

