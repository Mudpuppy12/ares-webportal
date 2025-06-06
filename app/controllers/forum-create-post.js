import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
  subject: '',
  message: '',
  gameApi: service(),
  session: service(),
  flashMessages: service(),
  router: service(),
  author: null,
    
  resetOnExit: function() {
    this.set('subject', '');
    this.set('message', '');
    this.set('author', null);
  },
    
  setup: function() {
    this.set('author', this.get('model.authors')[0]);
  },
    
  @action
  addPost() {
    let api = this.gameApi;
    api.requestOne('forumPost', { category_id: this.get('model.id'), 
    subject: this.subject,
    message: this.message,
    author_id: this.get('author.id') }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.router.transitionTo('forum-topic', 
      this.get('model.id'), 
      response.id);
      this.flashMessages.success('Topic added!');
    });
  },
        
  @action
  authorChanged(author) {
    this.set('author', author);
  }
});