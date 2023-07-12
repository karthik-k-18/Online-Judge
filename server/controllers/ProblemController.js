import fs from "fs-extra";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { Problem } from "../models/models.js";

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
    // const problem = await Problem.findById(req.params.id);
    //plain text as response body
    const { code } = req.body;
    const id = uuidv4();
    const inputFilename = `${id}.cpp`;
    const inputFilepath = path.join(process.cwd(),"submissions", inputFilename);
    const outputFilename = `${id}.exe`;
    const outputFilepath = path.join(process.cwd(),"submissions", outputFilename);
    await fs.writeFile(inputFilepath, code);
    exec(`g++ ${inputFilepath} -o ${outputFilepath}`, (err, stdout, stderr) => {
      if (err || stderr) {
        res.status(500).json({ message: "Compilation error!" });
      }
      exec(`${outputFilepath}`, (err, stdout, stderr) => {
        if (err || stderr) {
          res.status(500).json({ message: "Runtime error!" });
        }
        res.status(200).json({ message: stdout });
      });
    });
  } catch (err) {
    res.status(404).json({ message: "Problem not found!" });
  }
};

export { getProblems, getProblem, submitProblem };
