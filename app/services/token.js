import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

export default Ember.Service.extend({
  githubToken: null,

  _setup: function () {
    ipc.on('new-github-token', function (event, token) {
      this.set('githubToken', token);
    });
  }.on('init'),

  token: function() {
    return this.get('githubToken');
  }

});
