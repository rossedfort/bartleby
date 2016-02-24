import Ember from 'ember';

export default Ember.Controller.extend({
  charCount: Ember.computed('content', function(){
    return this.get('model.content').split(" ").join("").length;
  }),

  wordCount: Ember.computed('content', function(){
    return this.get('model.content').split(" ").length;
  }),

  actions: {
    saveNote() {
      this.get('model').save();
    }
  }
});
