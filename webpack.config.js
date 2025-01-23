// @ts-check
import { init, chainWebpack, resolveConfig } from '@nativescript/webpack';
import { resolve } from 'path';

export default (env) => {
  init(env);

  chainWebpack((config) => {
    // Add any custom webpack configurations here
    config.resolve.alias.set('@', resolve(process.cwd(), 'app'));
  });

  return resolveConfig();
};