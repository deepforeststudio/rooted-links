import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  FormHelperText,
} from "@chakra-ui/react";
import { HUMAN_READABLE_META_TITLES } from "../data/constants/HUMAN_READABLE_META_TITLES";

export const StringField = (props) => {
  return (
    <FormControl>
      <FormLabel>{HUMAN_READABLE_META_TITLES[props._key]}</FormLabel>
      {!!props.HELP_TEXT[props._key] && (
        <FormHelperText textAlign="left" mb="8px">
          {props.HELP_TEXT[props._key]}
        </FormHelperText>
      )}
      <InputGroup>
        <Input
          background={"white"}
          value={props.value}
          onChange={(e) => {
            props.setMeta({ ...props.meta, [props._key]: e.target.value });
          }}
        />
      </InputGroup>
    </FormControl>
  );
};
