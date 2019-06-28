import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({

  amount: attr({ defaultValue: 0 }),
  date: attr({ defaultValue: '' }),
  description: attr({ defaultValue: '' }),

  person: belongsTo({ async: false }),

});
