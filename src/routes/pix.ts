import express from "express";
import rateLimit from "express-rate-limit";
import { createPayment } from "../apis/mercadoPago";
import handleInternalServerError from "../utils/handleInternalServerError";
import validateBodyParams from "../utils/validateBodyParams";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
const pixRouter = express.Router();

const POSSIBLE_TOKENS = ["SBRL"];
const POSSIBLE_NETWORKS = [42161, 250, 5, 137, 80001];
// ARBITRUM_ONE, FANTOM, GOERLI, POLYGON, POLYGON_MUMBAI

interface Purchase {
  token: string;
  networkId: number;
  amountBRL: number;
  pix_id: number;
  qr_code: string;
  ticket_url: string;
}

const mockPurchases: Purchase[] = [];

// user will send what token he wants and how much BRL he wants to pay
pixRouter.post(
  "/",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
  }),
  async (req: express.Request, res: express.Response) => {
    try {
      const { token, amount, networkId } = validateBodyParams(req, [
        { paramName: "token", paramType: "string" },
        { paramName: "amount", paramType: "number" },
        { paramName: "networkId", paramType: "number" },
      ]);

      // check if amount is not negative
      if (amount <= 0) {
        return res.status(400).json({
          error: "Amount must be greater than 0",
        });
      }

      // check if networkId is valid
      if (!POSSIBLE_NETWORKS.includes(networkId)) {
        return res.status(400).json({
          error: "Invalid networkId",
        });
      }

      const payment = await createPayment(amount);
      // pix_id, qr_code, qr_code_base64, ticket_url

      console.log(payment);

      // await prisma.tokenPurchase.create({
      //   data: {
      //     token,
      //     networkId,
      //     amountBRL: amount,
      //     pix_id: parseInt(payment.pix_id),
      //     qr_code: payment.qr_code,
      //     ticket_url: payment.ticket_url,
      //   },
      // });
      mockPurchases.push({
        token,
        networkId,
        amountBRL: amount,
        pix_id: parseInt(payment.pix_id),
        qr_code: payment.qr_code,
        ticket_url: payment.ticket_url,
      });

      return res.status(200).json({
        message: "Payment created successfully",
        pix_id: payment.pix_id,
        qr_code: payment.qr_code,
        qr_code_base64: payment.qr_code_base64,
        ticket_url: payment.ticket_url,
      });
    } catch (error: any) {
      return handleInternalServerError(error, req, res);
    }
  }
);

pixRouter.post(
  "/estimative",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
  }),
  async (req: express.Request, res: express.Response) => {
    try {
      // const { token, amount, networkId } = validateBodyParams(req, [
      //   { paramName: "token", paramType: "string" },
      //   { paramName: "amount", paramType: "number" },
      //   { paramName: "networkId", paramType: "number" },
      // ]);

      return res.json({
        message: "Estimative created successfully",
        estimative: {
          networkGas: 124352135,
          amountToken: 123123,
        },
      });
    } catch (error: any) {
      return handleInternalServerError(error, req, res);
    }
  }
);

export default pixRouter;
