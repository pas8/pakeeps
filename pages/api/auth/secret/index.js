import axios from 'axios';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) res.send({ error: 'You nedd to be sign in' });

  res.send({ content: 'Welcome to the secret page' });
};
