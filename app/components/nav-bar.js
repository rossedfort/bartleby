import Ember from 'ember';

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
