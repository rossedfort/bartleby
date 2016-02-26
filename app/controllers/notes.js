import Ember from 'ember';
const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote   = electron.remote;
const mainProcess = remote.require('./electron.js');

export default Ember.Controller.extend({

  _setup: function () {
    ipc.on('note-selected', (event, noteId) => {
      this.transitionToRoute('notes.note', noteId);
    })
  }.on('init'),

  _updateMenu: Ember.observer('model.[]', function () {
    let notes = this.get('model').toArray().map(note => note.serialize({includeId: true}));
    mainProcess.updateMenu(notes);
  })

});
