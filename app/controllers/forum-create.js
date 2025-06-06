import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
  gameApi: service(),
  router: service(),
  name: '',
  desc: '',
  order: '',
  can_read: null,
  can_write: null,

  resetOnExit: function() {
    this.set('name', '');
    this.set('desc', '');
    this.set('order', '');
    this.set('can_read', null);
    this.set('can_write', null);
  },
    
  @action       
  save() {
    let api = this.gameApi;
    api.requestOne('createForum', 
    {
      id: this.id,
      name: this.name, 
      desc: this.desc,
      order: this.order,
      can_read: (this.can_read || []),
      can_write: (this.can_write || [])
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.router.transitionTo('forum-manage');
      this.flashMessages.success('Forum category created!');
    });
  },
        
  @action
  readRolesChanged(roles) {
    this.set('can_read', roles);
  },

  @action
  writeRolesChanged(roles) {
    this.set('can_write', roles);
  }    
});