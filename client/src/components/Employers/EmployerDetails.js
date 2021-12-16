import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployersContext from "../../store/employers-context";
import JobsContext from "../../store/jobs-context";
import JobListings from "../JobListings/JobListings";
import SquareImage from '../UI/SquareImage';

const EmployerDetails = props => {
    const [employer, setEmployer] = useState(null);
    const [jobs, setJobs] = useState([]);

    const employers_context = useContext(EmployersContext);
    const jobs_context = useContext(JobsContext);

    const params = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        let id = params.id;
        if(employers_context.employers.filter(e => e.id === parseInt(id))[0]==null){
            navigate('/404');
        }
        setEmployer(employers_context.employers.filter(e => e.id === parseInt(id))[0]);
        setJobs(jobs_context.allJobs.filter(x => x.employerId == parseInt(id)));
    }, [employers_context,jobs_context])

    useEffect(()=>{
        let id = params.id;
        setJobs(jobs_context.allJobs.filter(x => x.employerId == parseInt(id)));
    },[jobs_context.allJobs])

    if (employer == null) {
        return (<div>Loading..</div>)
    }

    return (
        <div className="mt-4 card m-3 p-2 rounded-0 shadow-sm">
            <div className="card-body">
                <div className="d-flex">
                    <div className="float-right me-3">
                        <SquareImage width='200px' src={employer.imageUrl ?
                            'https://localhost:44318/uploads/' + employer.imageUrl :
                            'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg}'} />
                    </div>
                    <div>
                        <h1>{employer.name}</h1>
                        {employer.PIB && <p className="p-0 m-0">
                            PIB: <b>{employer.PIB}</b>
                        </p>}
                        {employer.address && <p className="p-0 m-0">
                            Address: <b>{employer.address}</b>
                        </p>}
                        {employer.phone && <p className="p-0 m-0">
                            Phone number: <b>{employer.phone} </b>
                        </p>}
                        {employer.email && <p className="p-0 m-0">
                            Email: <b>{employer.email}</b>
                        </p>}
                        {employer.website && <p className="p-0 m-0">
                            Website: <b><span className="link-primary" style={{ cursor: 'pointer' }} onClick={() => window.location.href = employer.website}>{employer.website}</span></b>
                        </p>}
                    </div>
                </div>
                {employer.description && <p className="border-top mt-3">{employer.description}</p>}
            </div>
            <JobListings data={jobs} />
        </div>
    )
}

export default EmployerDetails;