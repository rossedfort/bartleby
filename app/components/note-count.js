import Ember from 'ember';

export default Ember.Component.extend({
  charCount: Ember.computed('note.content', function(){
    return this.get('note.content').split(" ").join("").length;
  }),

  wordCount: Ember.computed('note.content', function(){
    let content = this.get('note.content')
    return content.length ? content.split(" ").length : 0;
  })
});
