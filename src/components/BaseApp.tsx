import * as React from "react";
import { PageProps } from "gatsby";
import { ChakraProvider } from "@chakra-ui/react";
import { IndexPage } from "./IndexPage";

export const BaseApp: React.FC<PageProps> = (props) => {
  return (
    <ChakraProvider>
      <IndexPage {...props} />
    </ChakraProvider>
  );
};
