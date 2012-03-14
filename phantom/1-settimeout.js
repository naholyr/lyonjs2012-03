var page = new WebPage();

page.open("http://localhost:8080/coucou.html", function (status) {
  assert.equal(page.evaluate(function () { return document.querySelector('title').innerHTML; }), 'COUCOU TOTO');
  setTimeout(function () {
    assert.equal(page.evaluate(function () { return document.title; }), 'COUCOU GAMIN');

    console.log('[' + (assert.errors > 0 ? '!' : '✔') + '] ' + (assert.tests-assert.errors) + '/' + assert.tests + ' tests passed.');
    phantom.exit(assert.errors);
  }, 3000);
});




















































var assert = {
  "errors": 0,
  "tests": 0,
  "equal": function assert_equal (value, expected) {
    assert.tests++;
    if (value != expected) {
      console.error('[!] ' + value + ' ≠ ' + expected);
      assert.errors++;
    }
  },
  "ok": function assert_ok (value) {
    assert.tests++;
    if (!value) {
      console.log('[!] ' + value + ' is falsey');
      assert.errors++;
    }
  }
};
