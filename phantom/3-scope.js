var page = new WebPage();

page.open("http://localhost:8080/coucou.html", function (status) {
  var x = 0;
  page.evaluate(function () {
    x = 1;
  });
  console.log(x); // 0
  phantom.exit();
});
