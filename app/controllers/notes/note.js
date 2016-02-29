import Ember from 'ember';
const moment = require('moment');

export default Ember.Controller.extend({
  formattedDate: Ember.computed('model.birthTime', function() {
    let date = new Date(this.get('model.birthTime'));
    return moment(date).format('LL');
  }),

  actions: {
    saveNote() {
      this.get('model').save();
      Ember.$('.rendered').toggleClass('half');
      Ember.$('.markdown').toggle();
    },

    toggleEdit() {
      Ember.$('.rendered').toggleClass('half');
      Ember.$('.markdown').toggle();
    }
  }
});
