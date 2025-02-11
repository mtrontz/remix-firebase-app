import path from 'path';
import { createFileSessionStorage } from 'remix';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const { getSession, commitSession, destroySession } = createFileSessionStorage({
  dir: path.join(__dirname, '../../app/sessions'),
  cookie: {
    name: '__session',
    secrets: [sessionSecret],
    sameSite: true,
  },
});

export { getSession as getFileSession, commitSession as commitFileSession, destroySession as destroyFileSession };