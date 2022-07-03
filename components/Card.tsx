import React from "react";
import { Box, Badge, Button, Image, Heading, Text } from "@chakra-ui/react";

interface CardProps {
  handler: () => void;
  logo?: string;
  name: string;
  description: string;
  causes: string[];
  socials?: { instagram?: string; twitter?: string; facebook?: string }[];
  website: string;
}

export const Card = ({
  handler,
  logo,
  name,
  description,
  causes,
  socials,
  website,
}: CardProps) => {
  return (
    <Box
      position="relative"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handler}
    >
      <Box p="6">
        {/* {logo && <Image src={logo} alt={name} mb={4} />} */}
        <Heading as="h1" size="sm" noOfLines={1} mb={2}>
          {name}
        </Heading>
        <Text fontSize="xs" mb={2}>
          {website}
        </Text>

        <Box display="flex" alignItems="baseline">
          {causes.map((cause, index) => (
            <Badge
              mr={1}
              key={index}
              borderRadius="full"
              px="2"
              colorScheme="teal"
            >
              {cause}
            </Badge>
          ))}
        </Box>
        <Box display="flex" alignItems="baseline" mt={5} mb={4}>
          {socials.map((social, index) => (
            <Badge
              px="2"
              borderRadius="full"
              key={index}
              mr="1"
              colorScheme="green"
            >
              {social.platform}
            </Badge>
          ))}
        </Box>
        <Box noOfLines={2}>{description}</Box>

        <Button fontSize="xs" mt={4} colorScheme="teal" variant="outline">
          View Profile
        </Button>
      </Box>
    </Box>
  );
};
