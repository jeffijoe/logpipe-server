// Super fast!
const html = `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8' />
  <title>Logpipe</title>
</head>
<body>
  <div id="app" />
  <script src="/socket.io/socket.io.js"></script>
  <script>
    window.socket = io();
  </script>
  <script src="/bundle.js"></script>
</body>
</html>
`;

export default function view() {
  return html;
}