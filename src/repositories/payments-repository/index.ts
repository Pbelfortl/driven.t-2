import { prisma } from "@/config";
import { CardData } from "@/protocols";



async function getTicketPayment(ticketId:number) {
    

    const payment = await prisma.payment.findFirst({
        where: {
            ticketId
        }
    })
    return payment
}


async function createTicketPayment (ticketId: number, cardData: CardData) {

    const ticket = await prisma.ticket.findFirst({
        where: {
            id: ticketId
        }, 
        include: {
            TicketType: true
        }
    })

    const payment = await prisma.payment.create({
        data: {
            ticketId,
            value: ticket.TicketType.price,
            cardIssuer: cardData.issuer,
            cardLastDigits: ((cardData.number).toString()).slice(-4)
        }
    })

    await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            status: "PAID"
        }
    })

    return payment
}

async function checkTicket (ticketId:number) {

    const ticket = await prisma.ticket.findFirst({
        where: {
            id: ticketId
        }
    })
    return ticket
}


const paymentsRepository = {
    createTicketPayment,
    getTicketPayment,
    checkTicket
}

export default paymentsRepository