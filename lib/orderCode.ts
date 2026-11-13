import { randomInt } from 'crypto'

/** Letters and digits that are hard to mix up when read aloud at pickup. */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function createOrderCode(): string {
  let body = ''
  for (let i = 0; i < 4; i++) {
    body += ALPHABET[randomInt(ALPHABET.length)]
  }
  return `GP-${body}`
}
