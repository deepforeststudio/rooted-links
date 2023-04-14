import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { MdPlaylistAdd } from "react-icons/md";

export const AddNewLink = (props) => {
  return (
    <Box width="100%" borderTopWidth="1px" borderBottomWidth="1px" py="8px">
      <Button
        leftIcon={<Box as={MdPlaylistAdd} />}
        colorScheme={"green"}
        onClick={() => {
          props.setLinks((prev) => {
            const newLinks = [...prev]; // Create an empty link object

            const emptyLink = {
              // Add any properties that are needed for a new link object
              // For example: title: '', url: '', etc.
              order: props.index + 1,
              label: "",
              url: "",
              icon: "",
              icontype: "url",
              ageRestricted: false,
            }; // Insert the empty link object into the array

            newLinks.splice(props.index + 1, 0, emptyLink); // Update the order numbers of the links after the inserted link

            newLinks.forEach((thisLink) => {
              if (thisLink.order >= emptyLink.order && thisLink !== emptyLink) {
                thisLink.order = thisLink.order + 1;
              }
            });
            return newLinks;
          });
        }}
      >
        Insert New Link Here
      </Button>
    </Box>
  );
};
