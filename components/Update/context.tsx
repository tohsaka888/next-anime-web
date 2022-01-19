import { createContext } from "react";
import { ContextProps } from "./type";

const Context = createContext<ContextProps | null>(null);

export { Context };
