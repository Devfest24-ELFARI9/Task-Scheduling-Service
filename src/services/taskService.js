// services/taskService.js
const { sendMessage } = require('../utils/rabbitMQUtils');
const Task = require('../models/task');

const taskMapping = {
    'Stamping_Press_Efficiency': { title: 'Inspect Stamping Press for Optimal Efficiency', team: 'Stamping Operations Team' },
    'Welding_Robot_Efficiency': { title: 'Check Welding Robot Alignment and Speed', team: 'Welding Maintenance Team' },
    'CNC_Machine_Utilization': { title: 'Review CNC Machine Scheduling and Load', team: 'Machining Operations Team' },
    'Painting_Robot_Performance': { title: 'Assess Painting Robot Consistency and Coverage', team: 'Painting Maintenance Team' },
    'Assembly_Line_Speed': { title: 'Evaluate Assembly Line for Bottlenecks', team: 'Assembly Line Operations' },
    'Quality_Control_Defect_Rate': { title: 'Monitor Quality Control for High Defects', team: 'Quality Inspection Team' },
    'Material_Waste_Percentage': { title: 'Reduce Material Waste in Production', team: 'Waste Management Team' },
    'Machine_Downtime': { title: 'Log and Minimize Machine Downtime', team: 'Machine Operators and Maintenance' },
    'Operator_Efficiency': { title: 'Review Operator Task Efficiency', team: 'Production Supervisors' },
    'Inventory_Turnover_Rate': { title: 'Analyze Inventory for Turnover Delays', team: 'Inventory Management' },
    'Production_Yield_Rate': { title: 'Increase Production Yield Through Adjustments', team: 'Production Yield Team' },
    'Maintenance_Cost_per_Unit': { title: 'Control Maintenance Costs per Production Unit', team: 'Cost Control Team' },
    'Energy_Consumption_per_Unit': { title: 'Reduce Energy Use per Product', team: 'Energy Efficiency Team' }
};

const handleKpiAlert = async (message) => {
  const { KPI_Name, KPI_Value, Timestamp } = JSON.parse(message);
  console.log("the alert message received",message);
  if (taskMapping[KPI_Name]) {
    const { title, team } = taskMapping[KPI_Name];
    const task = await scheduleTask(title, team, new Date());
    console.log(`Scheduled task: ${task.title} for ${task.team}`);
    await sendMessage('task_queue', JSON.stringify(task));
  }
};

const scheduleTask = async (title, team, date) => {
  const task = new Task({ title, team, date });
  await task.save();
  return task;
};

module.exports = { handleKpiAlert, scheduleTask };