import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '₹';

    
    const [searchTerm, setSearchTerm] = useState("");

    const value = {
        doctors,
        currencySymbol,
        searchTerm,      
        setSearchTerm   
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
