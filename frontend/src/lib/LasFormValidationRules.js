export const validationRules = {
  1: [
    {
      field: "name",
      message: "Name is required.",
      validate: (d) => !!d.name,
    },
    {
      field: "citizenship",
      message: "Citizenship number required.",
      validate: (d) => !!d.citizenship,
    },
  ],

  2: [
    {
      field: "age",
      message: "Age is required.",
      validate: (d) => !!d.age,
    },
    {
      field: "occupation",
      message: "Occupation is required.",
      validate: (d) => !!d.occupation,
    },
  ],

  3: [
    {
      field: "address",
      message: "Address is required.",
      validate: (d) => !!d.address,
    },
  ],

  4: [
    {
      field: "loanAmount",
      message: "Loan amount is required.",
      validate: (d) => !!d.loanAmount,
    },
    {
      field: "duration",
      message: "Duration is required.",
      validate: (d) => !!d.duration,
    },
  ],

  10: [
    {
      field: "renewDate",
      message: "Renew date is required.",
      validate: (d) => !!d.renewDate,
    },
  ],
};
