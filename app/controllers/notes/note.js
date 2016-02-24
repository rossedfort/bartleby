import Ember from 'ember';

export default Ember.Controller.extend({
  editing: false,

  actions: {
    saveNote() {
      this.get('model').save();
      Ember.$('.rendered').toggleClass('half');
      Ember.$('.markdown').toggle();
    }
  }
});
