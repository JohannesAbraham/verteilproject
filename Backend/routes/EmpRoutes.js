const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Admin = require('../models/Admin');
const moment = require('moment');
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/employees/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // e.g. 171925144.png
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    // Delete image from filesystem
    if (employee.image) {
      const imagePath = path.join(__dirname, "..", employee.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err.message);
        }
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update Employee
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, email, department, joinDate, birthDate, displayBirthday } = req.body;

    const updatedData = {
      name,
      email,
      department,
      joinDate,
      birthDate,
      displayBirthday,
    };

    if (req.file) {
      updatedData.image = `/uploads/employees/${req.file.filename}`;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated", employee: updatedEmployee });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, email, department, joinDate, birthDate, displayBirthday } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const image = `/uploads/employees/${req.file.filename}`; // relative path
    if (req.body.isAdmin === 'yes') {
      await Admin.findOneAndUpdate(
        { email: req.body.email },
        { email: req.body.email },
        { upsert: true, new: true }
      );
    }
    
    const newEmployee = new Employee({
      name,
      email,
      department,
      joinDate,
      birthDate,
      image,
      displayBirthday,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get New Joiners (Last 30 days)
router.get('/new-joiners', async (req, res) => {
  const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
  const joiners = await Employee.find({ joinDate: { $gte: thirtyDaysAgo } });
  res.json(joiners);
});

// Get Birthdays This Week
// Get Today's Birthdays
router.get('/birthdays', async (req, res) => {
  const employees = await Employee.find();

  const today = moment();
  const todaysBirthdays = employees.filter(emp => {
    const bday = moment(emp.birthDate);
    return bday.date() === today.date() && bday.month() === today.month();
  }).map(emp => ({
    name: emp.name,
    email: emp.email,
    department: emp.department,
    image: emp.image || null,
    date: moment(emp.birthDate).format("MMM D"),
    displayBirthday:emp.displayBirthday
  }));

  res.json(todaysBirthdays);
});

// Get Work Anniversaries
router.get('/anniversaries', async (req, res) => {
  const employees = await Employee.find();
  const today = moment();
  const anniversaries = employees.filter(emp => {
    const joined = moment(emp.joinDate);
    return (
      joined.date() === today.date() &&
      joined.month() === today.month() &&
      today.diff(joined, 'years') >= 1
    );
  }).map(emp => ({
    ...emp._doc,
    years: today.diff(moment(emp.joinDate), 'years')
  }));
  res.json(anniversaries);
});

router.get('/all', async (req,res) => {
  try{
    const employees = await Employee.find().sort({name:1});
    res.json(employees);
  }
  catch(error){
    res.status(500).json({error:"Error fetching all employees."});
  }
})

module.exports = router;
