import type { NextPage } from "next";
import {
  Badge,
  Box,
  Container,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useSWRFetcher } from "../../hooks/useSWR";
import { useRouter } from "next/router";

const Partnerships: NextPage = () => {
  const router = useRouter();
  const businessName = router.query.index;
  const { data, error } = useSWRFetcher({
    url: `http://localhost:3000/api/get-partnership-records?business=${businessName}`,
  });

  if (!data) return <Spinner size="xl" />;
  console.log("data", data[0]);

  const causes = data[0].charity.causes;
  console.log("causes", causes[0]);
  const causesLiked = Object.keys(causes[0]).reduce((o, key) => {
    causes[0][key] === true && (o[key] = causes[0][key]);

    return o;
  }, {});

  console.log("causesLisked", causesLiked);

  const favouriteCauses = Object.keys(causesLiked);
  console.log("favouriteCauses", favouriteCauses);

  const donatedTo = data.map((charity) => charity.charity.name);
  let uniqueChars = [...new Set(donatedTo)];
  console.log("donatedTo", donatedTo);
  console.log("uniqueChars", uniqueChars);

  // let uniq = (a) => [...new Set(a)];

  // const uniqueCharities = uniq(donatedTo);

  return (
    <Container maxW="6xl" mt={24} mb={24}>
      <Heading
        as="h1"
        size="4xl"
        style={{ textTransform: "capitalize" }}
        mb={24}
      >
        {businessName}
      </Heading>
      {!data ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Grid templateColumns="repeat(3, 1fr)">
            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="lg"
              p={16}
              pt={12}
              pb={12}
              mb={4}
              overflow="hidden"
              key={data[0].charity.name}
            >
              <Heading as="h1" size="md" mb={2}>
                We support
              </Heading>

              {/* TODO - ONLY THE FIRST CHARITIES CAUSES ARE TAKEN INTO ACCOUNT */}
              {favouriteCauses &&
                favouriteCauses.map((item) => (
                  <Badge
                    key={item}
                    mr={1}
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                  >
                    {item}
                  </Badge>
                ))}
            </Box>

            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="lg"
              p={16}
              pt={12}
              pb={12}
              mb={4}
              overflow="hidden"
              // key={d.charity.name}
            >
              <Heading as="h1" size="md" mb={2}>
                Total donations
              </Heading>
              <Heading as="h1" size="2xl">
                £
                {data?.reduce((acc, curr) => {
                  // console.log("curr", curr);
                  return (acc += Number(curr.donation_amount));
                }, 0)}
              </Heading>
            </Box>
            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="lg"
              p={16}
              pt={12}
              pb={12}
              overflow="hidden"
              // key={d.charity.name}
            >
              <Heading as="h1" size="md" mb={2}>
                Donated to
              </Heading>
              {uniqueChars?.map((acc) => (
                <Heading key={acc} as="h1" size="md">
                  {acc}
                </Heading>
              ))}
            </Box>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Partnerships;
