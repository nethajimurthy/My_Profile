import React from "react";
import { useState } from "react";
import "../stylesheets/register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    description: "",
    skillset: [],
    profimage: "",
    uname: "",
    password: "",
  });

  const [allOk, setAllOk] = useState(false);

  const [currSkill, setCurrSkill] = useState("");
  const [error, setError] = useState("");
  const [skillError, setSkillError] = useState("");

  const HandleChange = (val, key) => {
    setFormData((data) => {
      data[key] = val;
      return data;
    });
  };

  const CheckPassword = (val) => {
    if (formData["password"] !== val) {
      setError("Password Does not match!");
      setAllOk(false);
    } else {
      setError("");
      setAllOk(true);
    }
  };

const Navigate=useNavigate()

  const Register = async () => {
    const URL = "http://localhost:5000";
    try {
      await axios.post(URL,formData);
      setError('Registered Successfully, returning to login.')
    } catch (e){
      console.log(e.message);
    }
    setTimeout(()=>{
      Navigate('/')
    },2000)
  };

  const AddSkill = () => {
    if (currSkill !== "") {
      let newData = formData;
      newData.skillset.push(currSkill);
      setFormData(newData);
      setSkillError("");
      setCurrSkill("");
    } else {
      setSkillError("Cannot add empty as skill ..!");
    }
  };

  return (
    <div className="Register">
      <h1>New Here ?</h1>
      <h2>Register</h2>
      <p>
        <b>Name :</b>
      </p>
      <input type="text" onBlur={(e) => HandleChange(e.target.value, "name")} />
      <p>
        <b>Profession :</b>
      </p>
      <input
        type="text"
        onBlur={(e) => HandleChange(e.target.value, "profession")}
      />
      <p>
        <b>Description :</b>
      </p>
      <textarea
        type="textarea"
        onBlur={(e) => HandleChange(e.target.value, "description")}
      />
      <p>
        <b>Skillsets :</b>
      </p>
      <div className="Skillarea">
        <input
          value={currSkill}
          type="text"
          id="SkillText"
          onChange={(e) => {
            setCurrSkill(e.target.value);
          }}
        />
        <button className="SkillAdd" onClick={AddSkill}>
          <b>+</b>
        </button>
      </div>
      <p className="SkillError">{skillError}</p>
      <div className='Skillset'>
        {formData.skillset.length>0? formData.skillset.map((ele,idx)=>{
                return <ul id={idx}>{ele}</ul>
            }):null}
    </div>
      <p>
        <b>User Name :</b>
      </p>
      <input
        type="text"
        onBlur={(e) => HandleChange(e.target.value, "uname")}
      />
      <p>
        <b>Set Password :</b>
      </p>
      <input
        type="password"
        onBlur={(e) => HandleChange(e.target.value, "password")}
      />
      <br />
      <p>
        <b>Confirm Password :</b>
      </p>
      <input type="password" onChange={(e) => CheckPassword(e.target.value)} />
      <p className="SkillError">{error}</p>
      <button id="Reg" onClick={Register} disabled={!allOk}>
        <b>Register</b>
      </button><br/>
      <Link to='/'><p className="Return">Return to login</p></Link>
    </div>
  );
};

export default Register;
