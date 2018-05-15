const express = require('express');
const path = require('path');

const app = express()
var port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const routes = {
  student : require('./routes/api/students'),
  teacher : require('./routes/api/teachers'),
  subject : require('./routes/api/subjects')
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/students', routes.student);
app.use('/teachers', routes.teacher);
app.use('/subjects', routes.subject);
app.listen(port);