import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RestrictedRoute from 'ares-webportal/mixins/restricted-route';
import JsYaml from "js-yaml";

export default Route.extend(RestrictedRoute, {
    gameApi: service(),
    router: service(),
    
    model: function(params) {
        let api = this.gameApi;
        return api.requestOne('getConfig', { file: params['file']})
        .then(model => {
          
          if (model.get('valid')) {
            Object.keys(model.config).forEach(function(k) {
                model.config[k].new_value = JsYaml.dump(model.config[k].value);
            });
            return model;
          }
          else {
            this.flashMessages.danger('There is a problem with this config file.  Check your formatting.');
            this.router.transitionTo('textfile', 'config', model.get('file'));
          }
        });
       
    }
});
