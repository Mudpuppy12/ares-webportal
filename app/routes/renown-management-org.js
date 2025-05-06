import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import DefaultRoute from 'ares-webportal/mixins/restricted-route';

export default Route.extend(DefaultRoute, {
    gameApi: service(),
    session: service(),
    
    model: function(params) {
        let api = this.gameApi;
        return RSVP.hash({
             org: params['org'],
             orgs: api.request('renownOrgs'),
             people: api.requestOne('renownOrg', {org: params['org']}),
           })
           .then((model) => EmberObject.create(model));
    }
});
