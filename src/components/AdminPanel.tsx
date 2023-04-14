import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Select,
  Checkbox,
  HStack,
  useToast,
  Image,
  InputRightAddon,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { PrettyButton } from "./PrettyButton";

import { defaults as defaultsOriginal } from "../data/defaults";
import { DeepForestLogo } from "./DeepForestLogo";
import { omit } from "../utils/omit";
import { EditMetaFields } from "./EditMetaFields";
import { OrderButtons } from "./OrderButtons";
import { EditLinkFields } from "./EditLinkFields";
import { AddNewLink } from "./AddNewLink";

const AdminPanel: React.FC<any> = ({ config }) => {
  const [meta, setMeta] = useState<any>(
    omit(config, [
      "links",
      "clientId",
      "hasCalendarsEnabled",
      "links_aggregate",
      "id",
      "url",
      "externalCss",
    ])
  );
  const defaults = { ...defaultsOriginal, ...config.defaultOverrides, ...meta };

  const [backgroundIsImage, setBackgroundIsImage] = useState<boolean>(
    config.background.startsWith("url")
  );

  const [links, setLinks] = useState<any[]>(config.links);
  const toast = useToast();

  const handleSave = () => {
    // onSave(links);
    toast({ title: "Configuration saved", status: "success" });
  };
  console.log(meta.injectedHTML);

  return (
    <Box w="100%">
      <VStack spacing={4}>
        <EditMetaFields meta={meta} setMeta={setMeta} />
        <VStack spacing={4}>
          {!!meta.injectedHTML && meta.injectedHTMLPosition === "top" && (
            <Box
              w="100%"
              dangerouslySetInnerHTML={{
                __html: meta.injectedHTML,
              }}
            />
          )}
          {links
            .sort((a, b) => {
              return a.order - b.order;
            })
            .map((link, index) => {
              const currenticontype = link.icontype;
              let icontypeName = "Select an icon type";
              let iconShortName = "Select an icon";
              if (currenticontype === "url") {
                icontypeName = "URL";
                iconShortName = "url";
              } else if (currenticontype === "fa") {
                icontypeName = "Font Awesome";
                iconShortName = "fa";
              } else if (currenticontype === "devicons") {
                icontypeName = "Devicons";
                iconShortName = "di";
              } else if (currenticontype === "simpleIcons") {
                icontypeName = "Simple Icons";
                iconShortName = "si";
              }

              return (
                <VStack
                  spacing={4}
                  w="full"
                  key={String(link.id) + String(index)}
                >
                  <HStack
                    spacing={4}
                    w="full"
                    key={String(link.id) + String(index)}
                  >
                    {/* <IconButton
                icon={<IoReorderThreeOutline />}
                aria-label="Reorder"
              /> */}
                    <OrderButtons
                      link={link}
                      setLinks={setLinks}
                      links={links}
                      index={index}
                    ></OrderButtons>
                    <EditLinkFields
                      icontypeName={icontypeName}
                      iconShortName={iconShortName}
                      defaults={defaults}
                      setLinks={setLinks}
                      link={link}
                      links={links}
                      config={config}
                    ></EditLinkFields>
                  </HStack>
                  <Box w="450px" pointerEvents="none">
                    <PrettyButton
                      key={link.label}
                      config={config}
                      calendarButtonOpen={link.calendar}
                      {...link}
                    >
                      {link.label}
                    </PrettyButton>
                  </Box>
                  <AddNewLink setLinks={setLinks} index={index}></AddNewLink>
                </VStack>
              );
            })}

          {!!meta.injectedHTML && meta.injectedHTMLPosition === "bottom" && (
            <Box
              w="100%"
              dangerouslySetInnerHTML={{
                __html: meta.injectedHTML,
              }}
            />
          )}
        </VStack>
      </VStack>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleSave}
        position="fixed"
        bottom="16px"
        right="16px"
        zIndex={999}
        boxShadow="0px 0px 10px 0px rgba(0,0,0,0.75)"
      >
        Save Changes
      </Button>
    </Box>
  );
};

export const AdminPanelWithAuth = ({ config }) => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  if (isAuthenticated) {
    return (
      <>
        <Button
          leftIcon={<DeepForestLogo />}
          onClick={() => loginWithRedirect()}
          background="#071A3F"
          color="white"
          position="fixed"
          top="20px"
          right="20px"
          zIndex={999}
          boxShadow="0px 0px 10px 0px rgba(0,0,0,0.75)"
        >
          Log out
        </Button>
        <AdminPanel config={config} />
      </>
    );
  } else {
    return (
      <>
        <Button
          leftIcon={<DeepForestLogo />}
          onClick={() => loginWithRedirect()}
          background="#071A3F"
          color="white"
          position="fixed"
          top="20px"
          right="20px"
          zIndex={999}
        >
          Log in
        </Button>
        {config.links.map((button: any) => (
          <PrettyButton key={button.label} config={config} {...button}>
            {button.label}
          </PrettyButton>
        ))}
      </>
    );
  }
};

export default AdminPanel;
