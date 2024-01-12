// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('node-fs');
import getDb from '../db/index';

const db = getDb();

fs.mkdir('./build/static/db', () => {
  for (const [key, value] of Object.entries(db)) {
    fs.writeFile(
      `./build/static/db/${key}.json`,
      JSON.stringify(value),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) => {
        if (err) throw err;
      }
    );
  }
});