import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { pushObject } from 'ares-webportal/helpers/object-ext';

export default Controller.extend({
  gameApi: service(),
  flashMessages: service(),
  router: service(),
  addRenownEntry: false,
  chars: computed('model{people,titles}', function () {
        let titles = this.get('model.titles');
        let people = this.get('model.people');
        let chars = [];
        people.forEach(function(char_fields) {
            let char = [];
            titles.forEach(function(title) {
                let field = char_fields[title];
                pushObject(char, field, null, null);
            });
            pushObject(chars, char, null, null);
        });
        return chars;
    })

});
