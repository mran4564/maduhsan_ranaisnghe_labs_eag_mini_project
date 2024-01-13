import {
  Box,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export type CartProductMetaProps = {
  isGiftWrapping?: boolean;
  name: string;
  description: string;
  image: string;
  price: number;
};

export const CartProductMeta = (props: CartProductMetaProps) => {
  const { image, name, description, price } = props;
  const shortedDescription = description.slice(0, 100);
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="md"
        width="70px"
        height="70px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box>
        <Stack spacing="0.3">
          <Text fontWeight="medium">{name}</Text>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            {shortedDescription} ...
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={mode('gray.800', 'gray.400')}
          >
            $ {price.toFixed(2)}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
