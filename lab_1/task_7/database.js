const {Train} = require("./train");
const {Passenger} = require("./passenger");

function Database() {
    this.passengersArray = [];
    this.trainsArray = [];
}

// a.
Database.prototype.addPassenger = function (passenger, cb) {
    if (!passenger || !(passenger instanceof Passenger)) {
        cb("Invalid passenger!", null);
        return;
    }
    addObjectToArray(passenger, this.passengersArray);
    cb(null, "Passenger was added successfully");
}
// c.
Database.prototype.deletePassengerById = function (id, cb) {
    if (typeof id !== "number" || id <= 0) {
        cb("Invalid id!", null);
        return;
    }

    const deletedPassenger = deleteFromArrayById(id, this.passengersArray);

    if (deletedPassenger) {
        cb(null, deletedPassenger);
    } else {
        cb("No passenger with such id!", null);
    }
}
// d.
Database.prototype.findPassengerById = function (id, cb) {
    if (typeof id !== "number" || id <= 0) {
        cb("Invalid id!", null);
        return;
    }
    const foundPassenger = findFromArrayById(id, this.passengersArray)

    if (!foundPassenger) {
        cb("No passenger with such id!", null);
    } else {
        cb(null, foundPassenger);
    }
}
// e.
Database.prototype.addTrain = function (train, cb) {
    if (!train || !(train instanceof Train)) {
        cb("Invalid train!", null);
        return;
    }

    addObjectToArray(train, this.trainsArray);
    cb(null, "Train was added successfully");
}
// g.
Database.prototype.deleteTrainById = function (id, cb) {
    if (typeof id !== "number" || id <= 0) {
        cb("Invalid id!", null);
        return;
    }

    const deletedTrain = deleteFromArrayById(id, this.trainsArray);

    if (deletedTrain) {
        cb(null, deletedTrain);
    } else {
        cb("No train with such id!", null);
    }
}
// h.
Database.prototype.findTrainById = function (id, cb) {
    if (typeof id !== "number" || id <= 0) {
        cb("Invalid id!", null);
        return;
    }
    const foundTrain = findFromArrayById(id, this.trainsArray)

    if (!foundTrain) {
        cb("No train with such id!", null);
    } else {
        cb(null, foundTrain);
    }
}
// l.
Database.prototype.findMostAndLeastSoldOutTrain = function (cb) {
    let trainsCopyArray = Array.from(this.trainsArray);
    trainsCopyArray.sort((a, b) => {
        return a.soldTickets.soldTicketsArray.length - b.soldTickets.soldTicketsArray.length;
    })

    cb(null, {
        winner: trainsCopyArray[trainsCopyArray.length - 1],
        loser: trainsCopyArray[0]
    })
}

// private helper methods
function addObjectToArray(object, array) {
    let found = array.find(value => value.id === object.id);
    if (found)
        array[array.indexOf(object)] = object;
    else
        array.push(object);
}

function deleteFromArrayById(id, array) {
    const objectToDelete = array.find(value => value.id === id);

    if (objectToDelete) {
        array.splice(array.indexOf(objectToDelete), 1);
    }

    return objectToDelete;
}

function findFromArrayById(id, array) {
    return array.find(value => value.id === id);
}

module.exports = {
    Database,
}