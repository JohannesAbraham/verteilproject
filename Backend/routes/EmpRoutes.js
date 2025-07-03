const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const moment = require('moment');
const multer = require("multer");
const path = require("path");

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

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, email, department, joinDate, birthDate } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const image = `/uploads/employees/${req.file.filename}`; // relative path

    const newEmployee = new Employee({
      name,
      email,
      department,
      joinDate,
      birthDate,
      image,
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
    date: moment(emp.birthDate).format("MMM D") // optional
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

module.exports = router;
