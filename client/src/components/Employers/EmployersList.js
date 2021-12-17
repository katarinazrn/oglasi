import { Link } from "react-router-dom";
import SquareImage from "../UI/SquareImage";
import EmployersContext from "../../store/employers-context";
import { useContext } from "react";
import SearchEmployers from "../Search/SearchEmployers";

const EmployersList = props => {

    const employers_context = useContext(EmployersContext);

    return (
        <div className="my-5">
            <SearchEmployers />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {employers_context.employers.map(e =>
                    <div key={e.id} className="col">
                        <div className="card h-100 m-1  rounded-0 shadow-sm">
                            <Link to={'/employers/' + e.id} className="card-img-top d-flex justify-content-center p-2">
                                <SquareImage width='120px' src={e.imageUrl ? 'https://localhost:44318/Uploads/' + e.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'} />
                            </Link>
                            <div className="card-body p-0 d-flex flex-column justify-content-center">
                                <h3 className="text-center">
                                    <Link to={'/employers/' + e.id} className="text-dark" style={{ textDecoration: 'none' }}>
                                        {e.name}
                                    </Link>
                                </h3>
                                <span className=" text-center">
                                    {e.address}
                                </span>
                                <span className=" text-center">
                                    {e.fieldOfWork}
                                </span>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default EmployersList;