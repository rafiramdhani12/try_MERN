import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const ViewPage = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [product, setProduct] = useState(null);
  const route = useNavigate();

  const handleBack = () => {
    route("/");
  };

  const bg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Container>
        {product ? (
          <>
            <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} bg={bg} p={5}>
              <Heading as={"h1"} textAlign={"center"} mb={5} mt={5}>
                {product.name}
              </Heading>
              <Image
                h={48}
                w={"full"}
                objectFit={"contain"}
                src={product.image}
                alt=""
              />
              <Heading as={"h3"} textAlign={"center"} mt={5}>
                ${product.price}
              </Heading>
              <Box justifyContent={"center"} display={"flex"} mt={5} gap={4}>
                <Button bg={"green"}>Buy</Button>
                <Button bg={"red"} onClick={handleBack}>
                  Back
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </>
  );
};

export default ViewPage;
