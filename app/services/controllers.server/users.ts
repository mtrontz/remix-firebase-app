import { User } from '~/models';
import { Controller, DB, QueryOptions } from './controller-types';
import type { DBResult } from './controller-types';

type UserType = {
  id?: string;
  username?: string;
  role?: string;
  preferences?: object;
};

/**
 * Controller class for working with User model objects
 */
export class Users extends Controller<UserType, User> {
  /**
   * Creates a new Users controller with 'users' collection param
   * @see AbstractController.constructor()
   * @param {DB} db the database reference
   */
  constructor(db: DB) {
    super('users', db);
  }

  /**
   * Creates a new user in the database; requires a username
   * @param {UserType} userData the user model to create in the database
   * @returns {User} the user model with any updated default|derived field values
   * @throws Will throw an error if username is empty, user already exists, or database call fails
   */
  async create(userData: UserType): Promise<User> {
    if (userData.username) {
      if (await this.getByUsername(userData.username)) {
        throw Error(`Users/createUser - user already exists`);
      }

      if (!userData.role) {
        userData.role = 'guest';
      }

      try {
        const result: DBResult = await this.db.executeInsert(userData, { collection: this.collection });
        const u = result.rows().pop() as UserType;

        return new User(u.username, u?.role, u?.id, u?.preferences);
      } catch (error) {
        throw Error(`Users/createUser - ${error}`);
      }
    } else {
      throw Error(`Users/createUser - could not create user, missing required field`);
    }
  }

  /**
   * Provides a way to submit a custom users query to the database
   * @param {QueryOptions} options query options
   * @returns {User[]} an array of matched users
   */
  async read(options?: QueryOptions): Promise<User[]> {
    const records = await this.db.executeQuery({ ...options, collection: this.collection });

    return records.rows().map((record) => {
      const u = record as UserType;
      return new User(u.username, u.role, u.id, u.preferences);
    });
  }

  /**
   * Updates a user in the database; requires an id
   * @param {UserType} userData the user model to update in the database
   * @returns {User} the user that has been updated
   * @throws Will throw an error if id is empty, user does not exist, or database call fails
   */
  async update(userData: UserType): Promise<User | User[]> {
    if (userData.id) {
      if (!(await this.getById(userData.id))) {
        throw Error(`Users/updateUser - user does not exist`);
      }

      try {
        const result: DBResult = await this.db.executeUpdate(userData, {
          collection: this.collection,
          where: { field: 'id', operator: '==', value: userData.id },
        });

        const user = ((record) => {
          const u = record as UserType;
          return new User(u.username as string, u.role, u.id, u.preferences);
        })(result.rows().pop());

        return user;
      } catch (error) {
        throw Error(`Users/updateUser - ${error}`);
      }
    } else {
      throw Error(`Users/updateUser - could not update user, missing required field`);
    }
  }

  /**
   * Delete a user in the database; requires an id
   * @param {UserType} userData the user model to delete in the database
   * @returns {User | User[]} the user(s) that have been deleted
   * @throws Will throw an error if id is empty, user does not exist, or database call fails
   */
  async delete(userData: UserType): Promise<User | User[]> {
    if (userData.id) {
      if (!(await this.getById(userData.id))) {
        throw Error(`Users/deleteUser - user does not exist`);
      }

      try {
        const result: DBResult = await this.db.executeDelete(
          {
            id: userData.id,
          },
          { collection: this.collection, where: { field: 'id', operator: '==', value: userData.id } }
        );

        const user = ((record) => {
          const u = record as UserType;
          return new User(u.username as string, u.role, u.id, u.preferences);
        })(result.rows().pop());

        return user;
      } catch (error) {
        throw Error(`Users/deleteUser - ${error}`);
      }
    } else {
      throw Error(`Users/deleteUser - could not update user, missing required field`);
    }
  }

  /**
   * Get a user by the id
   * @param {string} id the id of the user to retrieve
   * @returns {User | null} the user retrieved from the database or null if no match was found
   */
  async getById(id: string): Promise<User | null> {
    const result = await this.db.executeQuery({
      collection: this.collection,
      where: { field: 'id', operator: '==', value: id },
    });

    if (result.count() === 1) {
      const u = result.rows().pop() as UserType;
      return new User(u.username as string, u.role, u.id, u.preferences);
    } else {
      return null;
    }
  }

  /**
   * Get a user by the username
   * @param {string} username the username of the user to retrieve
   * @returns {User | null} the user retrieved from the database or null if no match was found
   */
  async getByUsername(username: string): Promise<User | null> {
    const result = await this.db.executeQuery({
      collection: this.collection,
      where: { field: 'username', operator: '==', value: username },
    });

    if (result.count() === 1) {
      const u = result.rows().pop() as UserType;
      return new User(u.username as string, u.role, u.id, u.preferences);
    } else {
      return null;
    }
  }

  /**
   * Facade method for all({ role })
   * @param role the role to filter by
   * @returns {User[]} an array of matched users
   */
  allByRole(role: string) {
    return this.read({ collection: this.collection, where: { field: 'role', operator: '==', value: role } });
  }
}
