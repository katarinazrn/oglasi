import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import JobListingDetails from './components/JobListings/JobListingDetails';
import JobListings from './components/JobListings/JobListings';
import LandingPage from './components/LandingPage/LandingPage';
import Search from './components/Search/Search';
import Container from './components/UI/Container';
import { useNavigate } from 'react-router-dom';
import PostJob from './components/Employers/PostJob';
import Login from './components/Employers/Login';
import Register from './components/Employers/Register';
import EmployersList from './components/Employers/EmployersList';
import EmployerDetails from './components/Employers/EmployerDetails';
import EditJob from './components/Employers/EditJob';
import Footer from './components/Footer/Footer';

function App() {
  const [jobs, setJobs] = useState([])
  const [allJobs, setAllJobs] = useState([])
  const [allEmployers, setAllEmployers] = useState([])
  const [startedSearch, setStartedSearch] = useState(false)
  const [titleOrKeyword, setTitleOrKeyword] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://localhost:44318/api/joblistings')
      .then(res => res.json())
      .then(data => {
        data = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        setAllJobs(data)
        setJobs(data)
      })

  }, [])

  useEffect(() => {
    fetch('https://localhost:44318/api/employers')
      .then(res => res.json())
      .then(data => {
        setAllEmployers(data)
      })

  }, [])

  const filter = (location, seniority, fieldOfWork) => {
    setStartedSearch(true);
    let jobListings = [...allJobs];

    if (location.trim() != "") {
      jobListings = jobListings.filter(x => x.location.toLowerCase() === location.toLowerCase());
    }

    if (seniority.trim() != "") {
      jobListings = jobListings.filter(x => x.seniority.toLowerCase() === seniority.toLowerCase());
    }

    if (fieldOfWork.trim() != "") {
      jobListings = jobListings.filter(x => x.fieldOfWork.toLowerCase() === fieldOfWork.toLowerCase());
    }

    if (titleOrKeyword.trim() != "") {
      jobListings = jobListings.filter(x => x.title.toLowerCase().includes(titleOrKeyword.toLowerCase())
        || x.tags.toLowerCase().includes(titleOrKeyword.toLowerCase()));
    }

    setJobs(jobListings);
  }

  const addJob = newJob => {
    let j = [...allJobs]
    j.push(newJob)
    setAllJobs(j)
    j = [...jobs]
    j.push(newJob)
    setJobs(j)
  }

  const find = () => {

    filter("", "", "", titleOrKeyword);
    navigate('/jobs');
  }

  const searchTermChange = term => {
    setTitleOrKeyword(term);
  }

  const deleteJob = id => {
    fetch('https://localhost:44318/api/joblistings/' + id, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json()
      )
      .then(data => {
        let j = [...allJobs];
        setAllJobs(j.filter(x => x.id != id))
        j = [...jobs];
        setJobs(j.filter(x => x.id != id));
      })
  }

  const editJob = job => {
    let j = [...allJobs];
    setAllJobs(j.map(x => x.id != job.id ? x : job))
    j = [...jobs];
    setJobs(j.filter(x => x.id != job.id ? x : job));

  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage find={find} handleInput={searchTermChange} />} />
      </Routes>
      <Container>
        <Routes>
          <Route exact path='/jobs' element={
            <Search searchTermChange={searchTermChange} titleOrKeyword={titleOrKeyword} filter={filter} />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs' element={<JobListings deleteJob={deleteJob} startedSearch={startedSearch} jobs={jobs} employers={allEmployers} />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs/:id' element={<JobListingDetails jobs={jobs} deleteJob={deleteJob} employers={allEmployers} />} />
        </Routes>
        <Routes>
          <Route exact path='/employers/login' element={<Login />} />
          <Route exact path='/employers/register' element={<Register />} />
          <Route path='/employers/post-job/:id' element={<EditJob editJob={editJob} jobs={allJobs} />} />
          <Route path='/employers/post-job/' element={<PostJob addJob={addJob} />} />  <Route exact path='/employers/' element={<EmployersList employers={allEmployers} />} />
          <Route exact path='/employers/:id' element={<EmployerDetails deleteJob={deleteJob} jobs={allJobs} employers={allEmployers} />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
