import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import JobListingDetails from './components/JobListings/JobListingDetails';
import JobListings from './components/JobListings/JobListings';
import LandingPage from './components/LandingPage/LandingPage';
import Search from './components/Search/Search';
import Container from './components/UI/Container';
import PostJob from './components/Employers/PostJob';
import Login from './components/Employers/Login';
import Register from './components/Employers/Register';
import EmployersList from './components/Employers/EmployersList';
import EmployerDetails from './components/Employers/EmployerDetails';
import EditJob from './components/Employers/EditJob';
import Footer from './components/Footer/Footer';
import JobsContext from './store/jobs-context';
import { useContext } from 'react';
import NotFound from './components/UI/NotFound';

function App() {

  const jobs_context = useContext(JobsContext);

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
      </Routes>
      <Container>
        <Routes>
          <Route exact path='/jobs' element={<Search />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs' element={<JobListings data={jobs_context.filteredJobs} />} />
        </Routes>
        <Routes>
          <Route exact path='/jobs/:id' element={<JobListingDetails />} />
        </Routes>
        </Container>
        <Container>
        <Routes>
          <Route path='employers'>
            <Route exact path='login' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route path='post-job/:id' element={<EditJob />} />
            <Route path='post-job/' element={<PostJob />} />
            <Route exact path=':id' element={<EmployerDetails />} />
            <Route exact path='' element={<EmployersList />} />
            <Route exact path='*' element={<NotFound />} />
          </Route>
        </Routes>
        <Routes>
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
