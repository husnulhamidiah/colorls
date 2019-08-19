const { spawn } = require('child_process')
const chalk = require('chalk')
const columns = require('cli-columns')
const files = require('./config/files.json')
const folders = require('./config/folders.json')

const argv = ['-p', ...process.argv.slice(2)]
const ls = spawn('ls', [...argv])

const iconizer = (item) => {
  if (/[^ ]+\//gi.test(item)) {
    const ext = item.split('').slice(0, -1).join('')
    const icon = folders[ext] ? folders[ext] : folders['folder']
    item = chalk.green(`${icon}  ${item}`)
  } else {
    const ext = ([...item.match(/\.[0-9a-z]+$/gi) || []][0] || '')
      .split('').slice(1).join('')
    const icon = files[ext] ? files[ext] : files['file']
    item = chalk.white(`${icon}  ${item}`)
  }
  return item
}

let output = ''

ls.stdout.setEncoding('utf8')
ls.stdout.on('data', data => {
  output += data
})

ls.stderr.setEncoding('utf8')
ls.stderr.on('data', data => console.log(data))

ls.on('close', code => {
  const results = output.split(/\r?\n\n/)
  const single = results.length === 1

  results.map(result => {
    const filenames = result.split(/\n/gi).filter(Boolean)
    if (!single) console.log(chalk.blue(filenames.shift()))

    const iconized = filenames.map(filename => {
      filename = iconizer(filename)
      if (filename.match(/[^ ]+\//gi)) filename = chalk.green(filename)
      return filename
    })
    console.log(columns(iconized, { sort: false }))
    console.log()
  })
})
