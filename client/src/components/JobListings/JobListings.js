import JobListingCard from "./JobListingCard";

const JobListings = props=>{

    if(props.jobs.length==0 && props.startedSearch){
        return <h3 className="text-center mt-4 text-muted">No result</h3>
    }

    return(
        <div>
            {props.jobs.map(job=><JobListingCard key={job.id} job={job} />)}
        </div>
    )

}

export default JobListings;