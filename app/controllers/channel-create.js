import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
  gameApi: service(),
  router: service(),
  name: '',
  desc: '',
  color: '',
  can_talk: null,
  can_join: null,

  resetOnExit: function() {
    this.set('name', '');
    this.set('desc', '');
    this.set('color', '');
    this.set('can_talk', null);
    this.set('can_join', null);
  },  

  @action      
  save() {
    let api = this.gameApi;
    api.requestOne('createChannel', 
    { 
      id: this.id,
      name: this.name, 
      desc: this.desc,
      can_talk: (this.can_talk || []),
      can_join: (this.can_join || []),
      color: this.color
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.router.transitionTo('channels-manage');
      this.flashMessages.success('Channel created!');
    });
  },
        
  @action
  talkRolesChanged(roles) {
    this.set('can_talk', roles);
  },

  @action
  joinRolesChanged(roles) {
    this.set('can_join', roles);
  }
    
});