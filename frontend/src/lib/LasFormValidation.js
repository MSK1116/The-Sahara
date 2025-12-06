import { validationRules } from "./LasFormValidationRules";

export const validatePage = (page, data) => {
  const rules = validationRules[page];
  if (!rules) return null;

  const errors = [];

  for (const rule of rules) {
    if (!rule.validate(data)) {
      errors.push(rule.message);
    }
  }

  if (errors.length === 0) return null;

  return errors;
};
