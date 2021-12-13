const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.nordvpn.com',
  path: '/server',
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'cache-control': 'cache-control: max-age=0',
  },
  method: 'GET',
  port: 443,
};
options.agent = new https.Agent(options);

https.get(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      let json = JSON.parse(body);
      const ips = json.map((server) => server.ip_address).join('\n');

      fs.writeFileSync('ips.csv', ips);
    } catch (error) {
      console.error(error.message);
    }
  });
})
  .on('error', console.log);
