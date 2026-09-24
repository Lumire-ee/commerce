import { test, expect } from '@playwright/test';

test.describe('ATELIER E-Commerce E2E 테스트 스위트', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 접속 및 DOM 준비 대기
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('[P0] 옵션 상품 퀵뷰 유도 ➔ 옵션/수량 변경 ➔ 장바구니 담기 ➔ 무료배송 계산 ➔ 주문 완료 플로우', async ({ page }) => {
    // 1. 베스트셀러 섹션 내의 옵션 상품(오버사이즈 울 캐시미어 블렌드 블레이저) 카드 탐색 (정확한 스코핑)
    const blazerCard = page.locator('#bestsellers article').filter({ hasText: '오버사이즈 울 캐시미어 블렌드 블레이저' });
    await expect(blazerCard).toBeVisible();

    // 2. '옵션 선택' 버튼 클릭 시 바로 담기지 않고 퀵뷰 모달이 열리는지 확인
    await blazerCard.getByRole('button', { name: '옵션 선택' }).click();

    // 3. 퀵뷰 모달 헤딩 확인
    const modalTitle = page.locator('#modal-product-title');
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toContainText('오버사이즈 울 캐시미어 블렌드 블레이저');

    // 4. 색상 및 사이즈 라디오 버튼 변경
    const oatmealRadio = page.getByRole('radio', { name: '오트밀 베이지' });
    await oatmealRadio.click();
    await expect(oatmealRadio).toHaveAttribute('aria-checked', 'true');

    const sizeLRadio = page.getByRole('radio', { name: 'L (105)' });
    await sizeLRadio.click();
    await expect(sizeLRadio).toHaveAttribute('aria-checked', 'true');

    // 5. 수량 2개로 증가
    const modal = page.locator('div[role="dialog"]');
    await modal.getByRole('button', { name: '수량 증가' }).click();

    // 6. 장바구니 담기 버튼 클릭
    await modal.getByRole('button', { name: /장바구니 담기/ }).click();

    // 7. 퀵뷰 모달이 닫히고 장바구니 드로어가 자동으로 열리는지 확인
    await expect(modalTitle).not.toBeVisible();
    const cartTitle = page.locator('#cart-drawer-title');
    await expect(cartTitle).toBeVisible();

    // 8. 장바구니 드로어 스코핑 (#cart-drawer-title을 가진 aside)
    const cartDrawer = page.locator('aside').filter({ has: page.locator('#cart-drawer-title') });
    await expect(cartDrawer).toContainText('오트밀 베이지');
    await expect(cartDrawer).toContainText('368,000원');
    await expect(cartDrawer).toContainText('전 상품 무료배송');

    // 9. 주문하기 클릭 및 성공 피드백 확인
    await cartDrawer.getByRole('button', { name: /주문하기/ }).click();
    await expect(cartTitle).not.toBeVisible();
    await expect(page.locator('aside[aria-label="알림 메시지 목록"]')).toContainText('주문서 생성 완료');
  });

  test('[P1] 실시간 라이브 검색 자동완성 및 베스트셀러 필터링 연동 검증', async ({ page }) => {
    // 1. 데스크톱 뷰포트 크기 보장 (1280x720)
    await page.setViewportSize({ width: 1280, height: 720 });

    // 2. 검색창에 '헤드폰' 입력
    const searchContainer = page.locator('div[role="search"]');
    const searchInput = searchContainer.getByLabel('상품 검색어 입력');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('헤드폰');

    // 3. 검색창 내부 실시간 드롭다운 노출 확인 (정확한 스코핑)
    await expect(searchContainer.getByText(/'헤드폰' 검색 결과/)).toBeVisible();
    await expect(searchContainer.getByText('미니멀 노이즈캔슬링 무선 헤드폰 PRO')).toBeVisible();

    // 4. 베스트셀러 섹션 필터 상태바 확인
    const bestsellerSection = page.locator('#bestsellers');
    await expect(bestsellerSection.getByText(/'헤드폰' 검색 결과/)).toBeVisible();

    // 5. 필터 해제 클릭 시 원래 목록으로 복원
    await bestsellerSection.getByRole('button', { name: '필터 해제' }).click();
    await expect(bestsellerSection.getByText(/'헤드폰' 검색 결과/)).not.toBeVisible();
  });

  test('[P1] 새로고침 시 장바구니 및 위시리스트 상태 유지 (localStorage 영속화) 검증', async ({ page }) => {
    // 1. 베스트셀러 첫 번째 상품 위시리스트 토글
    const firstCard = page.locator('.product-card').first();
    const wishBtn = firstCard.getByLabel(/위시리스트/);
    await wishBtn.click();

    // 2. 위시리스트 뱃지 숫자 기록
    const initialWishCount = await page.getByLabel(/관심상품 목록/).locator('span').last().innerText();

    // 3. 페이지 새로고침
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // 4. 새로고침 후에도 위시리스트 뱃지 숫자가 동일하게 유지되는지 확인
    const reloadedWishCount = await page.getByLabel(/관심상품 목록/).locator('span').last().innerText();
    expect(reloadedWishCount).toBe(initialWishCount);
  });

  test('[P2] 퀵뷰 모달 열림 시 배경 스크롤 락 및 ESC 키 닫기 검증', async ({ page }) => {
    // 1. 베스트셀러 상품 미리보기 클릭
    const firstCard = page.locator('.product-card').first();
    await firstCard.getByLabel(/미리보기/).click();

    // 2. 모달 노출 확인
    await expect(page.locator('#modal-product-title')).toBeVisible();

    // 3. document.body.style.overflow가 hidden으로 변경되었는지 검증 (스크롤 락)
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');

    // 4. Escape 키를 눌러 모달 닫기
    await page.keyboard.press('Escape');
    await expect(page.locator('#modal-product-title')).not.toBeVisible();

    // 5. body.style.overflow가 정상적으로 복구되었는지 검증
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).toBe('');
  });

  test('[P3] 뉴스레터 이메일 유효성 검사 및 구독 완료 피드백 검증', async ({ page }) => {
    const emailInput = page.getByLabel('뉴스레터 수신 이메일 주소');
    await emailInput.scrollIntoViewIfNeeded();

    // 1. 유효하지 않은 이메일 제출 시 에러 확인
    await emailInput.fill('invalid-email-format');
    await page.getByRole('button', { name: '쿠폰 받기' }).click();
    await expect(page.locator('#newsletter-error')).toBeVisible();
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');

    // 2. 올바른 이메일 제출 시 성공 상태 전환 확인
    await emailInput.fill('tester@example.com');
    await page.getByRole('button', { name: '쿠폰 받기' }).click();
    await expect(page.getByText('구독 신청이 완료되었습니다!')).toBeVisible();
  });

  test('[P3] SEO 엔드포인트 (/robots.txt, /sitemap.xml) 정상 응답 검증', async ({ page }) => {
    // 1. /robots.txt 검증 (대소문자 무관 검증)
    const robotsRes = await page.request.get('/robots.txt');
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText.toLowerCase()).toContain('sitemap: https://atelier-commerce.com/sitemap.xml');

    // 2. /sitemap.xml 검증
    const sitemapRes = await page.request.get('/sitemap.xml');
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain('https://atelier-commerce.com');
  });
});
