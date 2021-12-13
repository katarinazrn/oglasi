import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import JobListingDetails from './components/JobListings/JobListingDetails';
import JobListings from './components/JobListings/JobListings';
import LandingPage from './components/LandingPage/LandingPage';
import Search from './components/Search/Search';
import Container from './components/UI/Container';

function App() {
  const [jobs, setJobs] = useState([])
  const [allJobs, setAllJobs] = useState([])
  const [startedSearch, setStartedSearch] = useState(false)

  useEffect(() => {

    fetch('https://localhost:44318/api/joblistings')
      .then(res => res.json())
      .then(data => {
        setAllJobs(data)
        setJobs(data)
      })

  }, [])

  const filter = (location, seniority, fieldOfWork, titleOrKeyword) => {
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

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
      </Routes>
      <Container>
        <Routes>
          <Route exact path='/jobs' element={<Search filter={filter} />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs' element={<JobListings startedSearch={startedSearch} jobs={jobs} />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs/:id' element={<JobListingDetails jobs={jobs} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
