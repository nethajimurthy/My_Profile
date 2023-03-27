import React from 'react'
import { useState,useEffect } from 'react'
import '../stylesheets/loginpage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
    const Navigate=useNavigate()
    const [logError,setLogError]=useState('')

    const HandleChange=(val,key)=>{
        sessionStorage.setItem(key,val)
    }
    useEffect(()=>{
        sessionStorage.clear()
        console.log('cleared session ')
    },[])

    const LogIn=async()=>{
        await axios.post('http://localhost:5000/login',sessionStorage)
        .then((res)=>res.data)
        .then((data)=>{
            sessionStorage.setItem('key',data.token)
            setLogError(data.message)
                setTimeout(()=>{
                    Navigate('/myprofile')
                },1500)
            })
            .catch((res)=>{
                setLogError(res.response.data.message)
            })
    }

  return (
    <div className='LogIn'>
        <h1>Welcome</h1>
        <h2>LOGIN</h2>
        <p><b>User Name :</b></p>
        <input type='text' onChange={(e)=>HandleChange(e.target.value,'uname')}/>
        <p><b>Password :</b></p>
        <input id='password' type='password' onChange={(e)=>HandleChange(e.target.value,'password')}/><br/>
        <span className='SkillError'>{logError}</span><br/>
        <button onClick={LogIn}><b>LOGIN</b></button>
        <button onClick={()=>Navigate('/register')}><b>Register</b></button>
    </div>
  )
}

export default LoginPage