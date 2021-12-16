import Pagination from "../UI/Pagination";

const JobListings = props => {

    return (
        <Pagination
            data={props.data}
            limit={10}
        />
    )
}

export default JobListings;