//import { Link } from "react-router-dom";
import { Component } from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import { FaPlay } from "react-icons/fa";


class Allsong extends Component {

  songactive=()=>{
    const {data,songactivation} = this.props
    const {id} = data
    songactivation(id) 
  }

  TruncatedText = ({ text, limit = 50 }) => {
    if (!text) return <p></p>; 
    return (
        <p className='song-artist'>
        {text.length > limit ? text.substring(0, limit) + "..." : text}
        </p>
    );
  };

  render(){
    const {data} = this.props
    const {name,avatar,artist,id} = data
    return(
      <div className='songs-container'>
        <div className='avatar-container'>
          <img className='avatar' src={`http://localhost:2000${avatar}`} alt={name} />
          <Link to={`/playsong/${id}`}><button type='button' onClick={this.songactive} className='play-btn bg-green'><FaPlay /></button></Link>
        </div>
        <h1 className='song-name green'>{name}</h1>
        {this.TruncatedText({text:artist, limit:45})}
      </div>
    )
  }
}

export default Allsong