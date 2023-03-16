import React, {useEffect, useState} from 'react';
import ResumeForm from "../components/ResumeForm";
import {useNavigate, useSearchParams} from "react-router-dom";
import useParsedResume from "../api/useParsedResume";
import Spinner from "../components/Spinner";
import {useApi} from "../contexts/ApiContext";
import {useAlert} from "react-alert";
import {ResumesUrl} from "./urls";


const useMutableResume = (link) => {
    const {resume, isLoading} = useParsedResume(link);
    const [state, setState] = useState(resume);
    useEffect(() => setState(resume), [resume]);
    return {
        resume: state, setResume: setState, isLoading
    }
}
const ResumeCreate = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const api = useApi();
    const [params] = useSearchParams();
    const link = params.get('link');
    const {resume, setResume, isLoading} = useMutableResume(link);

    const onSave = () => {
        console.log(resume);
        api.post("/resumes", resume).then(response => {
            if(response.status === 200) {
                alert.success("Резюме успешно добавлено");
                navigate(ResumesUrl);
            }
            else
                alert.error("Ошибка добавления резюме");
        })
    };

    if(isLoading)
        return <Spinner/>;
    return (
        <>
            <ResumeForm form={resume} setForm={setResume}/>
            <div className="text-center">
                <button className="btn btn-primary w-50" onClick={onSave}>
                    Сохранить
                </button>
            </div>
        </>
    );
};

export default ResumeCreate;