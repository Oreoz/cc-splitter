import { module, test } from 'qunit';
import { visit, currentRouteName, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | filling the form', function(hooks) {
  setupApplicationTest(hooks);

  test('it does not allow submision when the form is empty', async function(assert) {
    await visit('/');

    assert.equal(currentRouteName(), 'index');
    assert.dom('button.cursor-not-allowed').exists();
  });

  test('it transitions to the splitting route once the form has been submitted', async function(assert) {
    await visit('/');

    await fillIn('input', 'Amanda, Beatrice, Catherine');
    await fillIn('textarea', '05 24 U396257486 05 27 CRU DEUX-MONTAGNES DEUX-MONTAGNE QC 18.00');

    await click('button');

    assert.equal(currentRouteName(), 'split');
  });
});
