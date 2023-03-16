import {Link, useNavigate} from "react-router-dom";
import {ResumeEditUrl, ResumeLinkUrl} from "./urls";
import useResumes from "../api/useResumes";
import Spinner from "../components/Spinner";


const Resumes = () => {
    const navigate = useNavigate();
    const {resumes, isLoading} = useResumes();

    return (
        <>
            <Link role="button" className="btn btn-primary m-2 float-end" to={ResumeLinkUrl}>Добавить
                кандидата</Link>
            <table className="table table-bordered border-1 m-1">
                <thead>
                <tr>
                    <td>ФИО</td>
                    <td>Телефон</td>
                    <td>Почта</td>
                </tr>
                </thead>
                <tbody>
                {
                    isLoading ?
                        (
                            <tr>
                                <td colSpan="3">
                                    <Spinner/>
                                </td>
                            </tr>
                        ) :
                        resumes.map(resume => (
                            <tr key={resume.id} onClick={() => navigate(ResumeEditUrl + `/${resume.id}`)}>
                                <td>{resume.fullname}</td>
                                <td>{resume.phone}</td>
                                <td>{resume.email}</td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </>
    )
}

export default Resumes;