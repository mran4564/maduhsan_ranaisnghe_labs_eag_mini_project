import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Icon,
  InputGroup,
  InputRightElement,
  CircularProgress,
  Box,
  HStack,
} from '@chakra-ui/react';
import { BASE_AUTH_API } from '../utils/constants';
import { UserRoleEnum } from '../types/user.type';

const SignUp = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const [isChecked, setIsChecked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the value
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const role = isChecked ? UserRoleEnum.SUPPLIER : UserRoleEnum.CUSTOMER;
      const response = await axios.post(`${BASE_AUTH_API}/signup`, {
        email,
        name,
        password,
        role,
      });
      if (response.status === 201) {
        navigate('/verification');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current?.focus();
    }
    setIsLoading(false);
  };

  const goToSignIn = () => {
    navigate('/login');
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={3} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Register to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired>
              <FormLabel> {isChecked ? 'Brand Name' : 'Full Name'} </FormLabel>
              <Input
                type="name"
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*******"
                  size="lg"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <Icon name="view-off" />
                    ) : (
                      <Icon name="view" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                mt={3}
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Box></Box>
                <HStack>
                  <Text>Supplier</Text>
                  <Checkbox
                    isChecked={isChecked}
                    onChange={handleCheckboxChange}
                  ></Checkbox>
                </HStack>
              </Stack>
              <Button colorScheme={'blue'} variant={'solid'} type="submit">
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Stack>
          </form>
          <Text
            m={1}
            _hover={{ cursor: 'pointer' }}
            onClick={goToSignIn}
            textAlign="center"
            color={'blue.500'}
          >
            Already have an account? <Text as="b">Login</Text>
          </Text>
        </Stack>
      </Flex>
      <Flex flex={2}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://hips.hearstapps.com/hmg-prod/images/assorted-fruits-and-vegetables-background-royalty-free-image-512628566-1533328851.jpg'
          }
        />
      </Flex>
    </Stack>
  );
};
export default SignUp;
