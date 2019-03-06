import { ADD_ARTICLE, SELECT_MENU, TOGGLE_UI, PLAY_GAME } from "../constants/action-types";

const initialState = {
  articles: [],
  buttonProps:{
    selected: false,
    selectedId: null,
    backgroundColor: '#fff'
  },
  showUi: false,
  playGame: false
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
      const newArticles = [...state.articles, action.payload ];
      return ({...state, articles: newArticles
      });
    }
  if (action.type === SELECT_MENU) {
      const newProps = {selected:true, selectedId: action.payload, backgroundColor:'green'}
      return ({...state, buttonProps:newProps
      });
    }
  return state;
};

export default rootReducer;
