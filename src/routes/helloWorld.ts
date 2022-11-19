import express from "express";
import rateLimit from "express-rate-limit";
import handleInternalServerError from "../utils/handleInternalServerError";
import validateBodyParams from "../utils/validateBodyParams";

const helloWorldRouter = express.Router();

// return simple hello world message

helloWorldRouter.get(
  "/",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
  }),
  async (req: express.Request, res: express.Response) => {
    try {
      const { forceError } = validateBodyParams(req, res, [
        { paramName: "forceError", paramType: "boolean", optional: true },
      ]);
      if (forceError) {
        throw new Error("Forced error");
      }
      return res.json({ message: "Hello World!" });
    } catch (error: any) {
      return handleInternalServerError(error, req, res);
    }
  }
);

export default helloWorldRouter;
