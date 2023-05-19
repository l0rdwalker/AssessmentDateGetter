import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './complexForm.css';

const ComplexForm = ({ configResults }) => {

  const [CourseName, setCourseName] = useState("");
  const [Semester, setSemester] = useState("");
  const [Location, setLocation] = useState("");
  const [results, setResults] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/ripPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseCode: CourseName, semester: Semester, location:Location}),
    });
  
    const data = await response.json();
    configResults(JSON.stringify(data));
  }

  const updateCourse = (event) => {
    setCourseName(event.target.value);
  }

  const updateSemester = (event) => {
    setSemester(event.target.value);
  }

  const updateLocation = (event) => {
    setLocation(event.target.value);
  }

  return (
    <div className='complex_form'>
        <p>Could not find course details, please provide further details.</p>
        <label for="search">CourseCode:</label>
        <input type="text" id="search" name="search" placeholder="info1111" onChange={updateCourse}/>

        <label for="Semester">Semester:</label>
        <select id="Semester" name="Semester" onChange={updateSemester}>
          <option value=""></option>
          <option value="S1C">Semester 1</option>
          <option value="S2C">Semester 2</option>
        </select>

        <label for="Location">Location:</label>
        <select id="Location" name="Location" onChange={updateLocation}>
          <option value=""></option>
          <option value="CC">On campus</option>
          <option value="RE">Remote</option>
        </select>

        <button className='submit_btn' onClick={handleSubmit} type="submit">Search</button>
    </div>
  );
}

export default ComplexForm;
