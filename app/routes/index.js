import Route from '@ember/routing/route';

export default Route.extend({

  beforeModel() {
    this.store.createRecord('person', { name: 'Jean-Philippe' });
    this.store.createRecord('person', { name: 'Katerine' });
    this.store.createRecord('person', { name: 'Conjoint' });
  },

  model() {
    return this.store.peekAll('person');
  },

});
