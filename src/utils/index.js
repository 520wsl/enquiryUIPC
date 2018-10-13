import pub from "./public";
import time from "./time";
import cookie from "./cookie";
import storeage from "./storeage";
import session from "./session";

export default {
  ...pub,
  ...time,
  cookie,
  session,
  storeage
};
