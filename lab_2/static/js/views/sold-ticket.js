'use strict'
const soldTicketModel = new SoldTicket(); // eslint-disable-line no-undef
const ticketValidator = new TicketValidator();

function initAddForm () {
    const form = window.document.querySelector('#sold-ticket-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const soldTicketData = {}
        formData.forEach((value, key) => {
            soldTicketData[key] = value
        })

        if (ticketValidator.validateTicket(soldTicketData)) {
            soldTicketModel.Create(soldTicketData)
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#sold-tickets-list').DataTable({
        data: soldTicketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Passenger ID', data: 'passengerId' },
            { title: 'Train ID', data: 'trainId' },
            { title: 'Ticket ID', data: 'ticketId' },
            { title: 'Date', data: 'date' },
            {
                data: null,
                defaultContent: "<button class='edit-btn'>Edit</button>"
            },
            {
                data: null,
                defaultContent: "<button class='delete-btn'>Delete</button>"
            },
        ]
    })
}

function initListEvents () {
    document.addEventListener('soldTicketsListDataChanged', function (e) {
        const dataTable = window.jQuery('#sold-tickets-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)

    const dataTable = window.jQuery('#sold-tickets-list').DataTable();

    $('#sold-tickets-list tbody').on('click', '.edit-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();

        document.getElementById('passengerId').value = data.passengerId;
        document.getElementById('trainId').value = data.trainId;
        document.getElementById('ticketId').value = data.ticketId;
        document.getElementById('date').value = data.date;

        localStorage.setItem('editedItemId', data.id);
    });

    $('#sold-tickets-list tbody').on('click', '.delete-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();
        soldTicketModel.Delete(data);
    });
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
