import Ember from 'ember';
const shell = requireNode('electron').shell;

export default Ember.Component.extend({
  truncatedNoteName: Ember.computed('note.id', function() {
    return this.get('note.id').length > 14 ? this.get('note.id').slice(0, (Math.floor(window.innerWidth * 0.2 / 14))) + '...' : this.get('note.id');
  }),

  actions: {
    delete(note) {
      note.deleteRecord();
      note.save();
    },

    postGist(note) {
      if (localStorage.token) {
        let id = note.get('id');
        let content = note.get('content');
        let files = {};
        files[id] = {'content': content};
        uploadGist(files);
      } else {
        alert('Please login to Github');
      }
    }
  }
});

const uploadGist = (files) => {
  Ember.$.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", `token ${localStorage.token}`);
    },
    data: JSON.stringify({'files': files, 'public': true})
  }).done(function(response) {
    shell.openExternal(response.html_url);
    console.log(response);
  });
};
