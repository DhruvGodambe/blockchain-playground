import { Box, Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
    return(
        <Box>
            <Flex justifyContent={"space-between"} alignItems={"center"} mt="10px">
                <Text m="10px 20px" fontSize={"24px"} fontFamily={"cursive"} fontWeight={"bold"} color="white"></Text>
                <Box p="10px 20px">
                    <w3m-button/>
                </Box>
            </Flex>
        </Box>
    )
}

export default Navbar;