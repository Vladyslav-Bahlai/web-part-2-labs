class Ticket extends BaseModel {
    constructor() {
        super('tickets');
        this.fields = this.fields.concat(['price']);
    }
}