import { Component } from 'react'
import './index.css'
import logo from '../../assets/logo.png';
import { IoHome,IoSearch } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import { RiStackFill } from "react-icons/ri";
import { CiLogin,CiLogout } from "react-icons/ci";
import { FiHome } from "react-icons/fi";
import { Link,Redirect } from "react-router-dom";
import Cookies from 'js-cookie' 


class Header extends Component {
    state={
        logorSign:false,
    }

    removeCookie=()=>{
        Cookies.remove('jwt_token')
        this.setState({logorSign:true})
    }

    login = ()=>(
        <button className='Login-btn'><Link to='/' className='links'>Login</Link></button>
    )
    logout = ()=>(
        <button className='Login-btn' onClick={this.removeCookie}>Logout</button>
    )
    

    render() {
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined || jwtToken ==="undefined") {
            this.setState({logorSign:true})
            return <Redirect to="/login" />
        }
        const {logorSign} = this.state

        return (
            <>
            <nav className='navigation'>
                <div className='nav-part-1'>
                    <img src={logo} className='header-logo' alt="logo"/>
                    <div className='home-container'><Link to='/' className='links'><IoHome className='home-icon' /></Link></div>
                    <div className='input-contianer'>
                        <IoSearch className='header-search-icon' />
                        <input type='search' name='search_eng' className='nav-input' />
                        <RxDividerVertical className='verical-line-icon' />
                        <RiStackFill className='Stock-icon' />
                    </div>
                </div>
                
                <div className='nav-part-3'>
                    <div className='support-container'>
                        <p className='support-link'>Premium</p>
                        <p className='support-link'>Support</p>
                        <p className='support-link'>Download</p>
                    </div>
                    <RxDividerVertical className='verical-line-green-icon' />
                    <div className='signIn-signOut'>
                        <button className='install-sign-btn'>Install App</button>
                        <button className='install-sign-btn'><Link to='/signup' className='links'>Sign Up</Link></button>
                        {logorSign ? this.login() : this.logout()}
                    </div>
                </div>
            </nav>
            
            <nav className="navbar navbar-mini navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <img src={logo} className='header-logo' alt="logo"/>
                <Link className="navbar-brand green" href="#">Spotify</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" href="#"><FiHome size={20}/> Home</Link>
                    <Link className="nav-link active" href="#"><CiLogin size={20}/> Sign Up</Link>
                    <Link className="nav-link active" href="#"><CiLogout size={20}/> Login</Link>
                </div>
                </div>
            </div>
            </nav>
            </>
        )
    }
}

export default Header;
