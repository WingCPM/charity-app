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
];

const businesses = [
  {
    name: "Apple",
    donation_amount: new Prisma.Decimal(5500.55),
    charity_id: 1,
  },
  {
    name: "Google",
    donation_amount: new Prisma.Decimal(2200.0),
    charity_id: 3,
  },
  {
    name: "Netflix",
    donation_amount: new Prisma.Decimal(1000.95),
    charity_id: 2,
  },
];

module.exports = {
  businesses,
  charities,
};
