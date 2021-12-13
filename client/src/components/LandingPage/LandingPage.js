import bg from '../../assets/background5.jpg';
import job1 from '../../assets/job1.png';
import job2 from '../../assets/job2.png';
import people from '../../assets/imageedit_10_7816624577.png';
import Container from '../UI/Container';

const LandingPage = (props) => {

    return (
        <div className='p-5' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Container>
                <h1 className="text-center text-light"> Find your dream job here</h1>
                <div className='d-flex justify-content-center'>
                    <div className='col-10 p-4 d-flex'>
                        <input placeholder='Title or keyword...' onChange={(e) => props.handleInput(e.target.value)} className='form-control' type='search' />
                        <button className="btn btn-secondary ms-2" onClick={props.find}>Search</button>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-5'>
                    <div className='col-10 d-flex'>
                        <img className="m-1 col-12" src={people} />
                    </div>
                </div>
                <div className='d-flex mt-2'>
                    <p data-aos='fade-right' className='col-6 my-auto text-justify'>
                        Not sure how to get started with your job search?
                        Whether you're looking for a new career, are ready to start
                        your first job, or have lost your job,
                        we offer products and services to you at no cost.</p>
                    <p data-aos='fade-left' className='col-6 m-2 '>
                        <img className='col-12' src={job2} alt='job' />
                    </p>
                </div>
                <div className='d-flex'>
                    <p data-aos='fade-right' className='col-6 m-2'>
                        <img className='col-12' src={job1} alt='job' />
                    </p>
                    <p data-aos='fade-left' className='col-6 my-auto text-justify'>
                        Why not find the right job, right now?
                        It's waiting for you.
                        Finding a job shouldn’t be a full-time job.
                        Tell us what you’re looking for and we’ll get to work for you.
                    </p>
                </div>
            </Container>
        </div >

    )
}

export default LandingPage;