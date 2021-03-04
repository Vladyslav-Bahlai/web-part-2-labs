'use strict'

const passengerModel = new Passenger() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#passenger-add-form')

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const passengerData = {}
        formData.forEach((value, key) => {
            passengerData[key] = value
        })

        passengerModel.Create(passengerData)

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#passengers-list').DataTable({
        data: passengerModel.Select(),
        columns: [
            { title: 'Passport ID', data: 'id' },
            { title: 'First Name', data: 'name' },
            { title: 'Last Name', data: 'surname' },
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

    const dataTable = window.jQuery('#passengers-list').DataTable();

    $('#passengers-list tbody').on('click', '.edit-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();
        document.getElementById('name').value = data.name;
        document.getElementById('surname').value = data.surname;
        localStorage.setItem('editedItemId', data.id);
    });

    $('#passengers-list tbody').on('click', '.delete-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();
        passengerModel.Delete(data);
    });
}

function initListEvents () {
    document.addEventListener('passengersListDataChanged', function (e) {
        const dataTable = window.jQuery('#passengers-list').DataTable()

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
