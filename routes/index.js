const express = require ('express');
router = express.Router();
const appointmentControllers = require('../controllers/appointmentConrollers');

//route to get all list
router.get('/appointmentList', appointmentControllers.getAllList);

//Route to serach ID
router.get('/appointmentId/:id', appointmentControllers.getAppointmentById);

//Route to add new event
router.post('/add', appointmentControllers.addAppointment);

//Route to Update event
router.put('/update', appointmentControllers.updateAppointment);

//router delete event
router.delete('/delete', appointmentControllers.deleteAppointment);

module.exports=router;