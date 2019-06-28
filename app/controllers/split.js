import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({

  fade,

  expenses: alias('model.expenses'),
  people: alias('model.people'),

  unassignedExpenses: computed('expenses.@each.person', function() {
    return this.expenses.filter(expense => expense.person === null);
  }),

  actions: {

    assign(person, expense) {
      person.expenses.pushObject(expense);
    },

  }

});
