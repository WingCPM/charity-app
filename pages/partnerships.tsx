import type { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import prisma from "../lib/prisma";

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));

  console.log("products", products);

  return { props: { products } };
}

interface PartnershipsProps {
  products: {
    shit: true;
  };
}

const Partnerships: NextPage = ({ products }: PartnershipsProps) => {
  console.log("products", products);

  return (
    <Container maxW="8xl" centerContent mt={24} mb={24}>
      <p>partnerships page</p>
    </Container>
  );
};

export default Partnerships;
