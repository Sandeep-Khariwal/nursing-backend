import { Request, Response } from "express";
import crypto from "crypto";
import { myRazorpayInstance } from "../app";
import { QuizService } from "../services/quiz.service";
import { StudentService } from "../services/student.service";

export const GetRazorpayKeys = (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    data: {
      RAZORPAY_API_KEY: "rzp_test_MnTn74lHc6ml0N",
      RAZORPAY_API_SECRET: "N5WC2lntxPHUxvdNxfSltzpA",
    },
  });
};

export const CreateOrder = async (req: Request, res: Response) => {
  const { amount } = await req.body;
  console.log("amount");

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await myRazorpayInstance.orders.create(options);
    res.status(200).json({
      status: 200,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

export const WebhookEvent = async (req: Request, res: Response) => {
  const secret = process.env.WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET || "")
    .update(body.toString())
    .digest("hex");

  if (signature === expectedSignature) {
    console.log("✅ Webhook verified");
    const event = req.body;
    // Handle event like payment.captured
    if (event.event === "payment.captured") {
      const payment = req.body.payload.payment.entity;
      const notes = payment.notes;

      const user = {
        fullName: notes.fullName,
        email: notes.email,
        studentId: notes.studentId,
        countryCode: notes.countryCode,
        phone: notes.phone,
        address: notes.address,
        collegeName: notes.collegeName,
        quizId: notes.quizId,
        razorpayPaymentId: payment.id,
        amount: payment.amount,
        status: payment.status,
      };
      console.log("user : ", user);

      const quizService = new QuizService();
      const studentService = new StudentService();

      // register student in quiz
      await quizService.registerInQuiz({
        studentId: user.studentId,
        quizId: user.quizId,
        paymentId: user.razorpayPaymentId,
      });

      // update information in student modal
      await studentService.updateQuizStudentInfo(user.studentId, {
        email: user.email,
        collegeName: user.collegeName,
      });

      res.status(200).json({ status: 200, message: "payment is success!!" });
    } else {
      res.status(404).json({ status: 404, message: "payment failed" });
    }
  } else {
    console.log("❌ Invalid webhook signature");
    res.status(500).json({ status: 500, error: "Invalid signature" });
  }
};
