import Ember from 'ember';
import layout from '../templates/components/notification-list';

export default Ember.Component.extend({
  layout,

  classNameBindings: [
    'hasImportantNotifications',
    'hasNewNotifications',
  ],

  ordering: ['important:desc', 'created:desc'],

  /**
   * Notification list header.
   *
   * @type {String}
   */
  header: '',

  /**
   * Notifications to show.
   *
   * @type {Ember.Array}
   */
  notifications: Ember.A(),

  /**
   * Maximum number of notifications to show.
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

    return Ember.A(notifications.slice(0, this.get('numNotifications')));
  }),

  importantNotifications: Ember.computed.filterBy(
    'orderedNotifications', 'important'
  ),

  newNotifications: Ember.computed.filterBy(
    'orderedNotifications', 'seen', false
  ),

  hasImportantNotifications: Ember.computed.notEmpty('importantNotifications'),

  hasNewNotifications: Ember.computed.notEmpty('newNotifications'),

  /**
   * Show the list of notifications.
   *
   * Notifications not previously seen get their `seen` attribute set to true.
   */
  showNotifications () {
    this.set('renderNotifications', true);
  },

  /**
   * Hide the list of notifications.
   */
  hideNotifications () {
    this.set('renderNotifications', false);

    this.get('topNotifications').filterBy('seen', false).forEach(unseen => {
      unseen.set('seen', true);
      unseen.save();
    });
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

  /**
   * Throw exception if header is passed in and is not a string value
   */
  _assertHeader () {
    const notificationsHeader = this.get('header');
    const notifcationHeaderType = typeof notificationsHeader;
    if (!notificationsHeader && notifcationHeaderType === 'boolean') {
      Ember.assert('You cannot pass in `false` for the header');
    } else if (notificationsHeader && notifcationHeaderType !== 'string') {
      Ember.assert('You must pass in a string for the header');
    }
  },

  init () {
    this._super(...arguments);
    this._assertHeader();
  },

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
