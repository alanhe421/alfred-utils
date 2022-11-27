export { default as http } from './http';
export { default as utils } from './utils';
export { default as dateUtils } from './date-utils';
export { Workflow } from './workflow';
export { WorkflowUpdater } from './workflow-updater';

/**
 * @description 读取命令参数
 * @deprecated 推荐使用inputParams
 */
export const input = process.argv[2];

export const inputParams = process.argv.slice(2);
