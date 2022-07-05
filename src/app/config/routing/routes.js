import { paths } from "./paths";

import views from "../../views";

export const DEFAULT = {
  component: views.Home,
  path: paths.DEFAULT_ROUTE,
};

export const DEFAULT_MAIN = {
  component: views.Home,
  path: paths.DEFAULT_ROUTE_MAIN,
};

export const HOME = {
  component: views.Home,
  path: paths.VIEW_HOME_ROUTE,
};

export const CONTENT = {
  component: views.ViewContent,
  path: paths.VIEW_CONTENT_ROUTE,
};

export const ADD_FAQ = {
  component: views.AddFAQContent,
  path: paths.ADD_FAQ,
};

export const ADD_HELP = {
  component: views.AddHelpContent,
  path: paths.ADD_HELP,
};

export default [DEFAULT, DEFAULT_MAIN, HOME, CONTENT, ADD_FAQ, ADD_HELP];
