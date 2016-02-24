import Ember from 'ember';
var marked = require('marked');

export function markdown(params) {
  let content = params[0];
  return new Ember.Handlebars.SafeString(marked(content));
}

export default Ember.Helper.helper(markdown);
