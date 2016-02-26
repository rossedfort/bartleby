import Ember from 'ember';

export default Ember.Controller.extend({
  username: null,
  password: null,

  actions: {
    login() {
      let username = this.get('username');
      let password = this.get('password');
      Ember.$.ajax({
        url: 'https://api.github.com/authorizations',
        type: 'POST',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa(`${username}:${password}`));
        },
        data: '{"scopes":["gist"],"note":"Bartleby"}'
      }).done((response) => {
        this.set('username', null);
        this.set('password', null);
        localStorage.setItem('token', response.token);
        console.log(response);
      });
    }
  }
});
