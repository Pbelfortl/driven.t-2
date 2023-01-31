import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import { CardData } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";


export async function createTicketPayment (req: AuthenticatedRequest, res: Response) {

    const {cardData} = req.body
    const userId = req.userId
    const ticketId = req.body.ticketId
    
    try {

        if(!ticketId || !cardData) {
            return res.sendStatus(400)
        }

        const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
        const checkTicket = await paymentsRepository.checkTicket(Number(ticketId))

        if(!checkTicket) {
            res.sendStatus(404)
        }

        if(checkTicket?.enrollmentId !== enrollment?.id){
            return res.sendStatus(401)
        }

        const payment = await paymentsRepository.createTicketPayment(Number(ticketId), cardData)
        res.status(200).send(payment)

    } catch (err) {

        res.sendStatus(500)
    }
}

export async function getTicketPayment (req: AuthenticatedRequest, res: Response){

    const ticketId = req.query.ticketId
    const userId = req.userId

    try {

        if(!ticketId){
            return res.sendStatus(400)
        }

        const checkTicket = await paymentsRepository.checkTicket(Number(ticketId))

        if (!checkTicket) {
            res.sendStatus(404)
        }

        const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

        if(checkTicket?.enrollmentId !== enrollment?.id){
            return res.sendStatus(401)
        }

        const payment = await paymentsRepository.getTicketPayment(Number(ticketId))
        res.status(200).send(payment)

    } catch (err) {
         res.sendStatus(500)
    }

}