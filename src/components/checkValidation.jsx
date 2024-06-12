export const validationAddUser = {
  name: [
    {
      validate: (value) => value.length >= 5,
      message: "Name must be than 5 characters!",
    },
  ],
  username: [
    {
      validate: (value) => value.length >= 5,
      message: "Username must be than 5 characters!",
    },
    {
      validate: (value) => !/\s/.test(value),
      message: "Username cannot contain spaces!",
    },
  ],
  password: [
    {
      validate: (value) => value.length >= 8,
      message: "Password must be than 8 characters!",
    },
    {
      validate: (value) => /[A-Z]/.test(value),
      message: "Password must have at least one uppercase letter!",
    },
    {
      validate: (value) => /[a-z]/.test(value),
      message: "Password must have at least on lowercase letter!",
    },
    {
      validate: (value) => /[0-9]/.test(value),
      message: "Password must have at least on number letter!",
    },
    {
      validate: (value) => /[!@#$%^&*]/.test(value),
      message: "Password must have at least on spacial character!",
    },
    {
      validate: (value) => !/\s/.test(value),
      message: "Password cannot contain spaces!",
    },
  ],
  email: {
    validate: (value) => /\S+@\S+\.\S+/.test(value),
    message: "Email Invalid!",
  },
  phoneNumber: {
    validate: (value) => /^(0|\+84)(\d{9})$/.test(value),
    message: "Invalid phone number!",
  },
};
