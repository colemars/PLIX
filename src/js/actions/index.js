import { ADD_ARTICLE } from "../constants/action-types";
import { SELECT_MENU } from "../constants/action-types";
import { TOGGLE_UI } from "../constants/action-types";
import { PLAY_GAME } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

export function selectMenu(payload) {
  return { type: SELECT_MENU, payload }
};
