import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import fs from "fs";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "./utils/swaggerOption";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static("public"));

const rootRoute: string[] = fs.readdirSync("./src/routes");
rootRoute
  .filter((file: string) => {
    return (
      /.(js|ts)$/.test(file) ||
      fs.lstatSync(__dirname + "/routes/" + file).isDirectory()
    );
  })
  .forEach((file: string) => {
    file = file.replace(/\.[^.]*$/, "");
    try {
      const route = require(__dirname + "/routes/" + file).default;

      //import router handler
      app.use("/" + file, route);

      console.log(
        chalk.blue("[ INFO ] ") + "Route '" + file + "' imported successfully."
      );
    } catch (e) {
      console.log(
        chalk.blue("[ INFO ] ") +
          "Skipped '" +
          file +
          "' module because containing error."
      );
    }
  });

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use((req, res) => {
  res.json({
    status: 404,
    message: "error_not_found",
  });
});

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
