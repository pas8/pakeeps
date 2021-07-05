import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
require('dotenv').config();
import config from 'config';


const options = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    Providers.GitHub({
      clientId: config.get('github.id'),
      clientSecret: config.get('github.secret')
    }),

    Providers.Google({
      clientId: config.get('google.id'),
      clientSecret: config.get('google.secret')
    }),
    Providers.Facebook({
      clientId: config.get('facebook.id'),
      clientSecret: config.get('facebook.secret')
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

export default (req:any, res:any) => NextAuth(req, res, options);

// const MongoClient = require('mongodb').MongoClient;
// const uri = ";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
