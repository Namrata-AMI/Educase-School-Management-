const School = require("../models/school.js");
const getDistance = require('../utils/distance');


////// add school ////////////

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const newSchool = new School({ name, address, latitude, longitude });

    await newSchool.save();

    res.status(201).json({ message: 'School added successfully', id: newSchool._id });
  }
  
  catch (err) {
    res.status(500).json({ error: err.message });
  }

};



///////////////  get  school //////

exports.listSchools = async (req, res) => {

  const { latitude, longitude } = req.query;

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  try {

    const schools = await School.find();


    const sortedSchools = schools.map(school => {
      const distance = getDistance(parseFloat(latitude), parseFloat(longitude), school.latitude, school.longitude);
      return { ...school._doc, distance };
    }).sort((a, b) => a.distance - b.distance);


    res.json(sortedSchools);

  } 
  
  catch (err) {
    res.status(500).json({ error: err.message });
  }


};
