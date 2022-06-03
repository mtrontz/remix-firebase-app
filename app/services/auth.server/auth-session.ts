import { json, redirect } from 'remix';
import { getCookieSession, commitCookieSession, getFileSession, commitFileSession } from '~/services/session.server';
import type { Session } from 'remix';
import type { AuthSession } from './auth-types';
import type { AppError } from '~/utils';
// import {encrypt, decrypt} from "~/services/encryption.server"

export const authSession: AuthSession = {
  async getAuthSession(request: Request, sessionType?: "cookie"|"file"): Promise<Session> {
    if (!sessionType || sessionType === "cookie") {
    return getCookieSession(request.headers.get('Cookie'));
  };
  return getFileSession(request.headers.get('Cookie')) // , {decode: async (value: string) => await Promise.resolve(decrypt(value))}
},
  async createAuthSession(data: any, redirectTo?: string, sessionType?: "cookie"|"file"): Promise<Response> {
    if (!sessionType || sessionType === "cookie") {
      try {
        const session: Session = await getCookieSession();
  
        for (const key in data) {
          if (typeof data[key] === 'string') {
            session.set(key, data[key]);
          } else {
            session.set(key, JSON.stringify(data[key]));
          }
        };
  
        if (redirectTo) {
          return redirect(redirectTo, {
            headers: {
              'Set-Cookie': await commitCookieSession(session),
            },
          });
        } else {
          return json(
            { status: 'success' },
            {
              headers: {
                'Set-Cookie': await commitCookieSession(session),
              },
              status: 201,
            }
          );
        }
      } catch (error) {
        return json<AppError>(
          {
            status: "500",
            errorCode: 'session/create',
            errorMessage: `Could not create user session: ${error}`,
          },
        );
      }
    };
    try {
      const session: Session = await getFileSession();

      for (const key in data) {
        if (typeof data[key] === 'string') {
          session.set(key, data[key]);
        } else {
          session.set(key, JSON.stringify(data[key]));
        }
      }

      if (redirectTo) {
        return redirect(redirectTo, {
          headers: {
            'Set-Cookie': await commitFileSession(session),
          },
        });
      } else {
        return json(
          { status: 'success' },
          {
            headers: {
              'Set-Cookie': await commitFileSession(session),
            },
            status: 201,
          }
        );
      }
    } catch (error) {
      return json<AppError>(
        {
          status: "500",
          errorCode: 'session/create',
          errorMessage: `Could not create user session: ${error}`,
        },
      );
    }
  }, 
  async destroyAuthSession(request: Request, keys: string[] | string, redirectTo?: string, sessionType?: "cookie"|"file"): Promise<Response> {
    if (!sessionType || sessionType === "cookie") {
      const session: Session = await getCookieSession(request.headers.get('Cookie'));

    if (typeof keys === 'string') {
      session.unset(keys);
    } else {
      keys.forEach((key) => session.unset(key));
    }
    if (redirectTo) {
      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await commitCookieSession(session),
        },
      });
    } else {
      return json(
        { status: 'success' },
        {
          headers: {
            'Set-Cookie': await commitCookieSession(session),
          },
          status: 204,
        }
      );
    }
  };
  const session: Session = await getFileSession(request.headers.get('Cookie'));

  if (typeof keys === 'string') {
    session.unset(keys);
  } else {
    keys.forEach((key) => session.unset(key));
  }
  if (redirectTo) {
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitFileSession(session),
      },
    });
  } else {
    return json(
      { status: 'success' },
      {
        headers: {
          'Set-Cookie': await commitFileSession(session),
        },
        status: 204
      });
  }}
};
