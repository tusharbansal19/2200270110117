const axios = require('axios');

const LOG_API_URL = 'http://20.24.56.144/evaluation-service/logs';

// Allowed values for validation
const ALLOWED_STACKS = ['backend', 'frontend'];
const ALLOWED_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const ALLOWED_PACKAGES = [
  // Backend only
  'cache', 'controller', 'cron_job', 'domain', 'handler', 'repository', 'route', 'service',
  // Frontend only
  'api', 'component', 'page', 'state', 'style',
  // Both
  'auth', 'config', 'middleware', 'utils'
];

/**
 * Sends a log event to the remote logging API.
 * @param {string} stack - 'backend' or 'frontend'
 * @param {string} level - 'debug', 'info', 'warn', 'error', 'fatal'
 * @param {string} pkg - package name (see allowed values)
 * @param {string} message - descriptive log message
 */
async function Log(stack, level, pkg, message) {
  // Optional: Validate inputs
  if (!ALLOWED_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }
  if (!ALLOWED_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }
  if (!ALLOWED_PACKAGES.includes(pkg)) {
    throw new Error(`Invalid package: ${pkg}`);
  }
  if (typeof message !== 'string' || !message.trim()) {
    throw new Error('Message must be a non-empty string');
  }

  try {
    const response = await axios.post(LOG_API_URL, {
      stack,
      level,
      package: pkg,
      message,
    });
    // Optionally, print or handle the response
    // console.log('Log sent:', response.data);
    return response.data;
  } catch (error) {
    // Optionally, handle errors in logging itself
    // console.error('Failed to send log:', error.message);
    // You may want to rethrow or handle this differently in production
    return { error: error.message };
  }
}

module.exports = Log; 