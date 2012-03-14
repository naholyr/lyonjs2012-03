var casper = require('casper').create(); // Don't be fooled, THIS IS NOT NODE

casper.start('http://localhost:8080/coucou.html', function() {
  // Note: thrown exceptions act just like with phantom
});

// Timers
casper.then(function () {
  console.log('Testing timers…');
  this.capture('1.png');
  this.test.assertTitle('COUCOU TOTO');
  this.test.assertEval(function () { return __utils__.findOne('#coucou').innerHTML == 'toto'; }, '#coucou = "toto"');
  this.wait(2000, function () {
    this.capture('2.png');
    this.test.assertEvalEquals(function () { return document.title; }, 'COUCOU GAMIN', 'title = "COUCOU GAMIN" after 2s');
    this.test.assertEvalEquals(function () { return document.querySelector('#coucou').innerHTML; }, 'gamin', '#coucou = "gamin" after 2s');
  });
});

// Button
casper.then(function () {
  console.log('Testing button...');
  this.click('#btn');
  this.test.assertEvalEquals(function () { return __utils__.findOne('#coucou').innerHTML; }, 'poney', '#coucou = "poney"');
  this.wait(1500, function () {
    this.test.assertEvalEquals(function () { return __utils__.findOne('#coucou').innerHTML; }, 'gamin', '#coucou = "gamin" after 1.5s');
  });
});

// Play with CSS
casper.then(function () {
  console.log('Testing CSS...');
  this.test.assertEvalEquals(function () { return getComputedStyle(document.querySelector('#coucou')).color; }, 'rgb(255, 0, 0)', '#coucou is red');
  this.test.assertEval(function () {
    // Note the "!!" → required because "assertEval()" expects a BOOLEAN, NOTHING ELSE
    return !!document.querySelector('#style').href.match(/red\.css$/);
  }, 'Loaded red.css');
  this.test.assertEval(function () {
    var as = document.querySelectorAll('a');
    for (var i=0; i<as.length; i++) {
      if (as[i].innerHTML == 'Change color') {
        if (as[i].click) as[i].click(); else if (as[i].onclick) as[i].onclick(); else return false;
        return true;
      }
    }
    return false;
  }, 'Found link and clicked');
  this.test.assertEval(function () { return !!document.querySelector('#style').href.match(/blue\.css$/); }, 'Loaded blue.css');
  this.wait(100, function () { // Wait for DOM to be reloaded for styles to be applied
    this.test.assertEvalEquals(function () { return getComputedStyle(document.querySelector('#coucou')).color; }, 'rgb(0, 0, 255)', '#coucou is blue');
  });
});

// Run tests
casper.run(function() {
    this.test.renderResults(true);
});
