import express from "express";
import dotenv from "dotenv";
import router from "./router";
import ip from "ip";
import colors from "colors/safe";
import checkEnvVariable from "./utils/checkEnvVariable";
import cors from "cors";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// configure environment variables
dotenv.config();

async function main() {
  // check environment variables
  const envVariableNames = ["PORT", "DATABASE_URL", "MERCADOPAGO_ACCESS_TOKEN"];
  const envVariableRegex = [
    new RegExp("^[0-9]{1,5}$"),
    // postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public
    new RegExp(
      // "^postgresql://[a-zA-Z0-9]+:[a-zA-Z0-9]+@[a-zA-Z0-9\.]+:[0-9]{1,5}/[a-zA-Z0-9]+"
      ".+" // TODO: improve regex
    ),
    // TEST-1092659736125213-897621-ef897668768ed7f6c687ed9f687e6dc8-189237645
    new RegExp("^[A-Z]+-[0-9]{16}-[0-9]{6}-[a-zA-Z0-9]{32}-[0-9]{1,10}$"),
  ];

  envVariableNames.forEach((name, index) => {
    checkEnvVariable(name, envVariableRegex[index]);
  });

  // create express app
  const app = express();

  // configure express app
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(router);
  app.use(cors());

  // // check if prismas is connected to database
  // try {
  //   await prisma.$connect();
  //   console.log(colors.green("Prisma is connected to database"));
  // } catch (error) {
  //   console.log(colors.red("Prisma is not connected to database"));
  //   console.log(error);
  //   process.exit(1);
  // }

  // start express app
  app.listen(process.env.PORT, () => {
    console.log(
      colors.yellow(`Server started on port`) +
        colors.blue(` ${process.env.PORT}`) +
        colors.red(` (http://${ip.address()}:${process.env.PORT})`)
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
