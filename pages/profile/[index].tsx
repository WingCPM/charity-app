import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Grid, Container, Box, Badge, Heading, Text } from "@chakra-ui/react";

import { CheckoutForm } from "../../components/CheckoutForm";

export async function getStaticPaths(context) {
  const URL = "https://charitybase.uk/api/graphql";
  const HEADERS = {
    Authorization: "Apikey YOUR_API_KEY",
    "Content-Type": "application/json",
  };
  const COUNT_QUERY = `
  {
    CHC {
      getCharities(filters: {}) {
        list(limit: 30) {
          id
          names {
            value
          }
        }
      }
    }
  }
`;

  async function countCharities() {
    return fetch(URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ query: COUNT_QUERY }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("FETCH ERROR (probably your network)");
        throw err;
      })
      .then(({ data, errors }) => {
        if (errors) {
          console.error("QUERY ERRORS");
          throw errors;
        }
        return { data: data.CHC.getCharities };
      });
  }

  const data = await countCharities();
  console.log("data hahah", data.data);

  const paths = data.data.list.map((path) => {
    return `/profile/${path.id}`;
  });

  console.log("paths", paths);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log("params", params.index);
  const URL = "https://charitybase.uk/api/graphql";
  const HEADERS = {
    Authorization: "Apikey YOUR_API_KEY",
    "Content-Type": "application/json",
  };
  const COUNT_QUERY = `
    {
    CHC {
      getCharities(filters: {id: ${params.index}}) {
      list(limit: 30) {
        id
        financialYearEnd
        image {
          logo {
            medium
          }
        }
        contact {
          social {
            handle
            platform
          }
        }
        website
        objectives
        names {
          value
        }
        activities
        causes {
          name
        }
      }
      }
    }
  }
  `;

  async function countCharities() {
    return fetch(URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ query: COUNT_QUERY }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("FETCH ERROR (probably your network)");
        throw err;
      })
      .then(({ data, errors }) => {
        if (errors) {
          console.error("QUERY ERRORS", errors.toString());
          throw errors;
        }
        return { data: data.CHC.getCharities };
      });
  }

  return {
    props: { charity: await countCharities() },
  };
}

interface ProfileProps {
  charity: {
    data: {
      list: {
        image: {
          logo: {
            medium: string;
          };
        };
        contact: {
          social: any;
        };
        names: {
          value: string;
        };
        website: string;
        activities: string;
        causes: {
          name: string;
        };
      }[];
    };
  };
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Charity: NextPage = ({ charity }: ProfileProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    console.log("calling backend");
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donationAmount: 500,
        charity: charity.data.list[0].names[0].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  console.log("charity", charity);
  return (
    clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <Container maxW="2xl" centerContent mt={24} mb={24}>
          <Grid>
            {charity.data.list.map((charity, index) => (
              <>
                <Box>
                  <Heading as="h1" size="md" noOfLines={1} mb={4}>
                    {charity.names[0].value}
                  </Heading>
                </Box>
                <Box display="flex" alignItems="baseline">
                  {charity.causes[0].name.split("/").map((cause, index) => (
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
                <Box display="flex" alignItems="baseline" mt={2} mb={4}>
                  {charity.contact?.social.map((social, index) => (
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
                <Box>
                  <Text fontSize="md" mb={2}>
                    {charity.activities}
                  </Text>
                </Box>
              </>
            ))}
          </Grid>
          <CheckoutForm />
        </Container>
      </Elements>
    )
  );
};

export default Charity;
