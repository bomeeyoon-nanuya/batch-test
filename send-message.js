// send-message.js
import https from 'https';

const webhookUrl = process.env.DOORAY_WEBHOOK_URL;

const message = {
  botName: '배치봇 🤖',
  text: 'hello 👋'
};

const payload = JSON.stringify(message);
const url = new URL(webhookUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`✅ Dooray 응답 상태 코드: ${res.statusCode}`);
});

req.on('error', (error) => {
  console.error(`❌ 메시지 전송 실패: ${error.message}`);
});

req.write(payload);
req.end();
