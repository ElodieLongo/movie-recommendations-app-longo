import NextLink from 'next/link';
import useLogout from "../../hooks/useLogout";
import { Box, Code, Container, Flex, Heading, Text, VStack, Link } from "@chakra-ui/react";

export default function Header(props) {
  const logout = useLogout();
  return (
    <Box as="header" bg="orange.300" p={4} color="white">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Text fontSize="lg" fontWeight="bold">
          <Link as={NextLink} href="/" passHref>
            Home
          </Link>
        </Text>

        {props.isLoggedIn ? (
          <Flex align="center">
            <Text mr={4}>Welcome, {props.username}!</Text>
            <Text
              onClick={logout}
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Logout
            </Text>
          </Flex>
        ) : (
          <Flex>
            <Text mr={4}>
              <Link as={NextLink} href="/" passHref>
                Home
              </Link>
            </Text>
            <Text>
              <Link as={NextLink} href="/login" passHref>
                Login
              </Link>
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
