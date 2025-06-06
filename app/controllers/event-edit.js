import Controller from '@ember/controller';
import AuthenticatedController from 'ares-webportal/mixins/authenticated-controller';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend(AuthenticatedController, {
  gameApi: service(),
  flashMessages: service(),
  router: service(),
  warning_tags: [],
  selectedDate: '',
  
  setup() {
    dayjs.extend(customParseFormat);
    let parsedDate = dayjs(this.model.event.date, this.get('model.event.date_entry_format'), true);
    this.set('selectedDate', new Date(parsedDate));
  },
  
  @action
  changeDate(date) {
    this.set('selectedDate', date);  
  },
    
  @action
  organizerChanged(org) {
    this.set('model.event.organizer', org);
  },
        
  @action
  edit() {
    let api = this.gameApi;            
    let formattedDate = dayjs(this.selectedDate).format(this.get('model.event.date_entry_format'));
            
    api.requestOne('editEvent', 
    {
      event_id: this.get('model.event.id'),
      title: this.get('model.event.title'), 
      date: formattedDate,
      time: this.get('model.event.time'),
      organizer: this.get('model.event.organizer.name'),
      tags: this.get('model.event.tags'),
      content_warning: this.get('model.event.content_warning'),
      description: this.get('model.event.description')
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.router.transitionTo('event',                          
      this.get('model.event.id'));
      this.flashMessages.success('Event updated!');
    });
  },
        
  @action
  warningsChanged(new_warnings) {
    this.set('warning_tags', new_warnings);
    this.set('model.event.content_warning', new_warnings.join(', '));
  },
});