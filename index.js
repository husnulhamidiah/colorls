const { spawnSync } = require('child_process')
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

const args = [...argv._].join(' ').match(/\B-\w+/gi).join('')

const options = {
  list: !!args.match(/[ls]/g),
  oneline: !!args.match(/[1]/g),
  sort: argv.sort
}

/**
 results :
 [ '.:',
    'total 160',
    '-rw-r--r--    1 husnulhamidiah  staff   2827 Aug 21 17:33 README.md',
    'drwxr-xr-x    3 husnulhamidiah  staff     96 Aug 19 18:08 bin/'
    '',
    '.:',
    'total 160',
    '-rw-r--r--    1 husnulhamidiah  staff   2827 Aug 21 17:33 README.md',
    'drwxr-xr-x    3 husnulhamidiah  staff     96 Aug 19 18:08 bin/' ]
 */
const ls = spawnSync('ls', [...argv._], { encoding: 'utf8' })
let results = ls.stdout.split(/\r?\n/)
results.pop()

/**
 refResults :
 [ '.:',
  'total 121',
  'README.md',
  'bin/',
  '',
  '.:',
  'total 121',
  'README.md',
  'bin/' ]
 */
const flags = [
  // get all flags then remove l and s
  `-${args.replace(/[-ls]/g, '')}1p`,
  // get the rest argument e.g . ./config
  ...[...argv._].filter(flag => !flag.match(/\B-\w+/gi))
]
const reference = spawnSync('ls', flags, { encoding: 'utf8' })
let referenceResults = (() => {
  if (options.list && flags.length > 2) {
    return ('\n\n' + reference.stdout).replace(/(?<=\n\n).*?(?=\n)/gi, (match) => `${match}\ntotal 121`).substring(2).split(/\r?\n/)
  } else if (options.list) {
    return ['total 152', ...reference.stdout.split(/\r?\n/)]
  } else {
    return reference.stdout.split(/\r?\n/)
  }
})()
referenceResults.pop()

const iconizer = (item) => {
  if (/[^ ]+\//gi.test(item)) {
    const ext = (options.path) ? item : item.split('').slice(0, -1).join('')
    const icon = folders[ext] ? folders[ext] : folders['folder']
    item = `${icon}  ${item}`
  } else {
    const ext = ([...item.match(/\.[0-9a-z]+$/gi) || []][0] || '')
      .split('').slice(1).join('')
    const icon = files[ext] ? files[ext] : files['file']
    item = `${icon}  ${item}`
  }
  return item
}

const sort = (results) => {
  return results.join('\n').split('\n\n').map(result => {
  /**
    items :
    [ '.:',
    'total 160',
    '-rw-r--r--    1 husnulhamidiah  staff   2827 Aug 21 17:33 README.md',
    'drwxr-xr-x    3 husnulhamidiah  staff     96 Aug 19 18:08 bin/' ]
   */
    const items = result.split('\n').filter(Boolean)

    const meta = (() => {
      const acc = []
      if (flags.length > 2) {
        if (options.list) acc.push(items.shift())
        acc.push(items.shift())
      } else if (options.list) {
        acc.push(items.shift())
      }
      return acc
    })()

    const sortedItems = items.sort((a, b) => {
      if (a.charAt(a.length - 1) === '/') return -1
      if (a.charAt(a.length - 1) !== '/') return 1
      return 0
    })

    return meta.concat(sortedItems).join('\n')
  }).join('\n\n').split('\n')
}

if (options.sort) {
  results = sort(results)
  referenceResults = sort(referenceResults)
}

const _ = results.map((item, index) => {
  if (item.match(/:$/g) || item.match(/^total/g)) {
    return chalk.rgb(...argv['meta-color'])(item)
  } else if (item === '') {
    return item
  } else {
    item = (/[^ ]+\//gi.test(item))
      ? chalk.rgb(...argv['dir-color'])(item)
      : chalk.rgb(...argv['file-color'])(item)
    const iconized = iconizer(referenceResults[index])
    return item.replace(referenceResults[index], iconized)
  }
})

if (options.list || options.oneline) {
  console.log(_.join('\n'))
} else {
  // multiple folder
  if (flags.length > 2) {
    _.join('\n').split('\n\n').map((result, index, arr) => {
      const items = result.split('\n')
      console.log(items.shift())
      console.log(columns(items, { sort: false }))
      if (index !== arr.length - 1) console.log()
    })
  } else {
    console.log(columns(_, { sort: false }))
  }
}
