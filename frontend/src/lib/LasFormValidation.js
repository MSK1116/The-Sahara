import { validationRules } from "./LasFormValidationRules";

export const validatePage = (page, data) => {
  // Always check Page 1 first, then requested page if different
  const pagesToCheck = [1];
  if (page !== 1) pagesToCheck.push(page);

  const errors = [];

  for (const p of pagesToCheck) {
    const rules = validationRules[p];
    if (!rules) continue;

    for (const rule of rules) {
      if (!rule.validate(data)) {
        errors.push(rule.message);
      }
    }
  }

  return errors.length === 0 ? null : errors;
};
