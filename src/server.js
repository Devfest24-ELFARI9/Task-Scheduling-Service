const express = require('express');
const bodyParser = require('body-parser');
const { consumeMessages } = require('./utils/rabbitMQUtils');
const taskRouter = require('./routes/taskRouter');
const { handleKpiAlert , handleForecastedAnomalies } = require('./services/taskService');
const connectDB = require('./config/mongodb');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

const KPI_ALERT_QUEUE = 'kpi_alert_queue';
const FORECAST_ANOMALIES_QUEUE = 'forecast-anomalies-queue';




const PORT = process.env.PORT || 3030;

connectDB().then(() => {
    app.listen(PORT, () => {
    consumeMessages(KPI_ALERT_QUEUE, handleKpiAlert);
    consumeMessages(FORECAST_ANOMALIES_QUEUE, handleForecastedAnomalies);
    console.log(`Server is running on port ${PORT}`);
  });
});