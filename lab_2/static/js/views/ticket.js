'use strict'

const ticketModel = new Ticket() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#ticket-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const ticketData = {}
        formData.forEach((value, key) => {
            ticketData[key] = value
        })

        ticketModel.Create(ticketData)

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#tickets-list').DataTable({
        data: ticketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Price', data: 'price' },
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

    const dataTable = window.jQuery('#tickets-list').DataTable();

    $('#tickets-list tbody').on('click', '.edit-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();

        document.getElementById('price').value = data.price;

        localStorage.setItem('editedItemId', data.id);
    });

    $('#tickets-list tbody').on('click', '.delete-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();
        ticketModel.Delete(data);
    });
}

function initListEvents () {
    document.addEventListener('ticketsListDataChanged', function (e) {
        const dataTable = window.jQuery('#tickets-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
