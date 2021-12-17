import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployersContext from "../../store/employers-context";
import JobsContext from "../../store/jobs-context";
import JobListings from "../JobListings/JobListings";
import SquareImage from '../UI/SquareImage';
import loading from '../../assets/loading.gif';

const EmployerDetails = props => {
    const [employer, setEmployer] = useState(null);
    const [jobs, setJobs] = useState([]);

    const employers_context = useContext(EmployersContext);
    const jobs_context = useContext(JobsContext);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let id = params.id;
        if (employers_context.employers.filter(e => e.id === parseInt(id))[0] == null) {
            navigate('/404');
        }
        setEmployer(employers_context.employers.filter(e => e.id === parseInt(id))[0]);
        setJobs(jobs_context.allJobs.filter(x => x.employerId == parseInt(id)));
    }, [employers_context, jobs_context])

    useEffect(() => {
        let id = params.id;
        setJobs(jobs_context.allJobs.filter(x => x.employerId == parseInt(id)));
    }, [jobs_context.allJobs])

    if (!employer) {
        return (<div className="d-flex m-5">
            <img style={{ margin: '0 auto', width: '100px' }} src={loading} alt='Loading' />
        </div>)
    }

    return (
        <div className="my-4">
            <div className="row p-0 border rounded-0 shadow-sm" >
                <div className="col-sm-auto col-12 py-3 py-sm-0 d-flex justify-content-center p-0 float-right me-3 h-auto" >
                    <SquareImage width='200px' src={employer.imageUrl ?
                        'https://localhost:44318/uploads/' + employer.imageUrl :
                        'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg}'} />
                </div>
                <div className="col text-center p-2 p-sm-0 text-sm-start">
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
            {employer.description &&
                <div className="row border rounded-0 shadow-sm my-2 p-2">
                    <p>{employer.description}</p>
                </div>}
            <div>
                <JobListings data={jobs} />
            </div>
        </div>
    )
}

export default EmployerDetails;