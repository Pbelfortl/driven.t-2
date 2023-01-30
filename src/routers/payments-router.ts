import { createTicketPayment, getTicketPayment } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";



const paymentsRouter = Router()

paymentsRouter
    .get("/", authenticateToken, getTicketPayment)
    .post("/process", authenticateToken, createTicketPayment)

export {paymentsRouter}