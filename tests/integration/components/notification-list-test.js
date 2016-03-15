import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-list', 'Integration | Component | notification list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{notification-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#notification-list}}
      template block text
    {{/notification-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it renders a message when there are no notifications', function(assert) {
  assert.expect(1);

  this.render(hbs`{{notification-list renderNotifications=true}}`);

  assert.equal(
    this.$('.empty span').text().trim(),
    'You have no notifications yet.'
  );
});
