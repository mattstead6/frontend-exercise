import React, { useEffect, useState } from "react";
import './App.css'


function Webpage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: ''
  })
  const [occupations, setOccupations] = useState([])
  const [states, setStates] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('https://frontend-take-home.fetchrewards.com/form')
        const respJSON = await resp.json()
        setOccupations(respJSON.occupations);
        setStates(respJSON.states);
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    let errorString = ''
    let nameFilledOut = formData.name !== ''
    let emailFilledOut = formData.email !== ''
    let passwordFilledOut = formData.password !== ''
    let occupationFilledOut = formData.occupation !== ''
    let stateFilledOut = formData.state !== ''
    if (!nameFilledOut) {
      errorString += 'Fill out Name please!'
    }
    if (!emailFilledOut) {
      errorString += `\nDon't forget your email!`
    }
    if (!passwordFilledOut) {
      errorString += `\nYou're going to need a password, silly!`
    }
    if (!occupationFilledOut) {
      errorString += `\nWhat's your occupation?`
    }
    if (!stateFilledOut) {
      errorString += `\nWhat state are you in?`
    }
    if (errorString !== '') {
      alert(errorString)
    }
    fetch('https://frontend-take-home.fetchrewards.com/form', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => console.log(user))
          alert('you have passed the test and are moving onto the next round! ;)')
        }
        else {
          res.json().then(res => console.log(res.error)
          )
        }
      })
      .catch(error => console.log(error.message));
  }

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const occupation = occupations.map((occupation) => {
    return (
      <option key={occupation}>{occupation}</option>
    )
  })

  const state = states.map((state) => {
    return (
      <option key={state.abbreviation}>{state.name}</option>
    )
  })

  return (
    <>
      <h2>Frontend Take-Home Exercise</h2>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className="form-content">
          <input name='name' value={formData.name} type='text' placeholder='Full Name' onChange={handleFormChange} />
        </div>
        <div className="form-content">
          <input name='email' value={formData.email} type='Email' placeholder='Email' onChange={handleFormChange} />
        </div>
        <div className="form-content">
          <input name='password' value={formData.password} type='Password' placeholder='Password' onChange={handleFormChange} />
        </div>
        <div className="form-content">
          <select
            name='occupation' value={formData.occupation} onChange={handleFormChange}>
            <option>Occupation</option>
            {occupation}
          </select>
        </div>
        <div className="form-content">
          <select
            name='state' value={formData.state} onChange={handleFormChange}>
            <option>State</option>
            {state}
          </select>
        </div>
        <button className="submit-bttn" type="submit">Submit</button>
      </form>
    </>
  );
}
export default Webpage;
