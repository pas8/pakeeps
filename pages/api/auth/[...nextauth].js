import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: '',
      clientSecret: ''
    }),
    Providers.Email({
      server: {
        host: '',
        port: '',
        auth: { user: '', pass: '' }
      },
      from: ''
    })
  ]
};

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://pas8:01NjQYysvhzNkiIy@cluster0.ojhbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
