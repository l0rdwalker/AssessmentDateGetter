import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import SimpleForm from './simpleForm/form';
import ComplexForm from './complexForm/form';
import Table from './table/table'
import Download from './downloadBtn/download'
import './form.css';

function Form(props) {
  const [results, setResults] = useState([]);
  const [displaySimple, setDisplaySimple] = useState(true);
  const [error, setError] = useState("")

  const configResults = (data) => {
    data = JSON.parse(data);
    if (Object.keys(data).length === 0) {
      setDisplaySimple(false);
    } else {
      if (data.hasOwnProperty("status")) {
        setError("Either the subject does not exit, not running in your select semester or has no valid assessment data we can access.")
      } else {
        setError("");
        var courseName = data[0]['code'][0];
        var found = true;
        
        for (var i = 0; i < results.length; i++) {
          if (results[i][0] == courseName) {
            found = false;
          }
        }
  
        if (found) {
          var table = []
          table.push(data[0]['code'][0]);
          
          for (let key in data[0]["assignments"]) {
            var row = [];
            var element = data[0]["assignments"][key];
            row.push([element['name'],element['weight'],element['length'],element['date']]);
            table.push(row);
          }
  
          table = [table].concat(results);
          setDisplaySimple(true);
          setResults(table);
        }
      }
    }
  }
  
  return (
    <div className='form_wrapper'>
      {error && <p>{error}</p>}
      {displaySimple ? (
        <SimpleForm configResults={configResults} />
      ) : (
        <ComplexForm configResults={configResults} />
      )}

      <div className='results'>
        {results.map((item, index) => (

          <Table name={item[0]} data={item} />
          
        ))}
      </div>

      <Download data={results} />
      
    </div>
  );
}

export default Form;