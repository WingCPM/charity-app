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

module.exports = {
  businesses,
  charities,
};
