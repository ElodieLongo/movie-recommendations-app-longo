import Head from "next/head";
import Image from "next/image";
import NextLink from 'next/link';
import { useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import { Box, FormControl, Container, Flex, Heading, Text, FormLabel, Link, Input, Button, Code } from "@chakra-ui/react";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Login(props) {
  const router = useRouter();
  const [{ username, password }, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ username, password, ...{ [e.target.name]: e.target.value } });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) return router.push("/dashboard");
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container maxW="container.md">
      <Head>
        <title>Login - Amimovie</title>
        <meta name="description" content="Login page for Amimovie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <Flex direction="column" align="center" justify="center" minH="100vh" py={8}>
        <Heading as="h1" size="2xl" mb={8}>
          Welcome to the{" "}
          <Text as="span" color="orange.300">
            amimovie
          </Text>
          <Text>
            login page!
          </Text>
        </Heading>

        <Text fontSize="md" mb={4}>
          You are <Code>{!props.isLoggedIn ? "Not" : ""} Logged In</Code>
        </Text>

        <Box
          as="form"
          onSubmit={handleLogin}
          width="100%"
          maxW="md"
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
              bg="gray.50" 
              borderColor="gray.300"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>

          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              bg="gray.50" 
              borderColor="gray.300"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>

          <Button
            type="submit"
            color="white" 
            bg="orange.300" 
            width="full"
            mb={4}
            _hover={{ bg: "orange.400" }} 
          >
            Login
          </Button>

          {error && <Text color="red.500">{error}</Text>}
        </Box>

        <Link href="/signup" mt={4}>
          <Button variant="link" colorScheme="teal">
            Sign up instead?
          </Button>
        </Link>
      </Flex>

      <Box as="footer" mt={8} textAlign="center">
        <Link as={NextLink}
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          isExternal
        >
          Powered by{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
            priority
          />
        </Link>
      </Box>
    </Container>
  );
}
