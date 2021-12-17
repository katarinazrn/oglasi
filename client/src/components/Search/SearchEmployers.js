import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import EmployersContext from "../../store/employers-context";

const SearchEmployers = props => {

    const employers_context = useContext(EmployersContext);
    return (
        <div className="my-3">
            <div className="form-group d-flex">
                <input className="form-control " onChange={(e)=>employers_context.setSearchTerm(e.target.value)}
                    type='search'  value={employers_context.searchTerm} placeholder="Company name..." />
            </div>
        </div>
    )
}

export default SearchEmployers;