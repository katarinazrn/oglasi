import { Link } from 'react-router-dom';
import fbIcon from '../../assets/facebook.png';
import igIcon from '../../assets/instagram.png';
import liIcon from '../../assets/linkedin.png';
import twIcon from '../../assets/twitter.png';

const Footer = props => {
    return (
        <div className="bg-dark p-3">
            <div className='row justify-content-center'>
                <div className="col-sm-6 text-white text-center text-sm-end pe-sm-5">
                    <h4 className='text-white '>Contact</h4>
                    <p>Address 10, City</p>
                    <p>+1234567</p>
                    <p>email@email.com</p>
                </div>
                <div className='col-sm-6 text-white text-center text-sm-start ps-sm-5'>
                    <h4 className='text-white '>Services</h4>
                    <p><Link to='/jobs' className='text-white '>Find a job</Link></p>
                    <p><Link to='/employers/' className='text-white '>Meet Employers</Link></p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <img className='p-0 me-2 btn' src={fbIcon} style={{ width: '35px', opacity: '0.6' }} alt='facebook' />
                <img className='p-0 me-2 btn' src={igIcon} style={{ width: '35px', opacity: '0.6' }} alt='instagram' />
                <img className='p-0 me-2 btn' src={twIcon} style={{ width: '35px', opacity: '0.6' }} alt='twitter' />
                <img className='p-0 btn' src={liIcon} style={{ width: '35px', opacity: '0.6' }} alt='linkedin' />
            </div>
        </div>
    )

}

export default Footer;