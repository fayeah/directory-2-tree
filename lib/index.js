#! /usr/bin/env node

const fs = require('fs');
const {appendFile} = require('./util');

let content = '\n';

function getAllFiles(dir, files = [], level) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      content = content + appendFile(file, level+1)
      getAllFiles(name, files, level+1)
    } else {
      content = content + appendFile(file, level+1)
    }
  }
}

function readFoldersAndFiles() {
  const cmdArgs = process.argv;
  const curDirectory = cmdArgs?.[2] ?? process.cwd()
  // Use fs.readdirSync to read the contents of the directory synchronously
  // TODO: consider using async
  getAllFiles(curDirectory, [], 0)
}

function generateFile() {
  const outputPath = process.argv?.[3] ?? './directory-tree.md';
  fs.writeFile(outputPath, content, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log(`The file was saved in ${outputPath}!`);
  });
}

function dirToTree() {
  // step1: read folder and files
  readFoldersAndFiles()
  // step2: write tree structured string to readme.md
  generateFile()
}

try {
  dirToTree()
} catch (error) {
  console.log('error happens:', error)
}
  