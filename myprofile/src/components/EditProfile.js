import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState(true);
  const [tempSkillset, setTempSkillset] = useState([]);
  const [newCred, setNewCred] = useState({});
  const [tempData, setTempData] = useState({
    name: null,
    profession: null,
    description: null,
    skillset: [],
  });

  const sessionData = {
    uname: sessionStorage.getItem("uname"),
    password: sessionStorage.getItem("password"),
    token: sessionStorage.getItem("key"),
  };

  const URL = "http://localhost:5000/myprofile";
  const GetFilteredData = async () => {
    try {
      await axios.post(URL, sessionData).then((res) => {
        console.log("Received profile data");
        setTempSkillset(res.data.skillset);
        setTempData((data) => ({
          ...data,
          skillset: res.data.skillset,
        }));
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const HandleChange = (e) => {
    if (e.value !== "") {
      setTempData((data) => {
        data[e.name] = e.value;
        return data;
      });
    }
  };

  const SkillHandle = (e) => {
    let tempSkill = document.getElementById("Skill");
    console.log(tempSkill.value);
    if (tempSkill.value !== "") {
      setTempData((data) => ({
        ...data,
        skillset: [...data.skillset, tempSkill.value],
      }));
    }
    setTimeout(() => {
      tempSkill.value = "";
    }, 1);
  };

  const UpdateBasic = async () => {
    const postData = { tempData, ...data };
    console.log(postData);
    try {
      await axios
        .post(`${URL}/updatebasic`, postData)
        .then(() => console.log("Updated"));
    } catch (err) {
      console.log(err);
    }
  };

  const CheckNewPassword = (target) => {
    const newCredPass = document.getElementById("NewPassword").value;
    if (newCredPass !== target.value) {
      setError(false);
    } else setError(true);
  };

  const UpdateAndLogoff = async() => {
    console.log("update and log off");
    let newname = document.getElementById("NewUname").value;
    let newpassword = document.getElementById("NewPassword").value;
    if (newname !== "" && error) {
      let temp={'uname':newname}
      setNewCred((data)=>({...data,...temp}))
    }
    if (newpassword !== "" && error) {
    setNewCred((data) => {
        let temp={'password':newpassword}
        return {...data,...temp}
      });
    }

    setnterval(async()=>{
      console.log(newCred)
      await axios.post(`${URL}/updateimpcred`,{...sessionData,newCred})
      .then(()=>{
        console.log('changed')
      })
    })
      
  };

  useEffect(() => {
    GetFilteredData();
  }, []);

  return (
    <div className="EditProfile">
      <h1>Edit Your Profile</h1>
      <div className="BasicDetails">
        <p>
          <b>Name :</b>
        </p>
        <input
          type="text"
          name="name"
          onBlur={(e) => {
            HandleChange(e.target);
          }}
        />
        <p>
          <b>Profession</b>
        </p>
        <input
          type="text"
          name="profession"
          onBlur={(e) => {
            HandleChange(e.target);
          }}
        />
        <p>
          <b>Description :</b>
        </p>
        <input
          type="text"
          name="description"
          onBlur={(e) => {
            HandleChange(e.target);
          }}
        />
        <p>
          <b>Skillsets :</b>
        </p>
        <input type="text" id="Skill" />
        <button className="SkillAdd" onClick={SkillHandle}>
          <b>+</b>
        </button>
        <div className="Skillset">
          {tempData.skillset.length > 0
            ? tempData.skillset.map((ele, idx) => {
                return <ul id={idx}>{ele}</ul>;
              })
            : null}
        </div>
        <button onClick={UpdateBasic}>Update</button>
      </div>
      <div className="ImpUpdates">
        <h2>Update username and password</h2>
        <p>
          <b>User Name :</b>
        </p>
        <input
          type="text"
          name="name"
          id="NewUname"
          onBlur={(e) => {
            HandleChange(e.target);
          }}
        />
        <p>
          <b>New Password :</b>
        </p>
        <input type="text" name="name" id="NewPassword" />
        <p>
          <b>Re-Enter New Password :</b>
        </p>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            CheckNewPassword(e.target);
          }}
        />
        <br />
        <span>{error ? null : <p>Password does not match!</p>}</span>
        <button onClick={UpdateAndLogoff}>Update and Logoff</button>
        <br />
        {/* <p>Changing username, password will redirect to login page !!</p> */}
      </div>
    </div>
  );
};

export default EditProfile;
