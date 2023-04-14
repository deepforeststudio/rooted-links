import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { icons } from "./icons";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export const OrderButtons = (props) => {
  return (
    <VStack spacing={4} w="110px">
      <Button
        size="sm"
        leftIcon={<Box as={HiBarsArrowUp} />}
        onClick={() => {
          const newLinkOrder = props.link.order - 1;

          if (newLinkOrder >= 0) {
            props.setLinks((prev) => {
              const newLinks = [...prev];
              const targetIndex = newLinks.findIndex(
                (thisLink) => thisLink.order === newLinkOrder
              ); // Swap the order values between the current link and the target link

              newLinks[props.index].order = newLinkOrder;
              newLinks[targetIndex].order = newLinkOrder + 1; // Swap the positions of the current link and the target link in the array

              [newLinks[props.index], newLinks[targetIndex]] = [
                newLinks[targetIndex],
                newLinks[props.index],
              ];
              return newLinks;
            });
          }
        }}
      >
        Move Up
      </Button>
      <Button
        size="sm"
        leftIcon={<Box as={icons.fa.FaRegTrashAlt} />}
        colorScheme={"red"}
        variant="outline"
        onClick={() => {
          props.setLinks((prev) => {
            const newLinks = [...prev]; // Remove the link from the array

            newLinks.splice(props.index, 1); // Sort the remaining links by their order

            newLinks.sort((a, b) => a.order - b.order); // Update the order numbers of the remaining links

            newLinks.forEach((thisLink, idx) => {
              thisLink.order = idx;
            });
            return newLinks;
          });
        }}
      >
        Remove
      </Button>

      <Button
        size="sm"
        leftIcon={<Box as={HiBarsArrowDown} />}
        onClick={() => {
          const newLinkOrder = props.link.order + 1;

          if (newLinkOrder < props.links.length) {
            props.setLinks((prev) => {
              const newLinks = [...prev];
              const targetIndex = newLinks.findIndex(
                (thisLink) => thisLink.order === newLinkOrder
              ); // Swap the order values between the current link and the target link

              newLinks[props.index].order = newLinkOrder;
              newLinks[targetIndex].order = newLinkOrder - 1; // Swap the positions of the current link and the target link in the array

              [newLinks[props.index], newLinks[targetIndex]] = [
                newLinks[targetIndex],
                newLinks[props.index],
              ];
              return newLinks;
            });
          }
        }}
      >
        Move Down
      </Button>
    </VStack>
  );
};
