import React from "react";
import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormHelperText,
} from "@chakra-ui/react";
import { BlockPicker } from "react-color";
import { HUMAN_READABLE_META_TITLES } from "../data/constants/HUMAN_READABLE_META_TITLES";

export const ColorField = (props) => {
  return (
    <FormControl>
      <Menu>
        <MenuButton
          as={Button}
          borderLeftRadius="md"
          background={props.meta.defaultButtonColor}
          color={props.meta.defaultButtonTextColor}
          _hover={{
            background: props.meta.defaultButtonColor,
            color: props.meta.defaultButtonTextColor,
            opacity: 0.75,
          }}
          leftIcon={
            <Box
              w="20px"
              h="20px"
              borderRadius="100%"
              background={props.value}
              borderWidth="1px"
              borderColor="white"
            />
          }
        >
          {HUMAN_READABLE_META_TITLES[props._key]}
        </MenuButton>
        <MenuList>
          <MenuItem>
            {" "}
            <BlockPicker
              triangle="hide"
              color={props.value}
              onChange={(color, event) => {
                // save value to the key in meta
                props.setMeta({ ...props.meta, [props._key]: color.hex });
              }}
            />
          </MenuItem>
        </MenuList>
      </Menu>

      {!!props.HELP_TEXT[props._key] && (
        <FormHelperText textAlign="left" mt="8px">
          {props.HELP_TEXT[props._key]}
        </FormHelperText>
      )}
    </FormControl>
  );
};
