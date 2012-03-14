var page = new WebPage();


page.open("http://localhost:8080/coucou.html", function (status) {
  // Note: thrown exceptions hangs the whole process
  console.log(document); // → "document" exists but BEWARE: THIS IS NOT THE PAGE'S ONE!!
  console.log(page.evaluate(function () { return document.title; })); // → Now this is the expected document
  // Evaluated on browser: no output shown !
  page.evaluate(function () { console.log('coucou'); });

  // Run tests, one at a time
  run_tests(test_timers, test_buttons, test_css, function () {
    console.log('[' + (assert.errors > 0 ? '!' : '✔') + '] ' + (assert.tests-assert.errors) + '/' + assert.tests + ' tests passed.');
    // Finish process
    phantom.exit(assert.errors);
  });
});








// Timers
function test_timers(next) {
  console.log('Testing timers...');
  assert.equal(page.evaluate(function () { return document.querySelector('title').innerHTML; }), 'COUCOU TOTO');
  assert.equal(page.evaluate(function () { return document.querySelector('#coucou').innerHTML; }), 'toto');
  setTimeout(function () {
    assert.equal(page.evaluate(function () { return document.title; }), 'COUCOU GAMIN');
    assert.equal(page.evaluate(function () { return document.querySelector('#coucou').innerHTML; }), 'gamin');

    next();
  }, 3000);
}

// Button
function test_buttons(next) {
  console.log('Testing button...');
  page.evaluate(function() { document.getElementById('btn').click(); });
  assert.equal(page.evaluate(function () { return document.querySelector('#coucou').innerHTML; }), 'poney');
  setTimeout(function () {
    assert.equal(page.evaluate(function () { return document.querySelector('#coucou').innerHTML; }), 'gamin');

    next();
  }, 1500);
}

// Play with CSS
function test_css(next) {
  console.log('Testing CSS...');
  // Good boys compute styles
  var color = page.evaluate(function () { return getComputedStyle(document.getElementById("coucou")).color; });
  console.log('Color: ' + color);
  assert.equal(page.evaluate(function () { return document.querySelector('#style').href.replace(/^.*\//, ''); }), 'red.css');
  assert.ok(page.evaluate(function () {
    var as = document.querySelectorAll('a');
    for (var i=0; i<as.length; i++) {
      if (as[i].innerHTML == 'Change color') {
        if (as[i].click) as[i].click(); else if (as[i].onclick) as[i].onclick();
        return true;
      }
    }
    return false;
  }));
  assert.equal(page.evaluate(function () { return document.querySelector('#style').href.replace(/^.*\//, ''); }), 'blue.css');

  setTimeout(next, 100);
}












































function run_tests() {
  var cb = function () {};
  function add_cb(cb, next) {
    return function () {
      try {
        cb(next);
      } catch (err) {

      }
    };
  }
  for (var i=arguments.length-1; i>=0; i--) {
    cb = add_cb(arguments[i], cb);
  }
  cb();
}

































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
