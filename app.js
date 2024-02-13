const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    let responseText = '';

    if (url === '/home') {
        responseText = 'Welcome home';
    } else if (url === '/about') {
        responseText = 'Welcome to About Us page';
    } else if (url === '/node') {
        responseText = 'Welcome to my Node Js project';
    } else {
        responseText = '404 Not Found';
    }

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<body><h1>' + responseText + '</h1></body>');
    res.end('</html>');
});

server.listen(4000);
