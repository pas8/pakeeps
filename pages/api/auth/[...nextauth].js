import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import config from 'config';

  console.log(); 

const options = {
  providers: [
    Providers.GitHub({
      clientId: config.get('github.id'),
      clientSecret: config.get('github.secret'),
    }),
    // Providers.Email({
    //   server: {
    //     host: '',
    //     port: '',
    //     auth: { user: '', pass: '' }
    //   },
    //   from: ''
    // })
  ]
}; 

export default (req,res)=> NextAuth(req,res,options)

// const MongoClient = require('mongodb').MongoClient;
// const uri = ";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
