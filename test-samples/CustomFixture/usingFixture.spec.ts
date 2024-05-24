import { test, expect } from './custom-fixture';

test.beforeEach(async ({ settingsPage }) => {
  await settingsPage.switchToDarkMode();
});

test('basic test', async ({ todoPage, page }) => {
  await todoPage.addToDo('something nice');
  await expect(page.getByTestId('todo-title')).toContainText(['something nice']);
  // await todoPage.validateTodoTitle('something nice');
});

test('add and remove all items', async ({ todoPage, page }) => {
    await todoPage.addToDo('something nice');
    await todoPage.addToDo('something else');
    await todoPage.removeAll();
    await expect(page.getByTestId('todo-title')).toBeHidden();
  });