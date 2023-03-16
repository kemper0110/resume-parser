import {BrowserRouter, Route, Routes} from "react-router-dom";
import Resumes from "./pages/Resumes";
import ResumeForm from "./components/ResumeForm";
import {ResumeCardUrl, ResumeCreateUrl, ResumeEditUrl, ResumeLinkUrl, ResumesUrl} from "./pages/urls";
import ResumeLink from "./pages/ResumeLink";
import ResumeCreate from "./pages/ResumeCreate";
import ResumeEdit from "./pages/ResumeEdit";
import {ApiContextProvider} from "./contexts/ApiContext";
import AlertTemplate from 'react-alert-template-basic';
import {Provider as AlertProvider} from 'react-alert';


const options = {
    position: 'bottom right',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}
function App() {
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <ApiContextProvider>
                <div className="m-auto" style={{maxWidth: 700}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={ResumesUrl} element={<Resumes/>}/>
                            <Route path={ResumeCardUrl} element={<ResumeForm/>}/>
                            <Route path={ResumeLinkUrl} element={<ResumeLink/>}/>
                            <Route path={ResumeCreateUrl} element={<ResumeCreate/>}/>
                            <Route path={ResumeEditUrl + "/:resume_id"} element={<ResumeEdit/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </ApiContextProvider>
        </AlertProvider>
    );
}

export default App;
