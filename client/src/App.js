import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  const [jobs, setJobs] = useState([])
  const [allJobs, setAllJobs] = useState([])
  const [allEmployers,setAllEmployers]=useState([])
  const [startedSearch, setStartedSearch] = useState(false)
  const [titleOrKeyword, setTitleOrKeyword] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://localhost:44318/api/joblistings')
      .then(res => res.json())
      .then(data => {
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
      jobListings = jobListings.filter(x => x.location === location);
    }

    if (seniority.trim() != "") {
      jobListings = jobListings.filter(x => x.seniority === seniority);
    }

    if (fieldOfWork.trim() != "") {
      jobListings = jobListings.filter(x => x.filedOfWork === fieldOfWork);
    }

    if (titleOrKeyword.trim() != "") {
      jobListings = jobListings.filter(x => x.title.toLowerCase().includes(titleOrKeyword.toLowerCase())
        || x.tags.toLowerCase().includes(titleOrKeyword.toLowerCase()));
    }

    setJobs(jobListings);
  }

  const find = () => {

    filter("", "", "", titleOrKeyword);
    navigate('/jobs');
  }

  const searchTermChange = term => {
    setTitleOrKeyword(term);
  }

  return (
    <Fragment>
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
          <Route exact path='/jobs' element={<JobListings startedSearch={startedSearch} jobs={jobs} />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs/:id' element={<JobListingDetails jobs={jobs} />} />
        </Routes>
        <Routes>
          <Route exact path='/employers/post-job' element={<PostJob />} />
          <Route exact path='/employers/' element={<EmployersList employers={allEmployers} />} />
        </Routes>
        <Routes>
          <Route  path='/employers/login' element={<Login />} />
          <Route  path='/employers/register' element={<Register />} />
        </Routes>
      </Container>
    </Fragment>
  );
}

export default App;
