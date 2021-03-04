'use strict'

const trainModel = new Train() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#train-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const trainData = {}
        formData.forEach((value, key) => {
            trainData[key] = value
        })

        trainModel.Create(trainData)

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#trains-list').DataTable({
        data: trainModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Route', data: 'route' },
            {
                data: null,
                defaultContent: "<button class='edit-btn'>Edit</button>"
            },
            {
                data: null,
                defaultContent: "<button class='delete-btn'>Delete</button>"
            },
        ],
    })

    const dataTable = window.jQuery('#trains-list').DataTable();

    $('#trains-list tbody').on('click', '.edit-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();

        document.getElementById('name').value = data.name;
        document.getElementById('route').value = data.route;

        localStorage.setItem('editedItemId', data.id);
    });

    $('#trains-list tbody').on('click', '.delete-btn', function () {
        const data = dataTable.row( $(this).parents('tr') ).data();
        trainModel.Delete(data);
    });
}

function initListEvents () {
    document.addEventListener('trainsListDataChanged', function (e) {
        const dataTable = window.jQuery('#trains-list').DataTable()

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
