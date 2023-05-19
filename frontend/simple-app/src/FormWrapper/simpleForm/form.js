import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './simpleForm.css';

const SimpleForm = ({ configResults }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/getCourseData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseCode: searchTerm}),
    });
  
    const data = await response.json();
    configResults(JSON.stringify(data));
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className='simple_form'>
        <label for="search">CourseCode:</label>
        <input type="text" id="search" name="search" placeholder="info1111" onChange={handleInputChange}/>
        <button className='submit_btn' onClick={handleSubmit} type="submit">Search</button>
    </div>
  );
}

export default SimpleForm;
