const initialState = {
    spot: [],
    favoriteMusic: [],
  }
  
  const appReducer = (state = initialState, action : any) => {
    switch (action.type) {
      case ADD_FAVORITE_MUSICS:
        return {...state, favoriteMusic: state.favoriteMusic.push(action.payload)};
      case REMOVE_FAVORITE_MUSICS:
        return {...state, favoriteMusic: state.favoriteMusic};
      case FETCH_SPOT:
        return {...state, spot: action.payload};
      case FETCH_DISCOVERIES:
      
   
      default:
        return state; 
    }
  }

  export default appReducer