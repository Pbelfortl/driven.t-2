import { prisma } from "@/config"
import { TicketType } from "@prisma/client"

async function getTicketsTypes () {
    
    return await prisma.ticketType.findMany()
}

async function getTicket (userId:number) {

    const ticket = await prisma.ticket.findMany({
        where: {
            Enrollment: {
                userId: userId
            }
        },
        include:{
            TicketType: true
        }
    })

    return ticket
}


async function createTicket (ticketTypeId: number, userId: number) {

    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId
        }
    })

    const ticket = await prisma.ticket.create({
        data: {
            ticketTypeId: ticketTypeId,
            enrollmentId: enrollment.id,
            status:"RESERVED",
        },
        include: {
            TicketType: true
        }
    })

    return ticket
}

async function checkEnrollment(userId: number) {
    
    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId
        }
    })
    return enrollment
}

const ticketsRepository = {
    getTicket,
    getTicketsTypes,
    createTicket,
    checkEnrollment
}

export default ticketsRepository