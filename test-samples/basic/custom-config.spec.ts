import { test, expect, type Page } from '@playwright/test';

// config slowMo to 1 second

test.use(
  { launchOptions: { 
    slowMo: 1_000,
    // headless: false
   } 
  }
);

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  // console.log('Performing beforeEach...');
});


const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test('should allow me to add todo items - SLOW MO', { tag:"@slowmo"}, async ({ page }) => {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  // Create 1st todo.
  await newTodo.fill(TODO_ITEMS[0]);
  await newTodo.press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.getByTestId('todo-title')).toHaveText([
    TODO_ITEMS[0]
  ]);

  // Create 2nd todo.
  await newTodo.fill(TODO_ITEMS[1]);
  await newTodo.press('Enter');

  // Make sure the list now has two todo items.
  await expect(page.getByTestId('todo-title')).toHaveText([
    TODO_ITEMS[0],
    TODO_ITEMS[1]
  ]);
});