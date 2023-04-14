import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { HUMAN_READABLE_META_TITLES } from "../data/constants/HUMAN_READABLE_META_TITLES";

export const TextAreaField = (props: {
  _key: string;
  HELP_TEXT: {
    [x: string]: strin;
  };
  value: string | number | readonly string[] | undefined;
  setMeta: (arg0: any) => void;
  meta: any;
}) => {
  return (
    <FormControl>
      <FormLabel>{HUMAN_READABLE_META_TITLES[props._key]}</FormLabel>
      {!!props.HELP_TEXT[props._key] && (
        <FormHelperText textAlign="left" mb="8px">
          {props.HELP_TEXT[props._key]}
        </FormHelperText>
      )}
      <Textarea
        background="white"
        borderRadius="md"
        value={props.value}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            props.setMeta({
              ...props.meta,
              [props._key]:
                props.value.slice(0, start) + "\t" + props.value.slice(end),
            });
            setTimeout(() => {
              event.target.selectionStart = event.target.selectionEnd =
                start + 1;
            }, 0);
          }
        }}
        onChange={(e) => {
          props.setMeta({ ...props.meta, [props._key]: e.target.value });
        }}
        css={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      />
    </FormControl>
  );
};
