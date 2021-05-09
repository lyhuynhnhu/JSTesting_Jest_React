export const validateRequired = (value) => !!value;

export const validationRules = {
    required: [
      {
        validator: validateRequired,
        message: 'This field is required !'
      }
    ],
    typeUser: [
      {
        validator: validateRequired,
        message: 'This field must be selected other than the default value'
      }
    ]
}

export const validateValuesByRule = (rules) => (values) => {
    const errors = {};
  
    for (const [key, rule] of Object.entries(rules)) {
      for (let i = 0; i < rule.length; i++) {
        if (!rule[i].validator(values[key])) {
          errors[key] = rule[i].message;
          break;
        }
      }
    }
    return errors;
};