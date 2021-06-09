import { combineReducers } from "redux";
import user from "./user";
import util from "./util";
import profile from './profile';
import chat from './chat';
import post from './post';

export default combineReducers({
  user,
  util,
  profile,
  chat,
  post
});
