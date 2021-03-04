'use strict'
const passengerModel = new Passenger();
const trainModel = new Train();
const ticketModel = new Ticket();

class TicketValidator {
    validateTicket(soldTicket) {
        // console.log(soldTicket);
        // console.log(passengerModel.FindById(+soldTicket.passengerId));
        // console.log(trainModel.FindById(+soldTicket.trainId));
        // console.log(ticketModel.FindById(+soldTicket.ticketId));
        // console.log(!soldTicketModel.findConflictingTicket(soldTicket));
        return passengerModel.FindById(+soldTicket.passengerId) &&
            trainModel.FindById(+soldTicket.trainId) &&
            ticketModel.FindById(+soldTicket.ticketId) &&
            !soldTicketModel.findConflictingTicket(soldTicket);
    }
}