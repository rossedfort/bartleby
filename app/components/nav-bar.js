import Ember from 'ember';
const electron = requireNode('electron');
const remote = electron.remote;
const mainProcess = remote.require('./electron');
const loginWithGithub = mainProcess.githubLogin;

// var Event = require('event-emitter');
// var e = Event({}), listener;
// import Event from 'events';

export default Ember.Component.extend({
  actions: {
    toggleEdit() {
      Ember.$('.rendered').toggleClass('half');
      Ember.$('.markdown').toggle();
    },

    login() {
      loginWithGithub();
    }
  }
});
