import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
});

const adminSchema = new Schema({
  name: String,
  password: String,
});

const problemSchema = new Schema({
  name: String,
  description: String,
  tags: Object,
});

const testCaseSchema = new Schema({
  input: String,
  output: String,
  problem: { type: Schema.Types.ObjectId, ref: "Problem" },
});

const submissionSchema = new Schema({
  verdict: String,
  submission_time: { type: Date, default: Date.now },
  problem: { type: Schema.Types.ObjectId, ref: "Problem" },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Problem = mongoose.model("Problem", problemSchema);
const TestCase = mongoose.model("TestCase", testCaseSchema);
const Submission = mongoose.model("Submission", submissionSchema);

export { User, Admin, Problem, TestCase, Submission };
