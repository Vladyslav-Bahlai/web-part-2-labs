const {Passenger} = require("./passenger");
const {Ticket} = require("./ticket");
const {SoldTickets} = require("./soldTickets");

function Train(id) {
    this.id = id;
    this.soldTickets = new SoldTickets();
}

// i.
Train.prototype.sellTicket = function (passenger, cb) {
    if (!passenger || !(passenger instanceof Passenger)) {
        cb("Invalid passenger!", null);
        return;
    }

    const ticketToSell = new Ticket(passenger, this);
    this.soldTickets.addTicket(ticketToSell);
    cb(null, ticketToSell);
}
// j.
Train.prototype.changeTicket = function (ticket, newTrain, cb) {
    if (!ticket || !(ticket instanceof Ticket)) {
        cb("Invalid ticket!", null);
        return;
    }

    if (!newTrain || !(newTrain instanceof Train)) {
        cb("Invalid train!", null);
        return;
    }

    if (!this.soldTickets.soldTicketsArray.includes(ticket)) {
        cb("Ticket is not sold for this train!", null);
        return;
    }

    this.removeTicket(ticket);
    ticket.train = newTrain;
    newTrain.soldTickets.soldTicketsArray.push(ticket);
    cb(null, ticket);
}

Train.prototype.removeTicket = function (ticket) {
    this.soldTickets.soldTicketsArray
        .splice(this.soldTickets.soldTicketsArray.indexOf(ticket), 1);
    ticket.train = undefined;
}

module.exports = {
    Train,
}