import { exec, spawn } from "child_process";
import path from "path";

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


//this code is not secure as it runs the program directly on the server but also inside a isolated container
//if the program is malicious it can cause harm to the server

const run = async (executablefilepath, input, output) => {
  return new Promise((resolve, reject) => {
    const child = spawn(executablefilepath);
    child.stdin.write(input);
    child.stdin.end();
    child.stdout.on("data", (data) => {
      data = data.toString().trim();
      if (data.toString() === output) {
        resolve("Accepted");
      } else {
        resolve("Wrong Answer");
      }
    });
    child.stderr.on("data", (data) => {
      reject("Runtime error!");
    });
  });
};

export { compile, run };














































//each time we run a program we create a new container and run the program inside it
//security wise it is better than running the program directly on the server
//performance wise it is not as good as running as creating a new container each time is time consuming
// const run = async (inputFilepath, input, output) => {
//   return new Promise((resolve, reject) => {
//     const inputFile = path.basename(inputFilepath);
//     const executable= inputFile.split(".")[0]+".exe";
//     const process = spawn("docker", [
//       "run",
//       "--rm", // Remove container after exit.
//       "-i",
//       "-v",
//       `${path.resolve("submissions")}:/app/dockerSubmissions`, // Mount the host directory to the container.
//       "test", //image name
//       "sh", // Use shell inside the container to execute the command.
//       "-c",
//       `g++ /app/dockerSubmissions/${inputFile} -o /app/dockerSubmissions/${executable} && /app/dockerSubmissions/${executable}`, // Compile and run the executable inside the container.
//     ]);
//     process.stdin.write(input);
//     process.stdin.end();
//     process.stdout.on("data", (data) => {
//       data = data.toString().trim();
//       if (data.toString() === output) {
//         resolve("Accepted");
//       } else {
//         resolve("Wrong Answer");
//       }
//     });
//     process.stderr.on("data", (data) => {
//       reject("Runtime error!");
//     });
//   });
// };
