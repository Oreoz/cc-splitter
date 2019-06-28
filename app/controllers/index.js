import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import moment from 'moment';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({

  fade,

  input: '',
  lookingGood: false,

  expenses: Object.freeze([]),
  people: alias('model'),

  total: computed('expenses', function() {
    return this.expenses.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  }),

  unassignedExpenses: computed('expenses.@each.person', function() {
    return this.expenses.filter(e => e.person === null);
  }),

  actions: {

    assign(person, expense) {
      person.expenses.pushObject(expense);
    },

    looksGood() {
      this.toggleProperty('lookingGood');
    },

    parse() {
      const pattern = /(\d{2} \d{2}) (.*) (\d{2} \d{2}) (.*) (\d+\.\d+)$/;

      const expenses = this.input
        .split('\n')
        .map(line => {
          if (pattern.test(line)) {
            /* eslint-disable-next-line no-unused-vars */
            const [ match, date, ref, _, description, amount ] = pattern.exec(line);
            return { amount: Number(amount), date, description };
          }
        })
        .filter(Boolean)
        .map(expense => this.store.createRecord('expense', {
          amount: expense.amount,
          date: moment(expense.date, 'MM DD'),
          description: expense.description,
        }));

      this.set('expenses', expenses);
    }

  }

});
