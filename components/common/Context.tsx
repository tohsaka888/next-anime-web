import { createContext } from "react";

type MenuShowProps = {
  menuShow: boolean;
  setMenuShow: Function;
};

const MenuShowContext = createContext<MenuShowProps | null>(null);

export { MenuShowContext };
