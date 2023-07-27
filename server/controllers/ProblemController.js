import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { Problem,TestCase } from "../models/models.js";
import { compile,run } from "../utils/cpp_compiler.js";

//@desc    Get all problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//@desc    Get a problem
const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    res.status(200).json(problem);
  } catch (err) {
    res.status(404).json({ message: "Problem not found!" });
  }
};

const submitProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    const testCase= await TestCase.findOne({problem:problem._id});
    const { code } = req.body;
    const id = uuidv4();
    const inputFilepath = path.join(process.cwd(),"submissions", `${id}.cpp`);
    const executableFilepath = path.join(process.cwd(),"submissions", `${id}.exe`);
    await fs.writeFile(inputFilepath, code);
    compile(inputFilepath, executableFilepath).then((message) => {
      run(executableFilepath, testCase.input, testCase.output).then(
        (verdict) => {
          res.status(200).json({  verdict });
        }
      ).catch((err) => {
        res.status(404).json({ message: "Runtime error!" });
      }
      );
    }).catch((err) => {
      res.status(404).json({ message: "Compilation error!" });
    });
    //delete the files
  } catch (err) {
    res.status(404).json({ message: "Problem not found!" });
  }
};

export { getProblems, getProblem, submitProblem };
