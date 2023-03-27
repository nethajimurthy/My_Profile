import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/myprofile.css'

const MyProfile = () => {
  const Navigate = useNavigate()
  const [userData,setUserData]=useState()

  const URL=`http://localhost:5000/myprofile`
  const GetData=async ()=>{
    const data={
      uname:sessionStorage.getItem('uname'),
      password:sessionStorage.getItem('password'),
      token:sessionStorage.getItem('key')
    }

    try{
      await axios.post(URL,data)
      .then((res)=>{
        setUserData(res.data)
      }
      )
    }
    catch(err){console.log(err.message)}
  }
  useEffect(()=>{
    GetData()
  },[])

  return (
    <div className='MyProfile'>
      {!userData? <h2>Loading...</h2>:
      <>
      <div className='TopArea'>

      <div className='UserDetails'>
      <h1>Myself {userData.name},</h1><br/>
      <h3>And i am a {userData.profession}</h3><br/>
      <p>{userData.description}</p>
      </div>
      <div className='ImageArea'>
      <img src={userData.image} alt='profile'/>
      </div>
      </div>
      <div className='SkillsArea'>
        <h2>Skills</h2><br/>
        <div className='Line'></div><br/>
        <div className='SkillList'>
        {userData.skillset.length>0? userData.skillset.map((skill,idx)=>{
          console.log(skill)
          return <ul id={idx}><h3>{skill}</h3></ul>
        }):null}
        </div>
      </div>
      <button onClick={()=>Navigate('/editprofile')}>EDIT PROFILE</button>
      </>
      }
    </div>
  )
}

export default MyProfile