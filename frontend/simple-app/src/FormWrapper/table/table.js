import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './table.css';

function Table(props){
  
  var tableData = props.data;

  console.log(props.data);
  
  return (
    <table>
      <tr>
        <th colSpan="4">{props.name}</th>
      </tr>
      <tr>
        <th>Assignment</th>
        <th>Weight</th>
        <th>Date</th>
        <th>Length</th>
      </tr>
      {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item[0][0]}</td>
            <td>{item[0][1]}</td>
            <td>{item[0][3]}</td>
            <td>{item[0][2]}</td>
          </tr>
      ))}
    </table>
  );
}

export default Table;

