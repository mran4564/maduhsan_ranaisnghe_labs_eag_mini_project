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
  Box,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { UserRoleEnum } from '../types/user.type';
import { AUTH_API, usePost } from '@b2b-app-mfe/services';

const SignUp = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { postData, isLoading, error } = usePost(AUTH_API + '/signup');
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

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
    const role = isChecked ? UserRoleEnum.SUPPLIER : UserRoleEnum.CUSTOMER;
    const response = await postData({
      email,
      name,
      password,
      role,
    });
    if (response) {
      navigate('/verifiy');
    }
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
                placeholder="ex: John Doe"
                type="name"
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="ex: test@example.com"
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
