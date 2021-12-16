import { useEffect, useState } from 'react';
import JobListingCard from '../JobListings/JobListingCard';

const Pagination = props => {
    const [pages,setPages] = useState(Math.ceil(props.data.length / props.limit));
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{

        setPages(Math.ceil(props.data.length / props.limit));

    },[props.data])

    const goToNextPage = () => {
        setCurrentPage(page => page + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(page => page - 1);
    };

    const changePage = e => {
        const pageNum = parseInt(e.target.textContent);
        setCurrentPage(pageNum);
    }

    const getData = () => {
        const startIndex = currentPage * props.limit - props.limit;
        const endIndex = startIndex + props.limit;
        return props.data.slice(startIndex, endIndex);
    };

    const getGroup = () => {
        let start = Math.floor((currentPage - 1) / 3) * 3;
        let group = [];
        for (let i = start + 1; i < start + 4; i++) {
            if (i <= pages)
                group.push(i);
        }
        return group;
    };

    return (
        <div className='mb-3'>
            {getData().map(job => {
                let employer;
                if (props.employer) {
                    employer = props.employer;
                }
                else {
                    employer = props.employers.filter(e => e.id == job.employerId)[0];
                }

                return <JobListingCard deleteJob={props.deleteJob} key={job.id} job={job} employer={employer} />
            })}
            {props.data.length > props.limit &&
                <div className='d-flex justify-content-center'>
                    <div className='pagination'>
                        <div className={currentPage == 1 ? 'page-item disabled' : 'page-item'}>
                            <button
                                className='page-link '
                                onClick={goToPrevPage}>
                                prev
                            </button>
                        </div>
                        {getGroup().map((item, index) =>
                            <div
                                className={'page-item '}>
                                <button
                                    key={index}
                                    onClick={changePage}
                                    className={currentPage === item ? 'page-link bg-light text-primary' : 'page-link'}
                                >
                                    {item}
                                </button>
                            </div>
                        )}
                        <div className={currentPage == pages ? ' page-item  disabled' : 'page-item '}>
                            <button
                                className='page-link '
                                onClick={goToNextPage}>
                                next
                            </button>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default Pagination