const {Train} = require("./train");
const {Passenger} = require("./passenger");
const {Database} = require("./database");

const db = new Database();

const passengers = [new Passenger(1, "Vlad"), new Passenger(2, "Igor"), new Passenger(3, "Den")];
const trains = [new Train(223), new Train(456)];

const handle = (err, value) => {
    if (err) console.error(err);
    else console.log(value);
}

passengers.forEach(value => db.addPassenger(value, handle));
trains.forEach(value => db.addTrain(value, handle));

console.log("**************************************");

db.findPassengerById(3, handle);

db.findTrainById(666, handle);

db.deletePassengerById(3, handle)

db.findPassengerById(3, handle);

db.findPassengerById(2, (err, value) => {
    let p2 = value;
    console.log(p2);
    p2.name = "Ostap";
    db.addPassenger(p2, handle);
    db.findPassengerById(2, handle);
})

console.log("**************************************");

let t1, t2, p1;

db.findTrainById(223, (err, value) => {
        t1 = value;
        db.findTrainById(456, (err, value) => {
            t2 = value;
            db.findPassengerById(1, (err, value) => {
                p1 = value;
                t1.sellTicket(p1, (err, value) => {
                    let ticket1 = value;
                    console.log(ticket1);
                    t1.changeTicket(ticket1, t2, (err, value) => {
                        ticket1 = value;
                        console.log(ticket1);
                        ticket1.cancelOrder();
                        console.log(ticket1);
                    })
                })
            })
        });
});

console.log("**************************************");

t1.sellTicket(p1, handle);
t2.sellTicket(p1, handle);
t2.sellTicket(p1, handle);

t2.sellTicket(p1, handle);
t2.sellTicket(p1, handle);

console.log("**************************************");

db.findMostAndLeastSoldOutTrain(handle)


