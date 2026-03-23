// SQL

const connection = require ('../config/db');

//get all list
exports.getAllList = (req,res)=>{
    connection.query('SELECT * FROM patients', (err,rows,fields) => {
        if (err) throw err;
            res.json(rows);
    });
};

//Search a user by Id
exports.getAppointmentById=(req,res)=> {
    const id = req.params.id;
    connection.query('SELECT * FROM patients WHERE id=?', [id], (err, rows,fields)=> {
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json
            ({message:'User not found'});
    });
}


//Add new Event
//crud - create
exports.addAppointment=(req,res)=> {
    const {fullname, age, contact_number, medical_condition} = req.body;
    connection.query('INSERT INTO patients (fullname, age, contact_number, medical_condition) VALUES (?,?,?,?)',[fullname, age, contact_number, medical_condition], (err,result)=> {
        if(err) throw err;
        res.json({message:'Event Added Successfully', userId:
        result.insertId});
    })
}

//Update Event
//crud -update
exports.updateAppointment=(req,res)=>{
    const {id, fullname, age, contact_number, medical_condition} = req.body;
    connection.query('UPDATE patients SET fullname=?, age=?, contact_number=?, medical_condition=? WHERE id=?', [fullname, age, contact_number, medical_condition, id], (err,result) => {
        if (err) throw err;
        if(result.affectedRows>0)
            res.json({message:'Event Update Succesfully'});
        else
            res.status(404).json({message:'Event not found'});
    });
};

//delete Event
//crud-delete
exports.deleteAppointment=(req,res)=>{
    const {id}  = req.body;
    
    connection.query('DELETE FROM patients WHERE id=?', [id], (err,result) => {
        if (err) throw err;
        if(result.affectedRows>0)
            res.json({message:'Event Deleted Succesfully'});
        else
            res.status(404).json({message:'User not found'});
    });
};