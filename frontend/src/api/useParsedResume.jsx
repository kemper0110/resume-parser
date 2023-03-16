import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiContext";

const useParsedResume = (link) => {
    const api = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [resume, setResume] = useState({
        "id": null,
        "link": null,
        "fullname": "",
        "phone": "",
        "email": "",
        "education": "",
        "experience": "",
    })
    useEffect(() => {
        api.get(`/parser?link=${link}`).then(response => {
            setResume(resume => ({ ...resume, ...response.data }));
            setIsLoading(false);
        }).catch(e => {
            console.log(e);
            setIsLoading(false);
        })
    }, [link, setResume, setIsLoading, api])
    return {resume, isLoading}
}

export default useParsedResume;