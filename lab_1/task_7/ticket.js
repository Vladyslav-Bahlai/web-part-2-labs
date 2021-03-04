
function Ticket(passenger, train) {
    this.passenger = passenger;
    this.train = train;
}

Ticket.prototype.cancelOrder = function () {
    this.train.removeTicket(this);
}

module.exports = {
    Ticket,
}