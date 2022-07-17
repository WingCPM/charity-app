import React from "react";
import { getSession } from "next-auth/react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    console.log("redirecting to login");
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  }

  let account = {};
  try {
    account = await fetch(
      "http://localhost:3000/api/get-charity-account?charity_name=RSPCA"
    ).then((res) => res.json());
  } catch (error) {
    console.log("ERROR GETTING CHARITY ACCOUNT", error);
  }

  return {
    props: {
      session,
      account,
    },
  };
};

const Account = ({ account }) => {
  const [accountData, setAccountData] = React.useState({});
  console.log("account", account);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log("name", id);
    setAccountData({ ...accountData, [id]: value });
  };

  const handleOnSubmit = async () => {
    console.log("submitting", accountData);
    try {
      await fetch("http://localhost:3000/api/update-charity-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });
    } catch (error) {
      console.log("ERROR UPDATING CHARITY ACCOUNT", error);
    }
  };

  return (
    <Container maxW="3xl" mt={24} mb={24}>
      <Box display="flex" flexDirection="column" gap="10" mt={5} mb={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Charity Name</FormLabel>
          <Input
            id="name"
            placeholder="Charity Name"
            value={accountData["name"] || account.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Input
            id="bio"
            placeholder="Bio"
            value={accountData["bio"] || account.bio}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="bio">Select the causes you support</FormLabel>
          <Stack display="grid" gridTemplateColumns="1fr 1fr 1fr">
            <Checkbox size="md" colorScheme="green">
              Social
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Environmental
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Animals
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Education
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Culture
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Science
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Conservation
            </Checkbox>
            <Checkbox size="md" colorScheme="green">
              Training
            </Checkbox>
          </Stack>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="website">Website</FormLabel>
          <Input
            id="website"
            placeholder="Website"
            value={accountData["website"] || account.website}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="tiktok">Link TikTok</FormLabel>
          <Input
            id="tiktok"
            placeholder="TikTok"
            value={accountData["tiktok"] || account.tiktok}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="instagram">Link Instagram</FormLabel>
          <Input
            id="instagram"
            placeholder="Instagram"
            value={accountData["instagram"] || account.instagram}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="snapchat">Link Snapchat</FormLabel>
          <Input
            id="snapchat"
            placeholder="Snapchat"
            value={accountData["snapchat"] || account.snapchat}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button width={200} onClick={handleOnSubmit}>
          Submit
        </Button>
      </Box>

      {/* <button onClick={() => signOut()}>Logout</button> */}
    </Container>
  );
};

export default Account;
