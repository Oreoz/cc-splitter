import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({

  fade,

  names: '',
  expenses: Object.freeze([]),

  submittable: computed('names', 'expenses.[]', function() {
    return this.names.split(',').filter(string => string.trim().length > 1).length > 1 &&
      this.expenses.length > 0;
  }),

  total: computed('expenses', function() {
    return this.expenses.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  }),

  actions: {

    parse(data) {
      const pattern = /(\d{2} \d{2}) (.*) (\d{2} \d{2}) (.*) (\d+\.\d+)$/;

      const expenses = data
        .split('\n')
        .map(line => {
          if (pattern.test(line)) {
            /* eslint-disable-next-line no-unused-vars */
            const [match, date, ref, _, description, amount] = pattern.exec(line);
            return { amount: Number(amount), date, description };
          }
        })
        .filter(Boolean);

      this.set('expenses', expenses);
    },

    submit() {
      this.names.split(',').forEach(name => {
        this.store.createRecord('person', { name: name.trim() });
      });

      this.expenses.forEach(expense => this.store.createRecord('expense', {
        amount: expense.amount,
        date: moment(expense.date, 'MM DD'),
        description: expense.description,
      }));

      this.transitionToRoute('split');
    }

  }

});
