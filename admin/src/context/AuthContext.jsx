import {createContext, useEffect, useState} from "react";

export const AdminAuthContext = createContext()

export const AdminAuthContextProvider = ({children}) => {
    const [currentAdmin, setCurrentAdmin] = useState(
        JSON.parse(localStorage.getItem("admin")) || null
    );

    const updateAdmin = (data) => {
        setCurrentAdmin(data)
    }

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin));
    }, [currentAdmin])

    return (
        <AdminAuthContext.Provider value={{currentAdmin, updateAdmin}}>{children}</AdminAuthContext.Provider>
    )
}