import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"
const LoginPopup = ({setShowLogin}) => {
  const [currentState,setCurrentState]= useState("Signup")
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const [showPassword,setShowPassword]= useState(false)
  const onChangeHandler = (event) => {
    const name =event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
  }
  const {url,setToken} = useContext(StoreContext)
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl=url;
    if (currentState==="Login"){
      newUrl+="/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data)
    if (response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}  className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState ==="Signup" &&<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required  />
          <div className='password-wrapper'>
            <input type={ showPassword ? "text":"password"} value={data.password} name='password' onChange={onChangeHandler} placeholder='Password' required />
            <img className= "password-eye" src={showPassword ? assets.eye_close:assets.eye_open} alt="toggle password"
            onClick={()=> setShowPassword(prev => !prev)}
            style={{ cursor: "pointer" }}
            />
           </div> 
        </div>
        <button type='submit'>{currentState==='Signup' ?  "Create account " : "Log in"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==="Login"?<p>Create a new account ? <span onClick={()=>setCurrentState("Signup")}>Click here</span></p>:
        <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Log in here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup