const { spawn } = require('child_process')
const chalk = require('chalk')
const columns = require('cli-columns')
const yargs = require('yargs')
const files = require('./config/files.json')
const folders = require('./config/folders.json')

const parseColor = (arg) =>
  Array.isArray(arg) ? arg[0].split(',') : arg.split(',')

const { argv } = yargs
  .options({
    sort: {
      default: true,
      type: 'boolean'
    },
    'dir-color': {
      default: '234,254,132',
      type: 'string',
      coerce: (arg) => parseColor(arg)
    },
    'file-color': {
      default: '230,225,207',
      type: 'string',
      coerce: (arg) => parseColor(arg)
    },
    'meta-color': {
      default: '104,213,255',
      type: 'string',
      coerce: (arg) => parseColor(arg)
    },
    'error-color': {
      default: '255,101,101',
      type: 'string',
      coerce: (arg) => parseColor(arg)
    }
  })
  .coerce('_', (arg) => ['-p', ...arg])

const ls = spawn('ls', [...argv._])

const list = [...argv._]
  .join(' ').match(/\B-\w+/gi)
  .join('').match(/[ls]/g)

const iconizer = (item) => {
  if (/[^ ]+\//gi.test(item)) {
    const ext = item = item.split('').slice(0, -1).join('')
    const icon = folders[ext] ? folders[ext] : folders['folder']
    item = chalk.rgb(...argv['dir-color'])(`${icon}  ${item}`)
  } else {
    const ext = ([...item.match(/\.[0-9a-z]+$/gi) || []][0] || '')
      .split('').slice(1).join('')
    const icon = files[ext] ? files[ext] : files['file']
    item = chalk.rgb(...argv['file-color'])(`${icon}  ${item}`)
  }
  return item
}

let output = ''

ls.stdout.setEncoding('utf8')
ls.stdout.on('data', data => {
  output += data
})

ls.stderr.setEncoding('utf8')
ls.stderr.on('data', data => console.log(chalk.rgb(...argv['error-color'])(data)))

ls.on('close', code => {
  if (code !== 0) return false

  const results = output.split(/\r?\n\n/)
  const single = results.length === 1

  results.map(result => {
    const filenames = result.split(/\n/gi).filter(Boolean)
    if (!single) console.log(chalk.rgb(...argv['meta-color'])(filenames.shift()))
    if (list) console.log(chalk.bold.rgb(...argv['meta-color'])(filenames.shift()))

    if (argv.sort) {
      filenames.sort((a, b) => {
        if (a.charAt(a.length - 1) === '/') return -1
        if (a.charAt(a.length - 1) !== '/') return 1
        return 0
      })
    }

    const iconized = filenames.map(filename => {
      filename = iconizer(filename)
      if (filename.match(/[^ ]+\//gi)) filename = chalk.green(filename)
      return filename
    })

    if (list) {
      console.log(iconized.join('\n'))
    } else {
      console.log(columns(iconized, { sort: false }))
    }

    console.log()
  })
})
