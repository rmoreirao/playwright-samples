import { type Page, type Locator, expect } from '@playwright/test';

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;
    private readonly todoTitle: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
    this.todoTitle = this.page.getByTestId('todo-title');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
        await this.todoItems.first().hover();
        await this.todoItems.getByLabel('Delete').first().click();
    }
  }

  async validateTodoTitle(text: string) {
    await expect(this.todoTitle).toContainText([text]);
  }
}