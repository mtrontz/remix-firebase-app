import crypto, { X509Certificate } from 'crypto'
import React, { useEffect, useCallback } from "react";

const algorithm = 'aes-256-ctr'

let secret = 'not-at-all-secret';
useEffect(() => {
    if (process.env.MAGIC_LINK_SECRET) {
        secret = process.env.MAGIC_LINK_SECRET
      } else if (process.env.NODE_ENV === 'production') {
        throw new Error('Must set MAGIC_LINK_SECRET')
      }
}, []);

const ENCRYPTION_KEY = crypto.scryptSync(secret, 'salt', 32)

const IV_LENGTH = 16

async function encrypt(text: string): Promise<string> {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

async function decrypt(text: string): Promise<string> {
  const [ivPart, encryptedPart] = text.split(':')
  if (!ivPart || !encryptedPart) {
    throw new Error('Invalid text.')
  }

  const iv = Buffer.from(ivPart, 'hex')
  const encryptedText = Buffer.from(encryptedPart, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv)
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ])
  return decrypted.toString()
}
/**
 * Generates a random [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt) version 4 UUID. The UUID is generated using a
 * cryptographic pseudorandom number generator.
 * @since v15.6.0, v14.17.0
 */
 async function randomUUID(): Promise<string> {
    return crypto.randomUUID()
};

async function randomInt(max: number): Promise<number> {
    return crypto.randomInt(max)
};
export {encrypt, decrypt, randomUUID, randomInt};

const x509 = new X509Certificate('{... pem encoded cert ...}');

