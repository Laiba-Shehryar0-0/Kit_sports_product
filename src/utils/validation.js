const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const required = (msg = 'This field is required.') => (value) =>
  (!value || !String(value).trim()) ? msg : null;

export const email = (msg = 'Please enter a valid email address.') => (value) =>
  !EMAIL_RE.test(value || '') ? msg : null;

export const minLength = (n, msg = `Must be at least ${n} characters.`) => (value) =>
  String(value || '').length < n ? msg : null;

export const pattern = (re, msg = 'Invalid format.') => (value) =>
  !re.test(value || '') ? msg : null;

export const matches = (getOther, msg = 'Values do not match.') => (value, allValues) =>
  value !== getOther(allValues) ? msg : null;

/**
 * Runs each field's validators in order and stops at the first failure per field.
 * schema: { field: [validator, ...] } where each validator is (value, allValues) => message | null
 */
export function validateFields(values, schema) {
  const errors = {};
  for (const [field, validators] of Object.entries(schema)) {
    for (const validate of validators) {
      const msg = validate(values[field], values);
      if (msg) { errors[field] = msg; break; }
    }
  }
  return errors;
}
