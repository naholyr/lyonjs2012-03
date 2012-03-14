var casper = require('casper').create(); // Don't be fooled, THIS IS NOT NODE

casper.start('http://localhost:8080/coucou.html', function() {
  // Note: thrown exceptions act just like with phantom
});

// Timers
casper.then(function () {
  console.log('Testing timers…');
  this.test.assertTitle('COUCOU TOTO');
  this.test.assertEval(function () { return __utils__.findOne('#coucou').innerHTML == 'toto'; }, '#coucou = "toto"');
  this.wait(3000, function () {
    this.test.assertEvalEquals(function () { return document.title; }, 'COUCOU GAMIN', 'title = "COUCOU GAMIN"');
    this.test.assertEvalEquals(function () { return document.querySelector('#coucou').innerHTML; }, 'gamin', '#coucou = "gamin"');
  });
});

casper.run(function() {
  this.test.renderResults(true); // Ah! 4 tests \o/
});

