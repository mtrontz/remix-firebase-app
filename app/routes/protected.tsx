import { Form, Outlet, useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import { auth } from '~/services/auth.server';
import type { AuthUser } from '~/services/auth.server';
export let meta: MetaFunction = () => {
  return {
    title: 'Protected Page',
  };
};
interface LoaderData {
  user?: AuthUser | null
};

export const loader: LoaderFunction = async ({ request }) => {
  // page requires admin user role for access
  await auth.requireUser(request, 'admin', '/');

  // get the current auth user for the page
  return await auth.user(request);
};

export default function Secrets() {
  const user = useLoaderData() || { username: 'foo', id: 'bar', name: 'baz', role: 'shazam' };

  return (
    <div className="remix__page">
      <main>
        <h2>Protected Page</h2>
        <p>Hello {user.name}</p>
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
        <section>
          <h3>User Details</h3>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td>username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>role</td>
                <td>{user.role}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h3>DB Users</h3>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
