import { exec, spawn } from "child_process";

const compile = async (inputfilepath, executablefilepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${inputfilepath} -o ${executablefilepath}`,
      (err, stdout, stderr) => {
        if (err || stderr) {
          reject("Compilation error!");
        }
        resolve("Compiled successfully!");
      }
    );
  });
};

const run = async (executablefilepath, input, output) => {
  return new Promise((resolve, reject) => {
    const process = spawn("docker", [
      "run",
      "--rm", // Remove container after exit.
      "-i",
      "test",
      "sh", // Use shell inside the container to execute the command.
      "-c",
      executablefilepath, // Pass the command to be executed as an argument.
    ]);
    process.stdin.write(input);
    process.stdin.end();
    process.stdout.on("data", (data) => {
      data = data.toString().trim();
      if (data.toString() === output) {
        resolve("Accepted");
      } else {
        resolve("Wrong Answer");
      }
    });
    process.stderr.on("data", (data) => {
      reject("Runtime error!");
    });
  });
};



export { compile, run };


// const run = async (executablefilepath, input, output) => {
//   return new Promise((resolve, reject) => {
//     const process = spawn("docker", [
//       "run",
//       // "--rm", // remove container after exit.
//       "-i",
//       "test",
//     ]);
//     const child = spawn(executablefilepath);
//     child.stdin.write(input);
//     child.stdin.end();
//     child.stdout.on("data", (data) => {
//       data = data.toString().trim();
//       if (data.toString() === output) {
//         resolve("Accepted");
//       } else {
//         resolve("Wrong Answer");
//       }
//     });
//     child.stderr.on("data", (data) => {
//       reject("Runtime error!");
//     });
//   });
// };

