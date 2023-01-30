import { Router} from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes, getTicket, createTicket } from "@/controllers/tickets-controller";


const ticketsRouter = Router()

ticketsRouter
    .get("/", authenticateToken, getTicket)
    .get("/types", authenticateToken, getTicketsTypes )
    .post("/", authenticateToken, createTicket)

export {ticketsRouter}