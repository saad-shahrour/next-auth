"use client"
import { FunctionComponent, ReactNode } from "react";
import {SessionProvider} from "next-auth/react"

interface AuthProviderProps {
    children: ReactNode
}
 
const AuthProvider: FunctionComponent<AuthProviderProps> = ({children}) => {
    return ( 
        <SessionProvider>
            {children}
        </SessionProvider>
     );
}
 
export default AuthProvider;