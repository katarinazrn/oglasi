import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootswatch/dist/flatly/bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { JobsContextProvider } from './store/jobs-context';
import { EmployersContextProvider } from './store/employers-context';


ReactDOM.render(
  <AuthContextProvider>
    <JobsContextProvider>
      <EmployersContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EmployersContextProvider>
    </JobsContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
