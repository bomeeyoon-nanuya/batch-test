import 'dotenv/config';
import { test, expect } from '@playwright/test';

globalThis.adminMemberId = process.env.ADMIN_MEMBER_ID || '';
globalThis.adminPassword = process.env.ADMIN_PASSWORD || '';
globalThis.adminMemberName = process.env.ADMIN_NAME || '';

test('일반 회원 로그인', async ({ page }) => {
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115 Safari/537.36'
    });

    await page.goto('https://service.shopby.co.kr/login?redirectUrl=%2F', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });

  // 페이지 로드 대기
  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: '아이디 입력' }).dblclick();
  await page.getByRole('textbox', { name: '아이디 입력' }).fill(globalThis.adminMemberId);

  await page.getByRole('textbox', { name: '비밀번호 입력' }).click();
  await page.getByRole('textbox', { name: '비밀번호 입력' }).fill(globalThis.adminPassword);

  await page.getByRole('button', { name: '로그인', exact: true }).click();

  // 로그인 응답 대기
  await page.waitForTimeout(7000);

  await page.goto('https://service.shopby.co.kr/member/list');
  
  // 어드민 조회 응답 대기
  await page.waitForTimeout(3000);

  await expect(page.locator('#admin_wrap')).toContainText(globalThis.adminMemberName);
});