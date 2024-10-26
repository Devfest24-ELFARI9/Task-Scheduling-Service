const express = require('express');
const bodyParser = require('body-parser');
const { consumeMessages } = require('./utils/rabbitMQUtils');
const taskRouter = require('./routes/taskRouter');
const { handleKpiAlert } = require('./services/taskService');
const connectDB = require('./config/mongodb');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

const QUEUE_NAME = 'kpi_alert_queue';


const PORT = process.env.PORT || 3030;

connectDB().then(() => {
    app.listen(PORT, () => {
    consumeMessages(QUEUE_NAME, handleKpiAlert);
    console.log(`Server is running on port ${PORT}`);
  });
});