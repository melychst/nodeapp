var pdf = require('html-pdf');
var path = require('path');

// this is very important, you have to put file:// before your path
// and normalize the resulting path


var imgSrc = "file://" + __dirname + '/public/image/logo.jpg';
console.log(imgSrc);
imgSrc =  path.normalize(imgSrc);
console.log(imgSrc);


// Options
var options = {
    "header": {
      "height": "50mm",
      "contents": "",
    },
    "footer": {
      "height": "28mm",
      "contents": "<span style='color: #444;'>{{page}}</span>///<span>{{pages}}</span>"
    }
  }
// put your entire header here and the content of the page outside the <div id="pageHeader"></div>
var result = "<div id='pageHeader'><img src='" + imgSrc + "' /><div>Author: Marc Bachmann</div></div>";
result += "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>";
var fileName = __dirname + '/tmp/graph.pdf';
        var time = new Date();
        console.log("Run create - " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());
pdf.create(result, options).toFile(fileName, function(err, res) {
  if (err) {
    console.error(err);
  }
  var time = new Date();
              console.log("Finish create - " + time.getMinutes() + " : " + time.getSeconds() + " : " + time.getMilliseconds());

});