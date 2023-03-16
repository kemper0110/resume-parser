import {createContext, useContext, useEffect, useRef} from "react";
import axios from "axios";
import {useAlert} from 'react-alert';

const ApiContext = createContext(null);

export const ApiContextProvider = ({children}) => {
    const alert = useAlert();
    const apiRef = useRef(axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    }));
    useEffect(() => {
        apiRef.current.interceptors.response.use(response => {
            if (response.status !== 200)
                alert.error("Ошибка запроса: " + JSON.stringify(response.data));
            return response;
        }, error => {
            alert.error("Ошибка запроса: " + JSON.stringify(error));
            return Promise.reject(error)
        });
    }, [alert]);

    return (
        <ApiContext.Provider value={apiRef.current}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => {
    return useContext(ApiContext);
}