import { createContext, useState } from 'react';

const MyContext = createContext();

function ContextProvider({ children }) {
    const [isTyping, setIsTyping] = useState(false);

    return (
        <MyContext.Provider value={{ isTyping, setIsTyping }}>
            {children}
        </MyContext.Provider>
    );
}

export { MyContext };
export default ContextProvider;
