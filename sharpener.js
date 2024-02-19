const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // Read existing messages from the file
    fs.readFile('message.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      // Split the file contents into an array of messages
      const messages = data ? data.split('\n') : [];
      
      // Respond with a simple HTML form
      res.write('<html>');
      res.write('<head><title>Enter Message</title></head>');
      res.write('<body>');
      res.write('<h2>Messages</h2>');
      res.write('<ul>');
      // Display existing messages at the top of the form
      messages.forEach(message => {
        if (message.trim() !== '') {
          res.write(`<li>${message}</li>`);
        }
      });
      res.write('</ul>');
      res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  }

  if (url === '/message' && method === 'POST') {
    // Handle POST requests to /message
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      // Concatenate the chunks to get the complete body
      const parsedBody = Buffer.concat(body).toString();
      // Extract the message from the form data
      const message = parsedBody.split('=')[1];
      // Append the new message to the file
      fs.appendFile('message.txt', message + '\n', err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }
        // Redirect the user back to the root URL after writing the file
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  // Default response for other routes
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(7000);
