import 'server-only'
import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const KEY = process.env.ENCRYPTION_KEY
const IV_LENGTH = 16

function getKey(): Buffer {
    if (!KEY) {
        throw new Error('ENCRYPTION_KEY is not set')
    }
    // Ensure key is 32 bytes. If it's a hex string, parse it.
    // If it's a regular string, we might need to hash it or pad it.
    // For this implementation, we expect a 32-byte hex string or we hash it to 32 bytes.
    // Let's hash it to be safe and consistent.
    return crypto.createHash('sha256').update(String(KEY)).digest()
}

export function encrypt(text: string): string {
    const key = getKey()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt(text: string): string {
    const key = getKey()
    const textParts = text.split(':')
    const iv = Buffer.from(textParts.shift()!, 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
