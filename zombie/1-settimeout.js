var Browser = require("zombie");
var assert = require("assert");

(new Browser()).visit("http://localhost:8080/coucou.html", function (err, browser, status) {
  assert.equal(browser.text('title'), 'COUCOU TOTO');
  setTimeout(function () {
    assert.equal(browser.evaluate('document.title'), 'COUCOU GAMIN');
  }, 3000);
});
