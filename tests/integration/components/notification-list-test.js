import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-list', 'Integration | Component | notification list', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);

  this.render(hbs`{{notification-list}}`);

  assert.equal(this.$().text().trim(), '');

  this.render(hbs`
    {{#notification-list}}
      Template block text
    {{/notification-list}}
  `);

  assert.equal(this.$().text().trim(), 'Template block text');
});

test('it renders a message when there are no notifications', function (assert) {
  assert.expect(1);

  this.render(hbs`{{notification-list renderNotifications=true}}`);

  assert.equal(
    this.$('.empty span').text().trim(),
    'You have no notifications yet.'
  );
});

test('it renders a notification with message and date', function (assert) {
  assert.expect(3);

  this.set('notifications', [{ message: 'Foo', creationDate: new Date() }]);

  this.render(hbs`{{notification-list renderNotifications=true
                    notifications=notifications}}`);

  const notifications = this.$('.notifications > li');
  assert.equal(notifications.length, 1);

  const firstNotification = this.$(notifications[0]);
  assert.equal(
    firstNotification.find('.message').text().trim(),
    this.get('notifications')[0].message
  );
  assert.equal(
    firstNotification.find('.date').text().trim(),
    this.get('notifications')[0].creationDate
  );
});

test('it renders several notifications', function (assert) {
  assert.expect(3);

  this.set('notifications', [{ message: 'Foo' }, { message: 'Bar' }]);

  this.render(hbs`{{notification-list renderNotifications=true
                    notifications=notifications}}`);

  const notifications = this.$('.notifications > li');
  assert.equal(notifications.length, 2);

  assert.equal(
    this.$(notifications[0]).find('.message').text().trim(),
    this.get('notifications')[0].message
  );
  assert.equal(
    this.$(notifications[1]).find('.message').text().trim(),
    this.get('notifications')[1].message
  );
});

test('it renders important notifications with the class `important`', function (assert) {
  assert.expect(3);

  this.set('notifications', [{ important: true }, { important: false }]);

  this.render(hbs`{{notification-list renderNotifications=true
                    notifications=notifications}}`);

  const notifications = this.$('.notifications > li');
  assert.equal(notifications.length, 2);

  assert.equal(this.$(notifications[0]).hasClass('important'), true);
  assert.equal(this.$(notifications[1]).hasClass('important'), false);
});

test('it renders unseen notifications with the class `new`', function (assert) {
  assert.expect(3);

  this.set('notifications', [{ seen: false }, { seen: true }]);

  this.render(hbs`{{notification-list renderNotifications=true
                    notifications=notifications}}`);

  const notifications = this.$('.notifications > li');
  assert.equal(notifications.length, 2);

  assert.equal(this.$(notifications[0]).hasClass('new'), true);
  assert.equal(this.$(notifications[1]).hasClass('new'), false);
});

test('it renders no more than `numNotifications` notifications', function (assert) {
  assert.expect(1);

  this.set('notifications', [
    { message: 'a' }, { message: 'b' },
    { message: 'c' }, { message: 'd' },
  ]);

  this.render(hbs`{{notification-list renderNotifications=true
                    notifications=notifications numNotifications=3}}`);

  const notifications = this.$('.notifications > li');
  assert.equal(notifications.length, 3);
});
