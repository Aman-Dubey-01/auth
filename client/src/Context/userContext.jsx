import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/user')
                .then(({ data }) => {
                    setUser(data)
                })
            console.log("user:", user);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}