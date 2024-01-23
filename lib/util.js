// TODO: the last one of a level should be '└──'
function appendFile(name, level) {
  const indents = level === 1 ? '├──' : ('│' + '   '.repeat(level - 1) + '├──')
  return `${indents} ${name}\n`
}


module.exports = {appendFile}