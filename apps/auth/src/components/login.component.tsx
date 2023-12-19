import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_API, usePost } from '@b2b-app-mfe/services';
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
  useToast,
} from '@chakra-ui/react';
import { AuthSlice } from 'global-store/Module';

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const [email, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const { setCredentials } = AuthSlice();
  const { postData, isLoading, error } = usePost(AUTH_API + '/signin');
  const toast = useToast();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        position: 'bottom-right',
        description: error,
        status: 'error',
        isClosable: true,
      });
    }
  }, [error]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const result = await postData({ email, password });
    if (result) {
      setCredentials({ ...result.data });
      navigate('/b2b-app');
    }
    if (error) {
      toast({
        position: 'bottom-right',
        description: error,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
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
                placeholder="test@example.com"
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
            Don't have an account?{' '}
            <Text _hover={{ cursor: 'pointer' }} onClick={goToSignUp} as="b">
              Sign up
            </Text>
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
