import { createContext } from "react";

export const AuthContext = createContext<null|{data:any,loading:boolean,error:any}>(null)
