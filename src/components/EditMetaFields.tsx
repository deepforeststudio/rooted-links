import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { META_ORDER } from "../data/constants/META_ORDER";
import { HELP_TEXT } from "../data/constants/HELP_TEXT";
import { ColorField } from "./ColorField";
import { TextAreaField } from "./TextAreaField";
import { BooleanSwitchField } from "./BooleanSwitchField";
import { StringField } from "./StringField";

export const EditMetaFields = (props) => {
  return (
    <Stack
      direction="row"
      flexWrap={"wrap"}
      background="rgba(255,255,255,0.55)"
      borderRadius="md"
      p={4}
      alignItems="center"
    >
      {META_ORDER.map((key) => {
        const value = props.meta[key];
        let finalDisplay = null;

        console.log(key, value);

        if (key.includes("Color")) {
          finalDisplay = (
            <ColorField
              key={key}
              value={value}
              _key={key}
              HELP_TEXT={HELP_TEXT}
              meta={props.meta}
              setMeta={props.setMeta}
            ></ColorField>
          );
        } else if (key.includes("CSS") || key === "injectedHTML") {
          finalDisplay = (
            <TextAreaField
              key={key}
              value={value}
              _key={key}
              HELP_TEXT={HELP_TEXT}
              setMeta={props.setMeta}
              meta={props.meta}
            ></TextAreaField>
          );
        } else if (typeof value === "boolean") {
          finalDisplay = (
            <BooleanSwitchField
              key={key}
              value={value}
              _key={key}
              HELP_TEXT={HELP_TEXT}
              setMeta={props.setMeta}
              meta={props.meta}
            ></BooleanSwitchField>
          );
        } else if (typeof value === "string") {
          finalDisplay = (
            <StringField
              key={key}
              value={value}
              _key={key}
              HELP_TEXT={HELP_TEXT}
              setMeta={props.setMeta}
              meta={props.meta}
            ></StringField>
          );
        }

        if (!finalDisplay) return null;
        return (
          <Box maxW="350px" w="100%" mb="16px !important">
            {finalDisplay}
          </Box>
        );
      })}
    </Stack>
  );
};
