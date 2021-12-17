import bg from '../../assets/background5.jpg';
import job2 from '../../assets/undraw_career_progress_ivdb.svg';
import job1 from '../../assets/undraw_business_deal_re_up4u.svg';
import people from '../../assets/undraw_web_search_re_efla.svg';
import Container from '../UI/Container';

import JobsContext from '../../store/jobs-context';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {

    const jobs_context = useContext(JobsContext);
    const inputRef = useRef();
    const navigate = useNavigate();

    return (
        <div className='p-5' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Container>
                <h1 className="text-center text-white"> Find your dream job here</h1>

                <div className='row'>
                    <div className='col-sm-9 mb-2'>
                        <input placeholder='Title or keyword...' ref={inputRef}
                            className='form-control w-100 m-0' type='search' />
                    </div>
                    <div className='col-sm-3'>
                        <button className="btn w-100 m-0 btn-info" onClick={() => {
                            jobs_context.setSearchTerm(inputRef.current.value);
                            navigate('/jobs');
                        }}>
                            Search
                        </button>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-sm-5 mt-2'>
                    <div className='col-10 d-flex justify-content-center'>
                        <img className="m-1 col-10" src={people} />
                    </div>
                </div>
                <div className='row mt-1'>
                    <p data-aos='fade-right'
                        className='col-sm-6 my-sm-auto  text-justify'>
                        Not sure how to get started with your job search?
                        Whether you're looking for a new career, are ready to start
                        your first job, or have lost your job,
                        we offer products and services to you at no cost.</p>
                    <p data-aos='fade-left' className='col-sm-6 '>
                        <img className='col-12' src={job2} alt='job' />
                    </p>
                </div>
                <div className='row mt-2'>
                    <p data-aos='fade-left' className='col-sm-6 my-sm-auto order-sm-2 text-justify'>
                        Why not find the right job, right now?
                        It's waiting for you.
                        Finding a job shouldn’t be a full-time job.
                        Tell us what you’re looking for and we’ll get to work for you.
                    </p>
                    <p data-aos='fade-right' className='col-sm-6 order-sm-1'>
                        <img className='col-12' src={job1} alt='job' />
                    </p>

                </div>
            </Container>
        </div >

    )
}

export default LandingPage;