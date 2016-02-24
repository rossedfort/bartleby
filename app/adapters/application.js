import DS from 'ember-data';
const electron = requireNode('electron');
const remote = electron.remote;
const mainProcess = remote.require('./electron');
const filesystem = mainProcess.filesystem;


export default DS.Adapter.extend({
  findAll() {
    return filesystem.all();
  },

  findRecord() {
    return filesystem.find();
  },

  createRecord(store, type, record) {
    let data = this.serialize(record, { includeId: true});
    return filesystem.write(data.id, data.content);
  },

  updateRecord(store, type, record) {
    let data = this.serialize(record, { includeId: true});
    return filesystem.write(data.id, data.content);
  },

  deleteRecord(store, type, record) {
    let data = this.serialize(record, { includeId: true});
    return filesystem.destroy(data.id).then(() => { return { id: data.id } })
  }
});
