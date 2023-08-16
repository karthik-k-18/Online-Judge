import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { Problem, TestCase, Submission, User } from "../models/models.js";
import { compile, run } from "../utils/cpp_compiler.js";

//@desc    Get all problems
const getProblems = async (req, res) => {
  try {
    // console.log(req.user);
    const problems = await Problem.find({});
    problems.sort((a, b) => a.id - b.id);
    if (req.user === undefined) {
      return res.status(200).json(problems);
    } else {
      const user = await User.findOne({ email: req.user });
      const allSubmissions = await Submission.find({}); //all submissions by all users
      const submissions = user.submissions;
      // console.log(submissions);
      if (submissions.length > 0) {
        let updatedProblems = [];
        problems.forEach((problem) => {
          // console.log("problem",problem.id,problem._id);
          let flag=false;
          for(let i=0;i<submissions.length;i++){
            let userSubmission= allSubmissions.find((submission)=>submission._id.toString()===submissions[i].toString());
            if(userSubmission.problem.toString()===problem._id.toString() && userSubmission.verdict=='AC'){
              updatedProblems.push({...problem._doc,status:"AC"});
              flag=true;
              break;
            }
          }
          if(!flag){
            updatedProblems.push({...problem._doc,status:"NA"});
          }
        });
        // console.log(updatedProblems);
        return res.status(200).json(updatedProblems);
      }
      return res.status(200).json(problems);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//@desc    Get a problem
const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.id });
    res.status(200).json(problem);
  } catch (err) {
    res.status(404).json({ message: "Problem not found!" });
  }
};

const submitProblem = async (req, res) => {
  try {
    // console.log(req.body);
    const problem = await Problem.findOne({ id: req.params.id });
    const testCase = await TestCase.findOne({ problem: problem._id });
    const { code } = req.body;
    const id = uuidv4();
    const inputFilepath = path.join(process.cwd(), "submissions", `${id}.cpp`);
    const executableFilepath = path.join(
      process.cwd(),
      "submissions",
      `${id}.exe`
    );
    await fs.writeFile(inputFilepath, code);
    let verdict = undefined;
    try {
      console.log("compiling");
      await compile(inputFilepath, executableFilepath);
      console.log("compiled");
      try{
        const result = await run(executableFilepath,testCase.input,testCase.output);
        if (result === "AC") {
          verdict = "AC";
          res.status(200).json({ message: "Accepted!" });
        } else {
          verdict = "WA";
          res.status(200).json({message: "Wrong answer!"});
        }
      }catch(err){
        verdict = "RE";
        res.status(404).json({ message: "Runtime error!" });
      }
    } catch (err) {
      verdict = "CE";
      res.status(404).json({ message: "Compilation error!" });
    } finally {
      // fs.unlink(inputFilepath);
      // fs.unlink(executableFilepath);
      console.log(verdict);
      const submission = new Submission({
        problem: problem._id,
        verdict: verdict,
        submission_time: Date.now(),
        code: code,
      });
      submission.save();

      //add the submission to the user
      const user = await User.findOne({ email: req.user });
      if (user.submissions === undefined) user.submissions = [];
      user.submissions.push(submission._id);
      user.save();
    }
    //delete the files
  } catch (err) {
    res.status(404).json({ message: "Problem not found!" });
  }
};

export { getProblems, getProblem, submitProblem };
