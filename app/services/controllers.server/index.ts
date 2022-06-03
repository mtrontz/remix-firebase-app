import { Users } from './users';
import { db } from '~/services/db.server';
import { DBResult } from './controller-types';
import type { Condition, DB, LimitOptions, OrderByOptions, QueryOptions } from './controller-types';

/**
 * Initialized users controller
 */
const users: Users = new Users(db);

export { DBResult, users };
export type { Condition, DB, LimitOptions, OrderByOptions, QueryOptions };
