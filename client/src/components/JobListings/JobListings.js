import Pagination from "../UI/Pagination";

const JobListings = props => {


    if(!props.data){
        return <div>Loading...</div>
    }

    return (
        <Pagination
            data={props.data}
            limit={10}
        />
    )
}

export default JobListings;