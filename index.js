#!/usr/bin/env node
const { existsSync, readFile, writeFileSync, watchFile } = require('fs')
const { redBright } = require('chalk')
const { default: emmet } = require('emmet')

if (process.argv.length < 3) {
  // when input file path is not provided
  if (existsSync('./index.emmet')) {
    render('./index.emmet', './index.html')
    process.exit(0)
  } else {
    console.log(redBright('dotemmet: missing file operand') + '\nTry \'dotemmet --help\' for more infomation')
    process.exit(1)
  }
}

if (process.argv.includes('-h') || process.argv.includes('--help')) {
  console.log(
    'Usage: dotemmet SOURCE [options...]\n'
    + '  or: dotemmet SOURCE DEST [options...]\n'
    + 'Render .emmet file(SOURCE) to .html file(DEST)\n\n'
    + '==options==\n'
    + '-h --help: print this help message\n'
    + '-w --watch: watching SOURCE file and render at saving\n\n'
    + '==examples==\n'
    + 'dotemmet : render index.emmet file to index.html\n'
    + 'dotemmet source.emmet : render source.emmet file to source.emmet.html\n'
    + 'dotemmet source.emmet rendered.html : render source.emmet file to rendered.html'
  )
  process.exit(0)
}

if (process.argv.includes('-w') || process.argv.includes('--watch')) {
  console.log('Watching: ' + process.argv[2])
  watchFile(process.argv[2], { interval: 100 }, () => {
    const date = new Date()
    console.log('[' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') + '] Rendered')
    render(process.argv[2], process.argv[3] || process.argv[2] + '.html')
  })
}

render(process.argv[2], process.argv[3] || process.argv[2] + '.html')

function render (input, output) {
  readFile(input, (err, data) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    let r = '', tap = 0

    data
      .toString('utf-8')
      .split('\n')
      .forEach((v) => {
        if (v.trim().length < 1) return
        else if (v.startsWith('  '.repeat(tap + 1))) {
          r += '>' + v.split('  '.repeat(tap + 1)).splice(1).join('  ').trim()
          tap++
        } else if (tap < 1) {
          r += v
        } else if (v.startsWith('  '.repeat(tap))) {
          r += '+' + v.split('  '.repeat(tap)).splice(1).join('').trim()
        } else if (v.startsWith('  '.repeat(tap - 1))) {
          r += '^' + v.split('  '.repeat(tap - 1)).splice(1).join('').trim()
          tap--
        }
      })
      
    writeFileSync(output, emmet(r))
  })
}
