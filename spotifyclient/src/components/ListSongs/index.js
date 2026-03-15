import { Component } from 'react'
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlinePauseCircleOutline } from "react-icons/md";

import './index.css'


class ListSongs extends Component {

    changeCurrectSong=()=>{
        const {songactivation,data} = this.props
        const {id} = data
        songactivation(id)
    }

    render() {
        const {data,index,playingid} = this.props
        const {name,avatar,artist,duration,id} = data 
        let icon = playingid === id ? <MdOutlinePauseCircleOutline className="paly-icon" /> : <FaRegCirclePlay className="paly-icon" />
        return(
            <tr className='list-tr'>
                <td>{index+1}</td>
                <td className="list-td">
                    <div className='list-img-contianer'>
                        <img src={`https://spotify-mini-for-showcase-skills.onrender.com${avatar}`} className='list-img' alt={name}/>
                    </div>
                    <div className='list-img-detail-container'>
                        <h1 className='list-name'>{name}</h1>
                        <p className='list-artist green'>{artist}</p>
                    </div>
                </td>
                <td>{name}</td>
                <td>{duration}</td>
                <td><button className='paly-button green' onClick={this.changeCurrectSong} type='button'>{icon}</button></td>
            </tr>
        )
    }
}

export default ListSongs;