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

  test('it detects the expenses pasted in the data field and informs the user', async function(assert) {
    await visit('/');

    await fillIn('textarea', '05 24 U396257486 05 27 CRU DEUX-MONTAGNES DEUX-MONTAGNE QC 18.00');

    assert.dom('[data-test-detected-expenses]').hasText('Detected 1 expense(s) totaling 18$.');

    await fillIn('textarea', `
      05 24 U396257486 05 27 CRU DEUX-MONTAGNES DEUX-MONTAGNE QC 18.00
      05 24 U407067110 05 27 ROTISSERIE FUSEE MONTREAL QC 14.95
      05 25 U407097522 05 27 IGA MARCHE LAMOUREUX DEUX-MONTAGNE QC 38.43
    `);

    assert.dom('[data-test-detected-expenses]').hasText('Detected 3 expense(s) totaling 71.38$.');
  });

  test('it transitions to the splitting route once the form has been submitted', async function(assert) {
    await visit('/');

    await fillIn('input', 'Amanda, Beatrice, Catherine');
    await fillIn('textarea', '05 24 U396257486 05 27 CRU DEUX-MONTAGNES DEUX-MONTAGNE QC 18.00');

    await click('button');

    assert.equal(currentRouteName(), 'split');

    assert.dom('[data-test-person]').exists({ count: 3 });
    assert.dom('[data-test-expense').exists();
  });
});
