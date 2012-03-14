var Browser = require("zombie");
var assert = require("assert");

// Load the page from localhost
(new Browser()).visit("http://localhost:8080/coucou.html", {
  "debug": true,
  "runScripts": true,
  "loadCSS": true
}, function (err, browser, status) {

  // Run tests, one at a time
  run_tests(test_timers, test_buttons, test_css, function () {
    console.log('All tests passed :)');
  });

  // Timers
  function test_timers(next) {
    console.log('Testing timers...');
    assert.equal(browser.text('title'), 'COUCOU TOTO');
    assert.equal(browser.text('#coucou'), 'toto');
    browser.wait(3000, function () {
      assert.equal(browser.evaluate('document.title'), 'COUCOU GAMIN');
      assert.equal(browser.text('#coucou'), 'gamin');

      next();
    });
  }

  // Button
  function test_buttons(next) {
    console.log('Testing button...');
    browser.pressButton('#btn', function () {
      assert.equal(browser.text('#coucou'), 'poney');
      browser.wait(1500, function () {
        assert.equal(browser.text('#coucou'), 'gamin');

        next();
      });
    });
  }

  // Play with CSS
  function test_css(next) {
    console.log('Testing CSS...');
    // Y U NO COMPUTE STYLES ? ><
    console.log('Color:', browser.evaluate('getComputedStyle(document.getElementById("coucou")).color'));
    // null :'(
    assert.equal(browser.query('#style').href, 'red.css');
    browser.clickLink('Change color', function () {
      assert.equal(browser.query('#style').href, 'blue.css');
    });

    browser.wait(100, next);
  }

});






























function run_tests() {
  var cb = function () {};
  function add_cb(cb, next) {
    return function () {
      cb(next);
    };
  }
  for (var i=arguments.length-1; i>=0; i--) {
    cb = add_cb(arguments[i], cb);
  }
  cb();
}
