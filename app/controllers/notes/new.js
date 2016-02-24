import Ember from 'ember';

export default Ember.Controller.extend({
  newNoteId: null,
  newNoteContents: null,
  actions: {
    createNewNote() {
      this.store.createRecord('note', {
        id: this.get('newNoteId'),
        content: this.get('newNoteContents')
      }).save().then(data => {
        this.transitionToRoute('notes.note', data);
        this.set('newNoteId', null);
        this.set('newNoteContents', null);
      });
    }
  }
});
