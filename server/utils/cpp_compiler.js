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


const run = async (inputFilepath, input, output) => {
  return new Promise((resolve, reject) => {
    const inputFile = path.basename(inputFilepath);
    const executable= inputFile.split(".")[0]+".exe";
    const process = spawn("docker", [
      "run",
      // "--rm", // Remove container after exit.
      "-i",
      "-v",
      `${path.resolve("submissions")}:/app/dockerSubmissions`, // Mount the host directory to the container.
      "test",
      "sh", // Use shell inside the container to execute the command.
      "-c",
      `g++ /app/dockerSubmissions/${inputFile} -o /app/dockerSubmissions/${executable} && /app/dockerSubmissions/${executable}`, // Compile and run the executable inside the container.
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
