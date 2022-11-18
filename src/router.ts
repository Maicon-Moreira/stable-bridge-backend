import express from "express";
import helloWorldRouter from "./routes/helloWorld";
import pixRouter from "./routes/pix";

const router = express.Router();

router.use("/", helloWorldRouter);
router.use("/pix", pixRouter);

export default router;
