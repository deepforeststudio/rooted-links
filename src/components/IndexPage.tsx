import * as React from "react";
import { PageProps } from "gatsby";
import { Avatar, Box, Heading } from "@chakra-ui/react";
import { PrettyButton } from "./PrettyButton";
import { AdminPanelWithAuth } from "./AdminPanel";

export const IndexPage: React.FC<PageProps> = ({ serverData, location }) => {
  const config = (serverData as any)?.meta || {};
  const isAdminEnabled =
    location.pathname.includes("admin") && !!process.env.GATSBY_AUTH0_CLIENT_ID;
  console.log(config.links);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `${config.overrideCSS}`,
        }}
      />
      <Box
        as="main"
        w="100vw"
        h="100vh"
        position="fixed"
        top={0}
        left={0}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        textAlign="center"
        pt="10rem"
        overflowY="auto"
        background={config.background}
        backgroundPosition={config.backgroundPosition}
        backgroundSize={config.backgroundSize}
        backgroundRepeat={config.backgroundRepeat}
        color={config.textColor}
        className="background"
      >
        <Box
          w={isAdminEnabled ? "800px" : "400px"}
          maxW={"82vw"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          className="container"
        >
          <Avatar size="2xl" name={config.title} src={config.profileImage} />
          <Heading mb="0.5rem">{config.title}</Heading>
          <Heading size="sm" mb="1.5rem">
            {config.url}
          </Heading>

          {!isAdminEnabled && (
            <>
              {!!config.injectedHTML &&
                config.injectedHTMLPosition === "top" && (
                  <Box
                    w="100%"
                    dangerouslySetInnerHTML={{
                      __html: config.injectedHTML,
                    }}
                  />
                )}
              {config.links.map((button: any) => (
                <PrettyButton key={button.label} config={config} {...button}>
                  {button.label}
                </PrettyButton>
              ))}
              {!!config.injectedHTML &&
                config.injectedHTMLPosition === "bottom" && (
                  <Box
                    w="100%"
                    dangerouslySetInnerHTML={{
                      __html: config.injectedHTML,
                    }}
                  />
                )}
            </>
          )}

          {isAdminEnabled && <AdminPanelWithAuth config={config} />}
          <Box height="2rem" />
        </Box>
      </Box>
    </>
  );
};
