import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model, attr, hasMany } = DS;

export default Model.extend({

  name: attr({ defaultValue: '' }),

  expenses: hasMany({ async: false }),

  owed: computed('expenses.[]', function() {
    return this.expenses.reduce((accumulator, expense) => accumulator + expense.amount, 0);
  }),

});
