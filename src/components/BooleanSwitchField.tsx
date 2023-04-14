import React from "react";
import {
  FormControl,
  HStack,
  Text,
  Switch,
  FormHelperText,
} from "@chakra-ui/react";
import { HUMAN_READABLE_META_TITLES } from "../data/constants/HUMAN_READABLE_META_TITLES";

export const BooleanSwitchField = (props) => {
  return (
    <FormControl>
      <HStack key={props._key}>
        <Text>{HUMAN_READABLE_META_TITLES[props._key]}</Text>
        <Switch
          isChecked={props.value}
          onChange={(e) => {
            props.setMeta({ ...props.meta, [props._key]: e.target.checked });
          }}
        />
      </HStack>
      {!!props.HELP_TEXT[props._key] && (
        <FormHelperText textAlign="left" mt="8px">
          {props.HELP_TEXT[props._key]}
        </FormHelperText>
      )}
    </FormControl>
  );
};
