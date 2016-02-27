import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveNote() {
      this.get('model').save();
      Ember.$('.rendered').toggleClass('half');
      Ember.$('.markdown').toggle();
    }
  }
});
