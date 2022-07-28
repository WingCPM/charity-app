import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Grid,
  Container,
  Box,
  Badge,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { CheckoutForm } from "../../components/CheckoutForm";
import { useSWRFetcher } from "../../hooks/useSWR";
import { useRouter } from "next/router";

// export async function getStaticPaths(context) {
//   return { paths: ["/profile/RSPCA"], fallback: false };
// }

// export async function getStaticProps() {
//   let account = {};
//   try {
//     account = await fetch(
//       "http://localhost:3000/api/get-charity-account?charity_name=RSPCA"
//     )
//       .then((res) => res.json())
//       .catch((error) => console.log("ERROR GETTING CHARITY ACCOUNT", error));
//   } catch (error) {
//     console.log("ERROR GETTING CHARITY ACCOUNT", error);
//   }

//   return {
//     props: {
//       account,
//     },
//   };
// }

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

const Profile: NextPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const charityName = router.query.index;
  console.log("charityName", charityName);
  const { data, error } = useSWRFetcher({
    url: `http://localhost:3000/api/get-charity-account?charity_name=${charityName}`,
  });

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  console.log("account", data);

  useEffect(() => {
    console.log("CREATING PAYMENT INTETN");
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donationAmount: 500,
        charity: "RSPCA",
        business_name: "Sainsburys",
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const causes = [];

  // for (const property in data.causes[0]) {
  //   if (data.causes[0][property] === true) causes.push(property);
  //   // console.log(`${property}: ${data.causes[0][property]}`);
  // }

  // console.log("causes", causes);

  return !data ? (
    <Spinner size="xl" />
  ) : (
    clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <Container maxW="2xl" mt={24} mb={24}>
          <Grid>
            <Box>
              <Heading as="h1" size="md" noOfLines={1} mb={4}>
                {data?.name}
              </Heading>
            </Box>
            {/* <Box display="flex" alignItems="baseline">
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
            </Box> */}
            <Box mt={2} mb={4}>
              <Text>{data?.website}</Text>
            </Box>
            <Box mt={2} mb={4}>
              <Text>{data?.bio}</Text>
            </Box>
            <Box mt={2} mb={4}>
              <Text>{data?.tiktok}</Text>
            </Box>
            <Box mt={2} mb={4}>
              <Text>{data?.instagram}</Text>
            </Box>
            <Box mt={2} mb={4}>
              <Text>{data?.snapchat}</Text>
            </Box>
          </Grid>
          <CheckoutForm />
        </Container>
      </Elements>
    )
  );
};

export default Profile;
