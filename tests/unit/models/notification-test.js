import { moduleForModel, test } from 'ember-qunit';

moduleForModel('notification', 'Unit | Model | notification', {
  needs: []
});

test('it exists', function (assert) {
  assert.expect(1);

  const model = this.subject();

  assert.ok(!!model);
});

test('it should have a creation date', function (assert) {
  assert.expect(1);

  const model = this.subject({ created: new Date() });

  assert.equal(model.get('created'), model.get('creationDate'));
});
