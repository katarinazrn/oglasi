import { Link } from "react-router-dom";
import RoundImage from "../UI/RoundImage";
import EmployersContext from "../../store/employers-context";
import { useContext } from "react";
import SearchEmployers from "../Search/SearchEmployers";

const EmployersList = props => {

    const employers_context=useContext(EmployersContext);
    
    return (
        <div>
            <SearchEmployers />
            {employers_context.employers.map(e =>
                <div key={e.id} className="card m-3 p-0 rounded-0 shadow-sm">
                    <div className="card-body p-1 ps-3 d-flex">
                        <Link to={'/employers/'+e.id} style={{ margin: 'auto 0' }}>
                            <RoundImage width='100px' src={e.imageUrl ? 'https://localhost:44318/Uploads/'+e.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'} />
                        </Link>
                        <div className="m-3">
                            <h3 className="me-2">
                                <Link to={'/employers/'+e.id} className="text-dark" style={{textDecoration:'none'}}>{e.name}</Link>
                            </h3>
                            <span className="me-2">
                                {e.address}
                            </span>
                            <span className="me-2">
                                {e.fieldOfWork}
                            </span>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default EmployersList;