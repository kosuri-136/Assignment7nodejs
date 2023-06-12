const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
const studentDetails = require('./InitialData.js');

app.get('/api/student', (req, res) => {
  res.json(studentDetails);
});

app.get('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = studentDetails.find(student => student.id === id);
  
    if (student) 
    {
      res.json(student);
    } else 
    {
      res.status(404).send('Student details are  not found');
    }
  });
  
  app.post('/api/student', (req, res) => {
    const { name, currentClass, division } = req.body;
  
    if (name && currentClass && division) {
      const newId = studentDetails.length > 0 ? studentDetails[studentDetails.length - 1].id + 1 : 1;
      const newStudent = {
        id: newId,
        name,
        currentClass,
        division
      };
  
      studentDetails.push(newStudent);
      res.json({ id: newId });
    } else {
      res.status(400).send('Incomplete student details');
    }
  });
  
  app.put('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const student = studentDetails.find(student => student.id === id);
  
    if (student) {
      if (name) {
        student.name = name;
        res.send('Student details updated successfully');
      } else {
        res.status(400).send('Invalid update');
      }
    } else {
      res.status(400).send('Invalid student ID');
    }
  });
  
  app.delete('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = studentDetails.findIndex(student => student.id === id);
  
    if (index !== -1) {
        studentDetails.splice(index, 1);
      res.send('Student record deleted successfully');
    } else {
      res.status(404).send('Student not found');
    }
  });
// Rest of the code...


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   