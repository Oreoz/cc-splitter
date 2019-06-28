import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-money', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats numbers', async function(assert) {
    this.set('input', 69.69);

    await render(hbs`{{format-money input}}`);

    assert.equal(this.element.textContent.trim(), '69.69$');
  });

  test('it formats strings', async function(assert) {
    this.set('input', '69.69');

    await render(hbs`{{format-money input}}`);

    assert.equal(this.element.textContent.trim(), '69.69$');
  });
});
