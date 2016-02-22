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
  }
});
