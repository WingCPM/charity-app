const { Prisma } = require("@prisma/client");

const charities = [
  {
    name: "RSPCA",
  },
  {
    name: "NSPCC",
  },
  {
    name: "WWF",
  },
  {
    name: "THE ARTS COUNCIL OF ENGLAND",
  },
];

const businesses = [];

const users = [
  {
    username: "ioetbc",
    email: "ioetbc@gmail.com",
  },
];

module.exports = {
  charities,
  businesses,
  users,
};
