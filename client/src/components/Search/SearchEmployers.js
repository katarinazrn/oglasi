import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import EmployersContext from "../../store/employers-context";

const SearchEmployers = props => {

    const employers_context = useContext(EmployersContext);
    return (
        <div className="mt-4 p-1">
            <div className="form-group m-1 d-flex">
                <input className="form-control me-2" onChange={(e)=>employers_context.setSearchTerm(e.target.value)}
                    type='search'  value={employers_context.searchTerm} placeholder="Company name..." />
            </div>
        </div>
    )
}

export default SearchEmployers;