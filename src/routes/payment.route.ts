import express  from "express";
import { CreateOrder, GetRazorpayKeys, WebhookEvent } from "../controller/payment.controller";
const paymentRouter = express.Router();

paymentRouter.get("/getKeys", GetRazorpayKeys);

paymentRouter.post("/create-order", CreateOrder);
paymentRouter.post("/webhook", WebhookEvent);

export default paymentRouter