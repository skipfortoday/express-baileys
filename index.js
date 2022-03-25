const port = process.env.PORT || 3000;

import { server } from './src/server/server.js';

const app = server();

app.listen(port, () => {
   return console.log('SERVER ON - PORT: ', port);
});
