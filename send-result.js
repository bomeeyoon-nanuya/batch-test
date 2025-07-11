import fs from 'fs';
import https from 'https';

const webhookUrl = process.env.DOORAY_WEBHOOK_URL;
const testResult = fs.readFileSync('result.txt', 'utf8').slice(-2000); // 길면 자르기
const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

const message = {
  botName: 'playwright test bot 🤖',
  text: null,
  attachments: [
    {
      title: `🧪 Playwright 테스트 결과 - ${timestamp}`,
      text: `\`\`\`\n${testResult}\n\`\`\``,
      color: testResult.includes('failed') ? '#ff4d4f' : '#28a745'
    }
  ]
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
  console.log(`Dooray 응답 상태: ${res.statusCode}`);
});

req.on('error', (error) => {
  console.error(`메시지 전송 실패: ${error.message}`);
});

req.write(payload);
req.end();
