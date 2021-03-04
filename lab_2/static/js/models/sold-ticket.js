class SoldTicket extends BaseModel {
    constructor() {
        super('soldTickets');
        this.fields = this.fields.concat(
            ['passengerId', 'trainId', 'ticketId', 'date']
        );
    }

    findConflictingTicket(soldTicket) {
        return this.Select().find(value =>
            value.ticketId === soldTicket.ticketId &&
            value.trainId === soldTicket.trainId &&
            value.date === soldTicket.date);
    }
}