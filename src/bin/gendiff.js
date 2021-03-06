#!/usr/bin/env node
import program from 'commander';
import makeDiff from '../index.js';

program
  .version('0.7.9')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: default, plain or json', 'default')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = makeDiff(firstConfig, secondConfig, program.format);

    console.log(diff);
  });

program.parse(process.argv);
