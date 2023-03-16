import React, {useEffect, useState} from 'react';
import ResumeForm from "../components/ResumeForm";
import {useParams} from "react-router";
import useResume from "../api/useResume";
import Spinner from "../components/Spinner";
import {Link, useNavigate} from "react-router-dom";
import {ResumesUrl} from "./urls";
import {useApi} from "../contexts/ApiContext";
import {useAlert} from "react-alert";

const useMutableResume = (resume_id) => {
    const {resume, isLoading} = useResume(resume_id);
    const [state, setState] = useState(resume);
    useEffect(() => setState(resume), [resume]);
    return {
        resume: state, setResume: setState, isLoading
    }
}

const ResumeEdit = () => {
    const alert = useAlert();
    const api = useApi();
    const navigate = useNavigate();
    const {resume_id} = useParams();
    const {resume, setResume, isLoading} = useMutableResume(resume_id)
    const onSave = () => {
        api.put("/resumes", resume).then(response => {
            if(response.status === 200)
                alert.success("Резюме успешно сохранено")
            else
                alert.error("Ошибка сохранения резюме")
        })
    }
    const onDelete = () => {
        api.delete(`/resumes/${resume_id}`).then(response => {
            if(response.status === 200)
                alert.success("Резюме успешно удалено")
            else
                alert.error("Ошибка удаления резюме")
            navigate(ResumesUrl);
        })
    }
    return (
        <div>
            <div className="m-1 text-end">
                <button className="btn btn-primary m-1" onClick={onSave}>Изменить</button>
                <button className="btn btn-danger m-1" onClick={onDelete}>Удалить</button>
                <Link to={resume.link} target='_blank' role='button' className="btn btn-info m-1" >hh.ru</Link>
            </div>
            {
                isLoading ? <Spinner/> : <ResumeForm form={resume} setForm={setResume}/>
            }
        </div>
    );
};

export default ResumeEdit;