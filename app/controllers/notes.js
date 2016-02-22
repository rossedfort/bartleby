import Ember from 'ember';

export default Ember.Controller.extend({
  newNoteId: null,
  newNoteContents: null,
  actions: {
    createNewNote: function() {
      this.store.createRecord('note', {
        id: this.get('newNoteId'),
        content: this.get('newNoteContents')
      }).save().then(() => {
        this.set('newNoteId', null);
        this.set('newNoteContents', null);
      });
    }
  }
});
