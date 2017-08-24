/**
 * Mocking client-server processing
 */
import timeoutPromise from '../util/timeout_promise';
import canteens from './canteens.json';
import stalls from './stalls.json';
import login from './login.json';

const TIMEOUT = 100;

export default {
  getAllCanteens: (timeout = TIMEOUT) => timeoutPromise(timeout).then(() => canteens),
  getAllStalls: (timeout = TIMEOUT) => timeoutPromise(timeout).then(() => stalls),
  login: (accessToken, timeout = TIMEOUT) => timeoutPromise(timeout).then(() => login),
};
