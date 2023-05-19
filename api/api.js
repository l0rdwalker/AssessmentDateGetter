const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const { time } = require('console');
const database = require('./database');

router.use(bodyParser.json());
router.post('/plain', (req, res) => {
    console.log('POST parameters:', req.body);
    res.json({ message: 'Hello, how are you?' });
});


router.post('/classGet', (req, res) => {
    console.log('POST parameters:', req.body);
    res.json({ valid: true });
});

router.post('/ripPage', async (req, res) => {
    var courseCode = req.body['courseCode'].toLowerCase();
    var semester = req.body['semester'];
    var location = req.body['location'];
    
    var courseUrl = "https://www.sydney.edu.au/units/"+courseCode+"/2023-"+semester+"-ND-"+location;
    var response = await fetch(courseUrl);
    
    var html = await response.text();
    var outcome = await parseDocument(html, courseCode);
    var data = await generateCalenderEntry(outcome);

    var test = await database.getUnit(courseCode);

    if (outcome.length > 0) {
        await database.addUnit(data);
        data = await database.getUnit(courseCode); 
        res.json(data);
    } else {
        res.json({status:false});
    }
});

router.post('/getCourseData', async (req, res) => {
    try {
      const courseCode = req.body['courseCode'];
      const data = await database.getUnit(courseCode);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

function parseDocument(document,courseCode) {
    var htmlPage = cheerio.load(document);
    var assessmentTable = htmlPage("#assessment-table");

    var row = [];
    var table = [];

    assessmentTable.find("td").each(function(index, element) {
        var tbodyHtml = htmlPage(element);
        
        if (row.length < 5) {
            row.push(sanitisetext(tbodyHtml.text()));
        }
        if (row.length == 5) {
            table.push(row);
            row = [];
        }
    });

    table.push(courseCode);
    
    return table;
}

function sanitisetext(str) {
    str = str.replace(/\s+/g, ' ');
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.replace(/\n+/g, ' ');
    return str;
}

//Type, Description, Weight, Due, Length
const monthCodes = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
function generateCalenderEntry(listData) {
    for (var x = 0; x < listData.length-1; x++) {
        console.log(listData);
        listData[x][2] = assDue(listData[x][2]);
        listData[x][1] = assWeight(listData[x][1]);

        if (!(listData[x][2] == 'null')) {
            listData[x] = {name: listData[x][0],weight: listData[x][1], date: listData[x][2], length: listData[x][3], learningOutcomes: listData[x][4]};
        } else {
            listData.splice(x,1);
            x = x - 1;
        }
    }

    subjectName = listData[listData.length-1]
    listData.pop();
    listData = {code: subjectName, assignments: listData};

    return listData;
}

function assDue(txt) {
    txt = txt.toLowerCase();
    txt = txt.split(" ");


    for (var x = 0; x < txt.length; x++) {
        if (monthCodes.hasOwnProperty(txt[x].toLowerCase())) {
   //       19 May 2023 at 23:59
     //     7   8   9   10  11
    //     -1   0   +1   +2  +3
            day = txt[x-1];
            month = monthCodes[txt[x]];
            year = txt[x+1];
            dueTime = txt[x+3];
            fullDate = year+"-"+month+"-"+day+"T"+dueTime+":00";

            return (new Date(fullDate).toISOString());
        }
    }

    return "null";
}

function assWeight(txt) {
    txt = txt.replace("%","");
    num = parseInt(txt);
    return (num/100);
}

module.exports = router;


/*

    var data = await database.getUnit(courseCode); 
    console.log(data);
    if ((Object.keys(data).length === 0) == false) {
        res.json(data)
    } else {
        var courseUrl = "https://www.sydney.edu.au/units/"+courseCode+"/2023-"+semester+"-ND-"+location;
        var response = await fetch(courseUrl);
        var html = await response.text();
        var outcome = await parseDocument(html, courseCode);
        var data = await generateCalenderEntry(outcome);
        await database.addUnit(data);
        data = await database.getUnit(courseCode); 
        res.json(data);
    }


*/