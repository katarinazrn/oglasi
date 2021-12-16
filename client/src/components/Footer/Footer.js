import { Link } from 'react-router-dom';
import fbIcon from '../../assets/facebook.png';
import igIcon from '../../assets/instagram.png';
import liIcon from '../../assets/linkedin.png';
import twIcon from '../../assets/twitter.png';

const Footer = props => {
    return (
        <div className="bg-dark footer mt-5 p-3">
            <div className='d-flex justify-content-center p-3 m-2'>
                <div className="text-light  me-5">
                    <h4 className='text-light '>Contact</h4>
                    <p>Address 10, City</p>
                    <p>+1234567</p>
                    <p>email@email.com</p>
                </div>
                <div className='text-light ms-5'>
                    <h4 className='text-light '>Services</h4>
                    <p><Link to='/jobs' className='text-light '>Find a job</Link></p>
                    <p><Link to='/employers/' className='text-light '>Meet Employers</Link></p>
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