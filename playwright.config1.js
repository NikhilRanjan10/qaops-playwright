// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

const config = {
  testDir: './tests',
  timeout: 40*1000,
  expect:{
    timeout: 5*1000
  },
  reporter: 'html',
  projects:[
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off'
  }
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on'
  }
    }
  ],
  
 
  }
  module.exports = config;


