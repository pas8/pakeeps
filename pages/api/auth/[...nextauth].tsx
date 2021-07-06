import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
require('dotenv').config();
import config from 'config';
import { SIGN_IN_URL, NEW_USER_URL } from 'models/denotation';

const options = {
  pages: {
    signIn: SIGN_IN_URL,
    newUser: NEW_USER_URL
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),

    Providers.GitLab({
      clientId: process.env.GTILAB_ID,
      clientSecret: process.env.GTILAB_SECRET
    })
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

export default (req: any, res: any) => NextAuth(req, res, options);

// const MongoClient = require('mongodb').MongoClient;
// const uri = ";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
