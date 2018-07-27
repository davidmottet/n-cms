const Parse = require('path').parse;

function router(_req, _res) {
	const url = Parse(_req.url);
	_res.writeHead(200, {"Content-Type": "text/html"});
	_res.write('Hello World!');
	_res.end();
	console.log(url); }

module.exports = router