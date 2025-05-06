import EmberObject, { computed, action } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    gameApi: service(),
    flashMessages: service(),
    router: service(),
    tagName: '',
    pcRenownName: null,
    pcRenownTitle: null,
    pcRenownPoints: 0,

    didInsertElement: function() {
      this._super(...arguments);
      let defaultName = this.chars ? this.chars[0] : '';
      this.set('renownName', defaultName);
    },

    @action
    doAddRenownEntry() {
       let api = this.gameApi;
       let defaultName = this.renownName ? this.chars[0] : '';
       let pcRenownName = this.renownName || defaultName;
       let pcRenownTitle = this.renownTitle;
       let pcRenownPoints = this.renownPoints;

       if (pcRenownName == null) {
         this.flashMessages.danger("You haven't entered a name.");
         return;
       }

       if (pcRenownTitle == null || pcRenownTitle == "") {
         this.flashMessages.danger("You haven't entered a reason.");
         return;
       }

       if (pcRenownPoints > 10000 || pcRenownPoints < -10000) {
         this.flashMessages.danger("You haven't entered a valid amount for points.");
         return;
       }
       this.set('addRenownEntry',false);
       this.set('pcRenownName', null);
       this.set('pcRenownTitle', null);
       this.set('pcRenownPoints', 0);
       api.requestOne('renownAddEntry', { name: pcRenownName,
          title: pcRenownTitle,
          points: pcRenownPoints }, null)
       .then( (response) => {
         if (response.error) {
           return;
         }
         this.router.transitionTo('char', response.name);
         this.flashMessages.success('A new renown entry has been added!');
        });
     },

  @action
    cancelAddRenownEntry() {
    this.set('addRenownEntry', false);
  },

 @action
  onRenownNameSelected(event) {
    this.set('renownName', event.target.value);
  },

 @action
 updateRenownPoints(event) {
    this.set('renownPoints', event.target.value);
 }

});
