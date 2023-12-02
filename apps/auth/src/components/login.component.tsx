import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from '@chakra-ui/react';
import { useLoginMutation } from 'global-store/Module';
import { AuthSlice } from 'global-store/Module';

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const [email, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const { setCredentials } = AuthSlice();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      const { data } = response;
      setCredentials({ ...data, email });
      navigate('/dashboard');
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
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={3} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(event) => setUser(event.currentTarget.value)}
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
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.500'}>Forgot password?</Text>
              </Stack>
              <Button colorScheme={'blue'} variant={'solid'} type="submit">
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Stack>
          </form>
          <Text m={3} textAlign="center" color={'blue.500'}>
            Don't have an account? <Text as="b">Sign up</Text>
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
export default Login;
