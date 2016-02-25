import Ember from 'ember';

export default Ember.Controller.extend({
  username: null,
  password: null,

  actions: {
    login() {
      let username = this.get('username');
      let password = this.get('password');
      $.ajax({
          url: 'https://api.github.com/authorizations',
          type: 'POST',
          beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", "Basic " + btoa(`${username}:${password}`));
          },
          data: '{"scopes":["gist"],"note":"ajax gist test for a user"}'
      }).done(function(response) {
          console.log(response);
      });
    }
  }
});
