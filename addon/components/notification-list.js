import Ember from 'ember';
import layout from '../templates/components/notification-list';

export default Ember.Component.extend({
  layout,

  classNameBindings: ['importantNotifications:has-important-notifications'],

  ordering: ['important:desc', 'created:desc'],

  /**
   * Notifications to show.
   *
   * @type {Ember.Array}
   */
  notifications: [],

  /**
   * Number of notifications to show.
   *
   * @type {Number}
   */
  numNotifications: 3,

  /**
   * Whether the notification list should be rendered.
   *
   * @type {Boolean}
   */
  renderNotifications: false,

  /**
   * Text to show if there are no notifications.
   *
   * @type {String}
   */
  noNotificationsText: 'You have no notifications yet.',

  /**
   * Notifications ordered by importance and date.
   *
   * @type {Ember.Array}
   */
  orderedNotifications: Ember.computed.sort('notifications', 'ordering'),

  /**
   * The `numNotifications` first notifications, ordered by importance and
   * date.
   *
   * @type {Ember.Array}
   */
  topNotifications: Ember.computed('orderedNotifications', function () {
    const notifications = this.get('orderedNotifications');

    return notifications.slice(0, this.get('numNotifications'));
  }),

  importantNotifications: Ember.computed.filterBy(
    'orderedNotifications', 'important'
  ),

  /**
   * Show the list of notifications.
   *
   * Notifications not previously seen get their `seen` attribute set to true.
   */
  showNotifications () {
    this.set('renderNotifications', true);

    this.get('topNotifications').filterBy('seen', false).forEach(unseen => {
      unseen.set('seen', true);
      unseen.save();
    });
  },

  /**
   * Hide the list of notifications.
   */
  hideNotifications () {
    this.set('renderNotifications', false);
  },

  /**
   * Add an event listener on the document for hiding the notification list
   * when clicks happen outside it.
   */
  setupEventListeners: Ember.on('didInsertElement', function () {
    const documentClickEvent = event => {
      if (!this.element.contains(event.target)) {
        this.hideNotifications();
      }
    };

    this.set('_documentClickEvent', documentClickEvent);

    document.addEventListener('click', documentClickEvent, true);
  }),

  /**
   * Remove the click event listener on the document.
   */
  cleanupDocumentEventListener: Ember.on('willDestroyElement', function () {
    document.removeEventListener(
      'click', this.get('_documentClickEvent'), true
    );
  }),

  actions: {
    /**
     * Toggle visibility of the notification list.
     */
    toggleVisibility () {
      if (this.get('renderNotifications')) {
        this.hideNotifications();
      }
      else {
        this.showNotifications();
      }
    },
  },
});
