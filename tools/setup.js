/* eslint no-console: 0 */

const fs = require('fs');

console.log('setting up the dev environnement\n');

const file = `#!/bin/sh

npm run test && npm run lint
`;

fs.writeFile('.git/hooks/pre-push', file, err => {
  if (err) throw err;
  console.log('tests added to prepush hook');
  fs.chmod('.git/hooks/pre-push', '0775', errChmod => {
    if (errChmod) throw errChmod;
    console.log('prepush hook granted all rights');
  });
});
