import crypto from 'crypto';
export class HMACGenerator {
  generateRandomInt(max) {
    return crypto.randomInt(0, max);
  }
  generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }
  generateHMAC(key, message) {
    return crypto.createHmac('sha3-256', Buffer.from(key, 'hex')).update(message.toString()).digest('hex');
  }
}