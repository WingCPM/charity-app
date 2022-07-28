const { Prisma } = require("@prisma/client");

const causes = [
  {
    charity_id: 1,
    social: false,
    education: true,
    conservation: true,
    environmental: true,
    cultural: true,
    training: false,
    animals: true,
    science: true,
  },
];

const charities = [
  {
    name: "RSPCA",
    email: "",
    bio: "This is the bio for RSPCA",
    email_address: "hello@rspca.com",
    website: "rspca.com",
    tiktok: "rspca.tiktok",
    instagram: "rspca.instagram",
    snapchat: "rspca.snapchat",
  },
  {
    name: "mossyearth",
    email: "hello@mossyearth.com",
    bio: "This is the bio for Mossy Earth",
    email_address: "hello@mossyearth.com",
    website: "mossyearth.com",
    tiktok: "mossyearth.tiktok",
    instagram: "mossyearth.instagram",
    snapchat: "mossyearth.snapchat",
  },
  {
    name: "dogstrust",
    email: "hello@dogstrust.com",
    bio: "This is the bio for Mossy Earth",
    email_address: "hello@dogstrust.com",
    website: "dogstrust.com",
    tiktok: "dogstrust.tiktok",
    instagram: "dogstrust.instagram",
    snapchat: "dogstrust.snapchat",
  },
  {
    name: "cancerresearch",
    email: "hello@cancerresearch.com",
    bio: "This is the bio for Mossy Earth",
    email_address: "hello@cancerresearch.com",
    website: "cancerresearch.com",
    tiktok: "cancerresearch.tiktok",
    instagram: "cancerresearch.instagram",
    snapchat: "cancerresearch.snapchat",
  },
];

const businesses = [
  { name: "Sainsburys", donation_amount: 100.0, charity_id: 1 },
];

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
  causes,
};
