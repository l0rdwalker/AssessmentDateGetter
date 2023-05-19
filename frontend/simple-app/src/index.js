import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Form from "./FormWrapper/form"

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("epic");


root.render(
  <React.StrictMode>
    <div>
      <Form />
    </div>
  </React.StrictMode>
);

