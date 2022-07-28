import type { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  const data = await prisma.businesses.findMany({
    where: {
      name: {
        equals: "Sainsburys",
      },
    },
    include: {
      charity: true,
    },
  });

  const products = data.map((product) => ({
    ...product,
    donation_amount: product.donation_amount.toString(),
  }));

  return { props: { products } };
}

interface PartnershipsProps {
  products: any;
}

const Partnerships: NextPage = ({ products }: PartnershipsProps) => {
  console.log("products", products);

  return (
    <Container maxW="8xl" centerContent mt={24} mb={24}>
      <p>partnerships page</p>
      {products.map((product) => (
        <>
          <h1>{product.charity.name}</h1>
          <h1>{product.donation_amount}</h1>
        </>
      ))}
    </Container>
  );
};

export default Partnerships;
