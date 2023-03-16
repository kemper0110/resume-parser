import {useId, useState} from "react";
import {ResumeCreateUrl} from "./urls";
import {Link} from "react-router-dom";

const ResumeLink = () => {
    const linkId = useId();
    const [link, setLink] = useState("");
    return (
        <>
            <h1 className="text-lg-center m-3">Добавить кандидата</h1>
            <div className="mb-3">
                <label htmlFor={linkId} className="form-label">Вставьте ссылку с hh.ru</label>
                <input type="email" className="form-control" id={linkId} placeholder="https://rostov.hh.ru/resume/*"
                       value={link} onChange={evt => setLink(evt.target.value)}
                />
            </div>
            <div className="col text-center">
                <Link role="button" className="btn btn-primary w-50" to={{ pathname: ResumeCreateUrl, search: `link=${link}`}}>
                    Загрузить
                </Link>
            </div>
        </>
    )
}

export default ResumeLink