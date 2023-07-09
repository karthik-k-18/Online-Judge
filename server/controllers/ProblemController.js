import {Problem} from '../models/models.js';


//@desc    Get all problems
const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.status(200).json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//@desc    Get a problem
const getProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        res.status(200).json(problem);
    }
    catch (err) {
        res.status(404).json({ message: "Problem not found!" });
    }
}


export { getProblems, getProblem };