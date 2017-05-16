#!/usr/bin/env node

const pkg          = require('./package.json')
const superbundler = require('./superbundler')
const program      = require('commander')

program
  .version(pkg.version)
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

program
    .command('build [input] [output]')
    // .option('-i, --input', 'Input file')
    // .option('-o, --output', 'Output file')
    .action((input, output, options) => {
        console.log(`${input} -> ${output}`)
        superbundler(input, output)
    })

program.parse(process.argv)
