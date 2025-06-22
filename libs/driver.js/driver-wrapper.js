/**
 * Driver.js 包装器 - 将ES模块导出为全局变量
 * 用于兼容现有的用户引导系统
 */

import { driver } from './driver.min.js';

// 将driver函数暴露为全局变量
window.Driver = driver;
window.driver = { driver: driver };

// 触发自定义事件，通知Driver.js已加载
const event = new CustomEvent('driverLoaded', { detail: { driver } });
window.dispatchEvent(event);

console.log('✅ Driver.js 已加载并暴露为全局变量');
