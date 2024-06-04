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
  let overallRating = (req.body.teaching*35 + req.body.evaluation*35 + req.body.internal*20 + req.body.behavior*10) / 100

  let OVERALL = "";
  if(overallRating > 2 && overallRating <4){
    OVERALL = "AVERAGE";
  } else if (overallRating <= 2){
    OVERALL = "BAD";
  } else if (overallRating >=4) {
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


// Helper function to calculate average (consider using a separate module or utility)
function calculateAverage(existingValue, newValue) {
  let calculatedValue = (existingValue + parseInt(newValue, 10)) / 2;
  return Math.round(calculatedValue * 10) / 10;
}

// Helper function to calculate overall rating (consider refining the weighting logic)
function calculateOverallRating(professor) {
  const weightedSum = (parseInt(professor.teaching, 10) * 35) + (parseInt(professor.evaluation,10) * 35) +
                      (parseInt(professor.internals, 10) * 20) + (parseInt(professor.behavior,10) * 10);
  const overallRating = weightedSum / 100;

  let overall;
  if (overallRating > 2 && overallRating < 4) {
    overall = "AVERAGE";
  } else if (overallRating <= 2) {
    overall = "BAD";
  } else if (overallRating >= 4) {
    overall = "GOOD";
  }
  return overall;
}

const updateProfessor = async (req, res) => {
  // Input validation
  if (!req.body.name) {
    return res.status(400).json({ message: "Professor name is required" });
  }

  try {
    // Find professor with name (handle potential Mongoose errors)
    const professor = await Professor.findOne({ name: req.body.name });
    if (!professor) {
      return res.status(404).json({ message: `No professor found named ${req.body.name}` });
    }

    // Update professor's review data
    professor.numberOfReviews += 1;
    professor.teaching = calculateAverage(professor.teaching, req.body.teaching);
    professor.evaluation = calculateAverage(professor.evaluation, req.body.evaluation);
    professor.behavior = calculateAverage(professor.behavior, req.body.behavior);
    professor.internals = calculateAverage(professor.internals, req.body.internals);
    professor.class_average = calculateAverage(professor.class_average, req.body.class_average);

    // professor.numberOfReviews += 1;
    // professor.teaching = req.body.teaching
    // professor.evaluation = req.body.evaluation
    // professor.behavior = req.body.behavior
    // professor.internals = req.body.internals
    // professor.class_average = req.body.class_average

    // Calculate and update overall rating
    professor.overall = calculateOverallRating(professor);

    // Save updated professor (handle potential Mongoose errors)
    const savedProfessor = await professor.save();
    res.status(201).json(savedProfessor);
    console.log('Professor saved:', savedProfessor);
  } catch (error) {
    console.error('Error saving professor:', error);
    res.status(500).json({ message: 'Internal server error' }); // Handle errors
  }
};




module.exports = {createProfessor, getProfessorByName, getAllProfessors, updateProfessor}
