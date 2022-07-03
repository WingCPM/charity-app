import React from "react";
import type { NextPage } from "next";
import { Container, Box, Heading } from "@chakra-ui/react";

const Success: NextPage = () => {
  return (
    <Container maxW="2xl" centerContent mt={24} mb={24}>
      <Box>
        <Heading as="h1" size="md" noOfLines={1} mb={4}>
          Thank you for donating to some charity
        </Heading>
      </Box>
    </Container>
  );
};

export default Success;
