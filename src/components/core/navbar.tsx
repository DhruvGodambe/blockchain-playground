import { Box, Flex, Text } from "@chakra-ui/react";

const Navbar = ({title}: any) => {
    return(
        <Box borderBottom={"2px solid #445276"} pb="10px" mb="40px">
            <Flex justifyContent={"space-between"} alignItems={"center"} mt="10px">
                <Text m="10px 20px" fontSize={"20px"} color="white">{title}</Text>
                <Box p="10px 20px">
                    <w3m-button/>
                </Box>
            </Flex>
        </Box>
    )
}

export default Navbar;