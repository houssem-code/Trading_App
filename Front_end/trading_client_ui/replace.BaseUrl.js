var replace = require('replace-in-file');
var baseUrl = process.argv[2];
const options = {
  files: 'src/constant/base-url-constant.js',
  from:  /apiUrl: '(.*)'/g,
  to:  "apiUrl: '"+ baseUrl + "'",
  allowEmptyPaths: false,
};
try {
  let changedFiles = replace.sync(options);
  if (changedFiles == 0) {
    throw "Please make sure that file '" + options.files + "' has \"apiUrl: ''\"";
  }
  console.log('Build apiUrl set: ' + baseUrl);
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}
