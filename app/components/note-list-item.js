import Ember from 'ember';
const shell = requireNode('electron').shell;

export default Ember.Component.extend({
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
      files[id] = {'content': content};
      $.ajax({
          url: 'https://api.github.com/gists',
          type: 'POST',
          beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", "token TOKEN-FROM-AUTHORIZATION-CALL");
          },
          data: '{"description": "a gist for a user with token api call via ajax","public": true,"files": {"file1.txt": {"content": "String file contents via ajax"}}}'
      }).done(function(response) {
          console.log(response);
      });
      // Ember.$.ajax({
      //   url: 'https://api.github.com/gists',
      //   type: 'POST',
      //   dataType: 'json',
      //   data: JSON.stringify({'files': files, 'public': true})
      // })
      // .success( function(e) {
      //   shell.openExternal(e.html_url);
      // });
    }
  }
});
