import { Component } from 'react'
import { Link } from "react-router-dom";
import Allsong  from '../AllSong'
import './index.css'
import Header from '../header' 
import HomePart1 from '../HomePart1';
import HomePart2 from '../HomePart2';

class Home extends Component {
    
    state = {
        isLoading: true,
        data:[],
        songId:'',
    }

    componentDidMount(){
        this.getallsongsData()
    }

   

    sontActivation = (id)=>{
        this.setState({songId:id})
    }

    getallsongsData=async()=>{
        const url = `http://localhost:2000/getsongs`
        const option = {
        method: 'GET',
        }
        const songdata = await fetch(url, option)
        const songdatajson = await songdata.json()
        this.setState({data:songdatajson})
    }

    showallSongs=()=>{
        const {data} = this.state
        return(
            <>
                <div className='trending-contianer'>
                    <h1>Trending songs</h1>
                    <Link className='all-song-show-all'>Show all</Link>
                </div>
                <div className='all-song-container'>
                    {data.map(each => (
                        <Allsong data={each} songactivation={()=> this.sontActivation(each.id)} key={each.id} />
                    ))}
                </div>
            </>
        )
    }
    
    render() {
        return (
            <div className='home'>
                <Header/>
                <div className='home-container'>
                    <HomePart1/>
                    <HomePart2/>
                </div>
            </div>
        )
    }
}

export default Home;
