import { Component } from 'react'
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { TiWorld } from "react-icons/ti";


class HomePart1 extends Component {  
    render() {
        return (
            <div className='home-part-1'>
                <div>
                    <div className='library'>
                        <h5>Your Library</h5>
                        <button type='button' className='lib-btn'><FaPlus /></button>
                    </div>
                    <div className='playlist-container'>
                        <div className='playlist mt-4'>
                            <h6>Create your first playlist</h6>
                            <p>it's easy, we'll help you</p>
                            <button type='button' className='playlist-btn bg-green'>Create Playlist</button>
                        </div>
                        <div className='playlist mt-4'>
                            <h6>Let's Find some podcasts to follow</h6>
                            <p>We'll keep you updated on new episodes</p>
                            <button type='button' className='playlist-btn bg-green'>Browse podcasts</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='link-container mt-4'>
                        <Link className='green playlist-links' to='/'>Legal</Link>
                        <Link className='green playlist-links' to='/'>Safety & Privacy Center</Link>
                        <Link className='green playlist-links' to='/'>Privacy Policy</Link>
                        <Link className='green playlist-links' to='/'>Cookies</Link>
                        <Link className='green playlist-links' to='/'>About Ads</Link>
                        <Link className='green playlist-links' to='/'>Accessiblility</Link>
                    </div>
                    <button type='button' className='mt-4 language-btn'><TiWorld /> English</button>
                </div>
            </div>
        )
    }
}

export default HomePart1;
