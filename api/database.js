const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/subjects', { useNewUrlParser: true }); 
const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once('open', function() { 
  console.log('MongoDB database connected!');
});

const courseSchema = new mongoose.Schema({
    code: [{
      type: String,
      required: true
    }],
    assignments: [{
      name: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      length: {
        type: String,
        required: true
      },
      learningOutcomes: {
        type: String,
        required: true
      }
    }]
  });

const MyModel = mongoose.model('MyModel', courseSchema, 'units');

function addUnit(document) {
    const myData = new MyModel(document);
    myData.save();
}

async function getUnit(unitName) {
    try {
        const result = await MyModel.find({ code: unitName });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    addUnit,
    getUnit,
};