import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './download';

function Download(props) {
  const data = props.data;

  const createIculkFile = () => {
    var event = "BEGIN:VCALENDAR\n";
    event = event + "VERSION:2.0\n";
    event = event + "PRODID:-//Your Organization//Your App//EN\n";
    event = event + "CALSCALE:GREGORIAN\n";
    event = event + "METHOD:PUBLISH\n";

    for (var x = 0; x < data.length; x++) {
      var subject = data[x][0];
      for (var i = 1; i < data[x].length; i++) {
        var subject = data[x][i][0];
        var startDate = subject[3];
        console.log(event);
        var endDate = new Date(subject[3]);
        endDate.setHours(endDate.getHours()+1);
        endDate = endDate.toISOString();
        var id = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        id = id.toString();

        event = event + 'BEGIN:VEVENT\n';
        event = event + 'DTSTART:'+startDate+'\n';
        event = event + 'DTEND:'+endDate+'\n';
        event = event + 'SUMMARY:'+subject[0]+'\n';
        event = event + 'DESCRIPTION:'+subject[2]+' weight:'+subject[1]+'\n';
        event = event + 'LOCATION:n/a \n';
        event = event + 'UID:'+id+'\n';
        event = event + 'END:VEVENT \n';
      }
    }

    event = event + "END:VCALENDAR";

    return event;
  }

  const handleDownload = () => {
    const fileContent = createIculkFile();
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.txt'; 

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  }
  
  return (
    <button onClick={handleDownload}>
      Download File
    </button>
  );
}

export default Download;