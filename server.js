var express = require('express');

var app = express();

app.use(express.static('./public/'));

app.listen(8888);
console.log("React library server is running at port 8888");
