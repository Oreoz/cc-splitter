import { module, test } from 'qunit';
import { visit, currentRouteName, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | splitting expenses', function(hooks) {
  setupApplicationTest(hooks);

  test('it redirects to the index when no information is loaded in the store', async function(assert) {
    await visit('/split');
    
    assert.equal(currentRouteName(), 'index');
  });
  
  test('as a 👨‍💻, I want to assign expenses to persons', async function(assert) {
    const store = this.owner.lookup('service:store');
    
    store.createRecord('person', { name: 'Amelia' });
    store.createRecord('person', { name: 'Beatrice' });
    store.createRecord('person', { name: 'Clemence' });

    store.createRecord('expense', { amount: 1.00, date: '01-01-2019', description: 'ACME INC.' });
    store.createRecord('expense', { amount: 2.00, date: '01-02-2019', description: 'ACME INC.' });
    store.createRecord('expense', { amount: 3.00, date: '01-03-2019', description: 'ACME INC.' });
    store.createRecord('expense', { amount: 4.00, date: '01-04-2019', description: 'ACME INC.' });
    store.createRecord('expense', { amount: 5.00, date: '01-05-2019', description: 'ACME INC.' });
    
    await visit('/split');

    assert.dom('[data-test-person]').exists({ count: 3 });
    assert.dom('[data-test-expense]').exists({ count: 5 });
    
    await click('[data-test-button-target="Amelia"]');
    await click('[data-test-button-target="Amelia"]');
    await click('[data-test-button-target="Beatrice"]');
    await click('[data-test-button-target="Beatrice"]');
    await click('[data-test-button-target="Clemence"]');

    assert.dom('[data-test-expenses-for="Amelia"]').hasText('2 expense(s)');
    assert.dom('[data-test-expenses-for="Beatrice"]').hasText('2 expense(s)');
    assert.dom('[data-test-expenses-for="Clemence"]').hasText('1 expense(s)');

    assert.dom('[data-test-total-for="Amelia"]').hasText('3.00$');
    assert.dom('[data-test-total-for="Beatrice"]').hasText('7.00$');
    assert.dom('[data-test-total-for="Clemence"]').hasText('5.00$');
  });
});
