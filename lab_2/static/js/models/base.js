class BaseModel {// eslint-disable-line no-unused-vars

  static currentId = 0;

  constructor (collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }
  /**
   * @returns {Number}
   */
  getNextId () {
    return ++BaseModel.currentId;
  }
  /**
   * @returns {Object}
   */
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }

  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById (id) {
    return this.Select().find(item => item.id === id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (id) {
    return this.Select().findIndex(item => item.id === id)
  }

  Create (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()

    const editedItemId = localStorage.getItem('editedItemId');
    entry.id = editedItemId ? +editedItemId : this.getNextId();

    for (const key in row) {
      if (entry.hasOwnProperty(key) &&
          entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    if (editedItemId) {
      collection[this.FindIndexById(+editedItemId)] = entry;
    } else {
      collection.push(entry)
    }

    this.Commit(collection)
    localStorage.removeItem('editedItemId');

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }

  Delete(model) {
    console.log(model);
    const dataIndex = this.FindIndexById(+model.id);
    console.log(dataIndex);
    if (dataIndex === -1) return;

    const collection = this.Select();
    collection.splice(dataIndex, 1);
    this.Commit(collection);

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
}
