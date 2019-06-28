import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({

  beforeModel() {
    if (this.store.peekAll('expense').length === 0 || this.store.peekAll('person').length === 0) {
      this.transitionTo('index');
    }
  },

  model() {
    return hash({
      expenses: this.store.peekAll('expense'),
      people: this.store.peekAll('person'),
    });
  }

});
