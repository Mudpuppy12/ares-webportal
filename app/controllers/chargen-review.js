import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({    
  gameApi: service(),
  flashMessages: service(),
  router: service(),
  appNotes: '',
    
  resetOnExit: function() {
    this.set('appNotes', '');
  },
    
  @action
  submit() {
    let api = this.gameApi;
    api.requestOne('chargenSubmit', { app_notes: this.appNotes })
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.flashMessages.success('You have submitted your application.  Check for responses to your app under Help->Requests.');
      this.router.transitionTo('chargen');
    });   
  }
});