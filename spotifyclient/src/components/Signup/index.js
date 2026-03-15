import { Component } from 'react'
import './index.css'
import logo from '../../assets/logo.png';
import { Link,Redirect } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";
import Cookies from 'js-cookie'

class Signup extends Component {

    state={
        username:'',
        usernameerr:false,
        password:'',
        passworderr:false,
        errorMsg:'',
        showSubmiterror:false,
    }

    userNameupdate = (event)=>{
        const data = event.target.value
        this.setState({username:data,usernameerr:false})
    }
    passWordupdate = (event)=>{
        const data = event.target.value
        this.setState({password:data,passworderr:false})
    }
    usernameBlur=()=>{
        const {username} = this.state
        if(!username){
            this.setState({usernameerr:true})
        }
    }
    passwordBlur=()=>{
        const {password} = this.state
        if(!password){
            this.setState({passworderr:true})
        }
    }

    onSuccess = (jwtToken)=>{
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        return <Redirect to="/login" />
        //this.props.history.replace('/')
    }

    onFailed = (errorMsg) =>{
        this.setState({errorMsg, showSubmiterror: true})
    }

    submitForm = async (event)=>{
        event.preventDefault()
        const {username,password,usernameerr,passworderr} = this.state
        if(!usernameerr && !passworderr){
            const userdata = {username,password}
            const url = 'https://spotify-mini-for-showcase-skills.onrender.com/signup'
            const option = {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdata)
            }
            const response = await fetch(url, option)
            const data = await response.json()
            if (response.ok){
                this.onSuccess(data.jwt_token)
            }else{
                this.onFailed(data.message)
            }
        }else{
            if(usernameerr===true){
                this.setState({usernameerr:true})
            }
            if(passworderr===true){
                this.setState({passworderr:true})
            }
        }
        
    }

    render() {
        const {username,password,showSubmiterror,errorMsg,usernameerr, passworderr} = this.state
        return (
            <div className='Signup-container'>
               <img src={logo} className='logo' alt="logo"/>
               <h1 className='mt-4'>Sign up to start listening</h1>
               <div className='form-container'>
                {showSubmiterror ? 
                    <div className='error_msg mt-4'>
                        <p>{errorMsg}</p>
                    </div>: null    
                }
                <form onSubmit={this.submitForm}>
                    <div className='sign-input-contianer'>
                        <label>
                            Email address
                        </label>
                        <input type='text' value={username} id='username' onBlur={this.usernameBlur} onChange={this.userNameupdate} className='signup-input' />
                        {usernameerr ? <p>Required*</p> : null}
                    </div>
                    <div className='sign-input-contianer'>
                        <label>
                            Password
                        </label>
                        <input type='password' value={password} id='password' onBlur={this.passwordBlur} onChange={this.passWordupdate} className='signup-input' />
                        {passworderr ? <p>Required*</p> : null}
                    </div>
                    <button className='signup-btn bg-green' type='submit'>Create user</button>
                </form>
                <div className="or-container">
                    <p>------------</p>
                    <p>or</p>
                    <p>------------</p>
                </div>
                <div className="sign-btn-container">
                    <button className='bg-green sign-opt-btn'><FcGoogle /> Sign up with Google</button>
                    <button className='bg-green sign-opt-btn'><ImAppleinc /> Sign up with Apple</button>
                    <p className='sign-log'>Already have an account? <Link to='/Login'>Log in here</Link></p>
                </div>
               </div>
            </div>
        )
    }
}

export default Signup;
