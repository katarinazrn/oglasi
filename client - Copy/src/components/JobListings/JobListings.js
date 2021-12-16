import Pagination from "../UI/Pagination";

const JobListings = props => {

    if (props.jobs.length == 0 && props.startedSearch) {
        return <h3 className="text-center mt-4 text-muted">No result</h3>
    }

    return (
        <Pagination
            deleteJob={props.deleteJob}
            data={props.jobs}
            employers={props.employers}
            employer={props.employer}
            limit={10}
        />
    )
}

export default JobListings;