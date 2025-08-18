import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import './index.css'

const NotFound = () => (
  <div className='main'>
    <img src={logo} className='logo' alt="logo"/>
    <h1>Page not found</h1>
    <p className="green">We can't seem to find the page you are looking for.</p>
    <button className='NotFound-btn bg-green' type='button'><Link className="NotFound-content" to='/'>Home</Link></button>
  </div>
)

export default NotFound