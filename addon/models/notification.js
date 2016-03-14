import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  created: DS.attr('date'),
  seen: DS.attr('boolean', { defaultValue: false }),
  important: DS.attr('boolean', { defaultValue: false }),
});
