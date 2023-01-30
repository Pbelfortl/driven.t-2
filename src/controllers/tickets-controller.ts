import { AuthenticatedRequest } from "@/middlewares"
import { Response, Request } from "express"
import ticketsRepository from "@/repositories/tickets-repository"
import enrollmentRepository from "@/repositories/enrollment-repository"

export async function getTicketsTypes (req:AuthenticatedRequest, res:Response) {
    
    try{
        const types = await ticketsRepository.getTicketsTypes()
        res.status(200).send(types)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    
}

export async function getTicket (req:AuthenticatedRequest, res:Response) {

    const userId = req.userId
    
    try{

        const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)


        if(!enrollment){
            return res.sendStatus(404)
        }

        const ticket = await ticketsRepository.getTicket(userId)

        if(ticket.length === 0 ) {
            return res.sendStatus(404)
        }

        res.status(200).send(ticket[0])

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function createTicket (req: AuthenticatedRequest, res: Response) {

    const {ticketTypeId} = req.body
    const userId = req.userId

    try { 

        if(!ticketTypeId) {
            return res.sendStatus(400)
        }

        const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

        if(!enrollment){
            return res.sendStatus(404)
        }

        const ticket = await ticketsRepository.createTicket(ticketTypeId, userId)


        res.status(201).send(ticket)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}