const dotenv = require('dotenv');
const https = require('https');
const http = require('http');
const fs = require('fs');

dotenv.load();
const env = process.env;

const exSync = fs.existsSync;
const reSync = fs.readFileSync;

const log = env.MODE == 'dev' ? console.log : ()=>{};

const PORT_HTTP = env.PORT_HTTP || 3000;
const PORT_HTTPS = env.PORT_HTTPS || 3030;
const PATH_KEY = env.PATH_KEY || './keys/agent-key.pem';
const PATH_CERT = env.PATH_CERT || './keys/agent-cert.cert';


const options = {
	key: exSync(PATH_KEY) ? reSync(PATH_KEY) : null,
	cert: exSync(PATH_CERT) ? reSync(PATH_CERT) : null
};

const server = http.createServer((_req, _res) => {
	_res.writeHead(200, {"Content-Type": "text/html"});
	_res.write('Hello World!');
	_res.end();
	log(`${_req.method}: ${_req.url} ${_res.statusCode}`);
});

const serverSecure = https.createServer(options, (_req, _res) => {
	_res.writeHead(200, {"Content-Type": "text/html"});
	_res.write('Hello secure World!');
	_res.end();
	log(`${_req.method}: ${_req.url} ${_res.statusCode}`);
});

server.listen(PORT_HTTP);
serverSecure.listen(PORT_HTTPS);

log('The secure and not secure server run !');