import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { Problem, TestCase, Submission,User} from "../models/models.js";
import { compile, run } from "../utils/cpp_compiler.js";

//@desc    Get all problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    problems.sort((a, b) => a.id - b.id);
    if (req.user === undefined) {
      return res.status(200).json(problems);
    } else {
      const submissions = req.user.submissions;
      console.log(submissions);
      if (submissions) {
        problems.forEach((problem) => {
          //check if the user has submitted the problem and has "AC" verdict
          const submission = submissions.find(
            (submission) =>
              submission.problem == problem._id && submission.verdict == "AC"
          );
          if (submission) {
            problem.status = "AC";
          } else {
            problem.status = "NA";
          }
        });
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
    compile(inputFilepath, executableFilepath)
      .then((message) => {
        run(executableFilepath, testCase.input, testCase.output)
          .then((result) => {
            if (result === "AC") {
              verdict = "AC";
              res.status(200).json({ message: "Accepted!" });
            } else {
              verdict = "WA";
              res.status(200).json({ message: "Wrong answer!" });
            }
          })
          .catch((err) => {
            verdict = "RE";
            res.status(404).json({ message: "Runtime error!" });
          });
      })
      .catch((err) => {
        verdict = "CE";
        res.status(404).json({ message: "Compilation error!" });
      })
      .finally(async () => {
        // fs.unlink(inputFilepath);
        // fs.unlink(executableFilepath);
        const submission = new Submission({
          problem: problem._id,
          verdict: verdict,
          submission_time: Date.now(),
          code: code,
        });
        submission.save();
        //add the submission to the user
        const user = await User.findOne({ email: req.user });
        // console.log(req.user._id)
        console.log(user);
        if(user.submissions===undefined) user.submissions=[];
        user.submissions.push(submission._id);
        user.save();
      });

    //delete the files
  } catch (err) {
    res.status(404).json({ message: "Problem not found!" });
  }
};

export { getProblems, getProblem, submitProblem };
