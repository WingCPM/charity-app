import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Grid, Container } from "@chakra-ui/react";

import { Card } from "../components/Card";

export async function getStaticProps() {
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
          console.error("QUERY ERRORS");
          throw errors;
        }
        return { data: data.CHC.getCharities };
      });
  }

  return {
    props: { charities: await countCharities() },
  };
}

interface HomeProps {
  charities: {
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

const Home: NextPage = ({ charities }: HomeProps) => {
  const router = useRouter();

  const handlePage = ({ charity }) => {
    router.push(`/profile/${charity.id}`);
  };

  return (
    <Container maxW="8xl" centerContent mt={24} mb={24}>
      <Grid templateColumns="repeat(3, 1fr)" gap={12}>
        {charities.data.list.map((charity, index) => (
          <Card
            key={index}
            logo={charity.image?.logo?.medium}
            socials={charity.contact?.social}
            name={charity.names[0].value}
            website={charity.website}
            description={charity.activities}
            causes={charity.causes[0].name.split("/")}
            handler={() => handlePage({ charity })}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

// NEXT STEPS

// CREATE DB
// CREATE PROFILE PAGES
// ACCEPT STRIPE PAYMENTS
// SAVE DONATION IN DB
// CREATE NEW PAGE WHERE YOU CAN SEE WHO HAS DONATED TO WHO
