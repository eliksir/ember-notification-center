import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  created: DS.attr('date'),
  seen: DS.attr('boolean', { defaultValue: false }),
  important: DS.attr('boolean', { defaultValue: false }),

  /**
   * Compute the creation date of this notification.
   *
   * Override this property if you want to format the outputted date.
   */
  creationDate: Ember.computed.reads('created'),
});
