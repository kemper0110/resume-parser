import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiContext";

const useResume = (resume_id) => {
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
        api.get(`/resumes/${resume_id}`).then(response => {
            setResume(response.data);
            setIsLoading(false);
        }).catch(e => {
            console.log(e);
            setIsLoading(false);
        })
    }, [resume_id, setResume, setIsLoading, api])
    return {resume, isLoading}
}

export default useResume;