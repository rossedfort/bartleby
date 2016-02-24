import Ember from 'ember';

export default Ember.Component.extend({
  truncatedNoteName: Ember.computed('note.id', function(){
    return this.get('note.id').length > 15 ? this.get('note.id').slice(0, 15) + '...' : this.get('note.id');
  }),

  actions: {
    delete(note) {
      note.deleteRecord();
      note.save();
    }
  }
});
