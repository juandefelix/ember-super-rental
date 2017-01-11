import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('should redirect to rentals route', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});

test('should list available rentals.', function (assert) {
  visit('/');
  andThen(function(){
    assert.equal(find('.listing').length, 3, 'should see three listings');
  });
});

test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function(){
    asset.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information.', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function(){
    asset.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

test('should filter the list of rentals by city.', function (assert) {
  visit('/');
  fillIn('.list-filter input', 'seattle');
  keyEvent('.list-filter input', 'keyUp', 69);
  andThen(function(){
    assert.equal(find('.listing'), 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 item with location Seattle');
  })
});

test('should show details for a specific rental', function (assert) {
  visit('/');
  click('a:contains("Grand Old Mansion")');
  andThen(function(){
    assert.equal(currentURL(), '/rentals/grand-old-mansion', 'should navigate to show route');
    assert.equal(find('.show-listing H2').text(), "Grand Old Mansion", 'should list rental title');
    assert.equal(find('.description').length(), 1, 'should list a description of the property');
  })
});