import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleEdit() {
      Ember.$('.rendered').toggleClass('half');
      Ember.$('.markdown').toggle();
    }
  }
});
