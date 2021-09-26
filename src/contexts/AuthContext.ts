import { createContext, ReactNode, useEffect, useState } from "react"

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
}

export const AuthContext = createContext({} as AuthContextType)
