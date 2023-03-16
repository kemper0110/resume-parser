import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiContext";

const useResumes = () => {
    const api = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [resumes, setResumes] = useState([])
    useEffect(() => {
        api.get("/resumes").then(response => {
            setResumes(response.data);
            setIsLoading(false);
        }).catch(e => {
            console.log(e);
            setIsLoading(false);
        })
    }, [setResumes, api])
    return {resumes, isLoading}
}

export default useResumes;