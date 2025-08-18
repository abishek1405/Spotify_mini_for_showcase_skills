import { Component } from 'react'
import { MdTimer } from "react-icons/md";
import AudioPlayer from 'react-h5-audio-player';
import Header from '../header';
import HomePart1 from '../HomePart1';
import ListSongs from '../ListSongs';
import 'react-h5-audio-player/lib/styles.css';
import './index.css'
import '../home/index.css'

class Playsong extends Component {
    
    state = {
        currentSong:[],
        allsongdata:[],
    }

    componentDidMount(){
        this.getsongsData()
    }

    getsongsData=async()=>{
        const {id} = this.props.match.params
        const songdata = await fetch(`http://localhost:2000/getsongs/${id}`)
        const currentSong = await songdata.json()
        const url = `http://localhost:2000/getsongs`
        const option = {
        method: 'GET',
        }
        const allsongdata = await fetch(url, option)
        const allsongdatajson = await allsongdata.json()
        this.setState({currentSong:currentSong,allsongdata:allsongdatajson})
    }   
    
    sontActivation = async (id) =>{
        const songdata = await fetch(`http://localhost:2000/getsongs/${id}`)
        const currentSong = await songdata.json()
        this.setState({currentSong:currentSong})
    }

    TruncatedText = ({ text, limit = 50 }) => {
        if (!text) return <p></p>; 
        return (
            <>
            {text.length > limit ? text.substring(0, limit) + "..." : text}
            </>
        );
    };

    render() {
        const {currentSong,allsongdata} = this.state
        const {name,avatar,artist,duration,file,id} = currentSong
        return(
            <div className='home'>
                <Header/>
                <div className='home-container'>
                    <HomePart1/>
                    <div className='home-part-2'>
                        <div className='song-container'>
                            <div className='song-details'>
                                <div className='song-avatar'>
                                    <img className='song-avatar-img' src={`http://localhost:2000${avatar}`} alt={name} />
                                </div>
                                <div className='song-det'>
                                    <p className=''>Public Playlist</p>
                                    <h1 className='aqua'>{name}</h1>
                                    <p className='green'>{artist}</p>
                                    <p><MdTimer /> {duration}</p>
                                </div>
                            </div>
                            <div className='other-sogns'>
                                <table>
                                    <tr className='song-list-head'>
                                        <th className='no'>No</th>
                                        <th>Title</th>
                                        <th>Album</th>
                                        <th className='time'><MdTimer className='timer' /></th>
                                        <th>Play</th>
                                    </tr>
                                    {allsongdata.map((each, index) => (
                                        <ListSongs playingid={id} data={each} index={index} songactivation={()=> this.sontActivation(each.id)} key={each.id} />
                                    ))}
                                    
                                </table>
                            </div>
                            <div className='audio-container'>
                                <AudioPlayer
                                    className='player mb-4'
                                    autoPlay
                                    src={`http://localhost:2000${file}`}
                                    onPlay={e => console.log("onPlay")}
                                    volume={0.1}
                                    showSkipControls={true}
                                    showJumpControls={true}
                                    progressJumpSteps={{ backward: 5000, forward: 5000 }}
                                    header={
                                        <div style={{ textAlign: "center", padding: "10px", color: "#0f0" }}>
                                        🎵 Now Playing: <strong>{name}</strong> by {this.TruncatedText({text:artist, limit:25})}
                                        </div>
                                    }
                                    layout="stacked"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Playsong;