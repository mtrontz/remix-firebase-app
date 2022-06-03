import type { DB } from '~/services/controllers.server';
import { firestoreDb } from './firestore-db';

/**
 * Initialized database interface object
 */
const db: DB = firestoreDb;

export { db };
