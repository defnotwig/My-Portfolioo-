const { test, expect } = require('@playwright/test');

// Usage:
// BASE_URL=http://localhost:5173 npx playwright test .github/skills/webapp-testing/scripts/check_email_chat.spec.js

const TARGET_EMAIL = 'ludwigrivera13@gmail.com';

test.describe('Email links and Gabriel chat widget', () => {
  test('email links point to correct mailto and chat widget is floating and opens modal', async ({ page }) => {
    const base = process.env.BASE_URL || 'http://localhost:5173';
    await page.goto(base, { waitUntil: 'networkidle' });

    // 1) Check email links (href contains mailto with target email)
    const mailtoLocator = page.locator(`a[href=\"mailto:${TARGET_EMAIL}\"]`);
    // check existence (try exact match first)
    if (await mailtoLocator.count() === 0) {
      // fallback: search any mailto that contains the email
      const mailtoAny = page.locator('a[href^="mailto:"]');
      const mailtoCount = await mailtoAny.count();
      let foundEmail = false;
      for (let i = 0; i < mailtoCount; i++) {
        const href = await mailtoAny.nth(i).getAttribute('href');
        if (href && href.includes(TARGET_EMAIL)) {
          foundEmail = true;
          break;
        }
      }
      expect(foundEmail).toBeTruthy();
    } else {
      expect(await mailtoLocator.count()).toBeGreaterThan(0);
    }

    // 2) Locate the chat widget trigger (robust heuristics)
    const byName = page.locator('button:has-text("gabriel"), a:has-text("gabriel"), div:has-text("gabriel")');
    const byAria = page.locator('[aria-label*="chat" i], [data-testid*="chat" i], [data-chat*="gabriel" i]');
    let chatTrigger = null;
    if (await byName.count() > 0) chatTrigger = byName.first();
    else if (await byAria.count() > 0) chatTrigger = byAria.first();
    else {
      const anyChat = page.locator(':text("chat")');
      if (await anyChat.count() > 0) chatTrigger = anyChat.first();
    }

    expect(chatTrigger).not.toBeNull();

    // Ensure it's not inside the footer
    const isInFooter = await chatTrigger.evaluate((el) => {
      let cur = el;
      while (cur) {
        if (cur.tagName && cur.tagName.toLowerCase() === 'footer') return true;
        cur = cur.parentElement;
      }
      return false;
    });
    expect(isInFooter).toBeFalsy();

    // Ensure the trigger is floating lower-left (approx)
    const box = await chatTrigger.boundingBox();
    expect(box).not.toBeNull();
    const viewport = page.viewportSize() || { width: 1280, height: 800 };
    const nearLeft = box.x <= Math.max(24, viewport.width * 0.1);
    const nearBottom = box.y + box.height >= viewport.height - Math.max(24, viewport.height * 0.12);
    expect(nearLeft).toBeTruthy();
    expect(nearBottom).toBeTruthy();

    // 3) Click the chat trigger and ensure a chat modal opens with full chat content visible
    await chatTrigger.click();

    // Wait for a modal/dialog to appear (role=dialog or an element with large height)
    const dialog = page.locator('[role="dialog"]');
    if (await dialog.count() > 0) {
      await expect(dialog.first()).toBeVisible({ timeout: 4000 });
      const messages = dialog.locator('text=/./');
      expect(await messages.count()).toBeGreaterThan(0);
    } else {
      // fallback: detect any overlay element appearing with chat-like text
      await page.waitForTimeout(600);
      const overlays = await page.locator('div').filter({ hasText: /send|message|type a message|conversation|gabriel/i }).elementHandles();
      expect(overlays.length).toBeGreaterThan(0);
    }
  });
});
