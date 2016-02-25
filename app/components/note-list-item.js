import Ember from 'ember';
const shell = requireNode('electron').shell;

export default Ember.Component.extend({
  token: Ember.inject.service('token'),

  truncatedNoteName: Ember.computed('note.id', function(){
    return this.get('note.id').length > 15 ? this.get('note.id').slice(0, 15) + '...' : this.get('note.id');
  }),

  actions: {
    delete(note) {
      note.deleteRecord();
      note.save();
    },

    postGist(note) {
      let id = note.get('id');
      let content = note.get('content');
      let files = {};
      files[id] = {'content': content}
      $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({'files': files, 'public': true})
      })
      .success( function(e) {
        shell.openExternal(e.html_url);
      });
    }
  }
});
