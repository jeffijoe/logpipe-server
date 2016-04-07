// Super fast!
const html = `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8' />
  <title>Logpipe</title>
</head>
<body>
  Hello!
  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io('http://localhost:4321');
    socket.on('newLog', function (data) {
      console.log('i got a big log', data);
    });
  </script>
</body>
</html>
`;

export default function view() {
  return html;
}