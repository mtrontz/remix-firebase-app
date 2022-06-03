import { createCookieSessionStorage } from 'remix';
import {encrypt, decrypt, randomUUID, randomInt} from "~/services/encryption.server";
import React, { useCallback } from "react";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
   throw new Error('SESSION_SECRET must be set');
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax', // to help with CSRF
    path: '/',
    maxAge: 60 * 60 * 24 * 5, // 5 days
    httpOnly: true,
  },
});

export { getSession as getCookieSession, commitSession as commitCookieSession, destroySession as destroyCookieSession };

