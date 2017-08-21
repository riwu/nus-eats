/**
 * Mocking client-server processing
 */
import canteens from './canteens.json';
import stalls from './stalls.json';

const TIMEOUT = 100;

export default {
  getAllCanteens: (cb, timeout) => setTimeout(() => cb(canteens), timeout || TIMEOUT),
  getAllStalls: (cb, timeout) => setTimeout(() => cb(stalls), timeout || TIMEOUT),
};
