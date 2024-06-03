const mongoose = require('mongoose');
const Professor = require('../models/Professor'); // Adjust the path as needed

//getprofessor api
const getProfessorByName = async (req, res) => {
    try {
      if (!req.params.name) return res.status(400).json({"message": "Name parameter is required."})
      const professor = await Professor.findOne({ name: req.params.name });
      if (professor) {
        console.log('Professor found:', professor);
        return res.json(professor)
      } else {
        console.log('No professor found with that name.');
        return res.json({"message":"No professor found with that name"})
      }
    } catch (error) {
      console.error('Error fetching professor:', error);
      return res.json({"error": error})
    }
  };

  // getallprofessor api
  const getAllProfessors = async (req, res) => {
    try {
      const professors = await Professor.find();
      if (!professors[0]) return res.status(200).json({"message" : "Professor list is empty"});
      console.log('All Professors:', professors);
      return res.json(professors);
    } catch (error) {
      console.error('Error fetching professors:', error);
      return res.json({"error": error})
    }
  };
  
  

// Example of creating a new professor document
const createProfessor = async (req, res) => {
  let reqInputs = [req?.body?.name , req?.body?.teaching ,req?.body?.evaluation, req?.body?.behavior, req?.body?.internals, req?.body?.class_average]

  for (let i = 0; i<reqInputs.length; i++){
    if (!reqInputs[i]) return res.json({"error" : `Missing required field ${reqInputs[i]}`})
  }

  // Logic for new entry of professor
  let overallRating = (req.body.teaching*30 + req.body.evaluation*30 + req.body.internal*20 + req.body.behavior*20) / 5

  let OVERALL = "";
  if(overallRating > 2 && overallRating <4){
    OVERALL = "AVERAGE";
  } else if (overallRating < 2){
    OVERALL = "BAD";
  } else {
    OVERALL = "GOOD";
  }

  const newProfessor = new Professor({
    name: req.body.name,
    teaching: req.body.teaching,
    evaluation: req.body.evaluation,
    behavior: req.body.behavior,
    internals: req.body.internals,
    class_average: req.body.class_average,
    numberOfReviews: 1,
    overall : OVERALL
  });


  try {
    const savedProfessor = await newProfessor.save();
    res.status(201).json(savedProfessor);
    console.log('Professor saved:', savedProfessor);
  } catch (error) {
    console.error('Error saving professor:', error);
  }
};


// Update existing reviews
const updateProfessor = async (req, res) => {
  if (!req.body.name) return res.json({"message" : "Professor name is required"});

  const professor = await Professor.findOne({ name: req.body.name });

  if (!professor) return res.json({"message" : `No professor found named ${req.body.name}`})

  professor.numberOfReviews += 1;
  professor.teaching = (professor.teaching + req.body.teaching) / 2;
  professor.evaluation = (professor.evaluation + req.body.evaluation) / 2;
  professor.behavior = (professor.behavior + req.body.behavior) / 2;
  professor.internals = (professor.internals + req.body.internals) / 2;
  professor.class_average = (professor.class_average + req.body.class_average) / 2;
  

  let overallRating = (professor.teaching*30 + professor.evaluation*30 + professor.internal*20 + professor.behavior*20) / 5.0

  let OVERALL = "";
  if(overallRating > 2 && overallRating <4){
    OVERALL = "AVERAGE";
  } else if (overallRating < 2){
    OVERALL = "BAD";
  } else {
    OVERALL = "GOOD";
  }

  professor.overall = OVERALL;
  console.log(professor)
  try {
    const savedProfessor = await professor.save();
    res.status(201).json(savedProfessor);
    console.log('Professor saved:', savedProfessor);
  } catch (error) {
    console.error('Error saving professor:', error);
  }
}


module.exports = {createProfessor, getProfessorByName, getAllProfessors, updateProfessor}
