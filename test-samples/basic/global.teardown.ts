import { test as teardown } from '@playwright/test';

teardown('Global Teardown', async ({ }) => {
  console.log('executing global teardown...');
});