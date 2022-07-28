import React, { useState } from "react";
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
  const [accountData, setAccountData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log("account", account);

  const handleInputChange = (e) => {
    const { id, value, checked } = e.target;
    console.log("name", id);
    console.log("value", !!value);
    console.log("checked", checked);
    setAccountData({ ...accountData, [id]: value || checked });
  };

  // CREATE NEW TABLE FOR CAUSES THEN LINK CHARITY TO CAUSES TABLE
  const handleOnSubmit = async () => {
    setIsLoading(true);
    console.log("submitting", accountData);
    try {
      const response = await fetch(
        "http://localhost:3000/api/update-charity-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountData),
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR UPDATING CHARITY ACCOUNT", error);
    }
  };

  console.log("account", account);
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
            <Checkbox
              id="social"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account.causes[0]["social"]}
            >
              Social
            </Checkbox>
            <Checkbox
              id="environmental"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account.causes[0]["environmental"]}
            >
              Environmental
            </Checkbox>
            <Checkbox
              id="animals"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account.causes[0]["animals"]}
            >
              Animals
            </Checkbox>
            <Checkbox
              id="education"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account.causes[0]["education"]}
            >
              Education
            </Checkbox>
            <Checkbox
              id="science"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account.causes[0]["science"]}
            >
              Science
            </Checkbox>
            <Checkbox
              id="conservation"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account.causes[0]["conservation"]}
            >
              Conservation
            </Checkbox>
            <Checkbox
              id="training"
              size="md"
              colorScheme="green"
              onChange={handleInputChange}
              defaultChecked={account["training"]}
            >
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
          {isLoading ? "Submiting..." : "Submit"}
        </Button>
      </Box>

      {/* <button onClick={() => signOut()}>Logout</button> */}
    </Container>
  );
};

export default Account;
