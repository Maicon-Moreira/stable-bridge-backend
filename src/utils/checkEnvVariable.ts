import fs from "fs";

function checkEnvVariable(name: string, envVariableRegex: RegExp) {
  // check if variable exists in process.env
  // check if variable matches regex
  // and also in the .env.example file
  if (process.env[name] === undefined) {
    console.error(`Environment variable ${name} is not defined`);
    process.exit(1);
  }

  if (!process.env[name]!.match(envVariableRegex)) {
    console.error(
      `Environment
      variable ${name} does not match regex ${envVariableRegex}`
    );
    console.log(`Value: ${process.env[name]}`);

    process.exit(1);
  }

  const envExample = fs.readFileSync(".env.example", "utf8");
  if (envExample.indexOf(name) === -1) {
    console.error(
      `Environment variable ${name} is not defined in .env.example`
    );
    process.exit(1);
  }
}

export default checkEnvVariable;
