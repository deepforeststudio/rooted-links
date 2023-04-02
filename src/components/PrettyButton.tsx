import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { defaults as defaultsOriginal } from "../data/defaults";
import { icons } from "./icons";
import { CalendarPanel } from "./CalendarPanel";

export const PrettyButton: React.FC<any> = ({
  children,
  onClick = () => null,
  config,
  calendarButtonOpen,
  ...buttonConfig
}) => {
  const {
    icon,
    icontype,
    label,
    url,
    isAgeRestricted,
    calendar,
    calendarLabel,
    background = defaultsOriginal?.[buttonConfig.label]?.background ||
      config.defaultOverrides?.[buttonConfig.label]?.background ||
      config.defaultButtonColor,
    color = defaultsOriginal?.[buttonConfig.label]?.color ||
      config.defaultOverrides?.[buttonConfig.label]?.color ||
      config.defaultButtonTextColor,
  } = buttonConfig;

  let Icon: any = () => null;
  if (
    icontype &&
    icontype !== "url" &&
    icons[icontype] &&
    icons[icontype][icon]
  )
    Icon = icons[icontype][icon];

  if (icontype === "url")
    Icon = (props: any) => <Image maxHeight="18px" src={icon} {...props} />;

  const { isOpen, onToggle } = useDisclosure();

  const defaults = { ...defaultsOriginal, ...config.defaultOverrides };

  if (isAgeRestricted) {
    return (
      <Box w="100%">
        <Button
          className="list-button"
          size="lg"
          w="100%"
          my="0.5rem"
          leftIcon={<Box as={Icon} className="list-button-icon" />}
          borderRadius="full"
          onClick={() => onToggle()}
          background={background}
          color={color}
          borderColor={defaults?.[label]?.borderColor || "transparent"}
          borderWidth="1px"
          backdropFilter={"blur(5px)"}
          _hover={{
            opacity: 0.8,
          }}
        >
          {children}
        </Button>
        <Box
          height={isOpen ? "135px" : 0}
          borderColor={isOpen ? "#ccc" : "transparent"}
          borderWidth="1px"
          opacity={isOpen ? 1 : 0}
          w="100%"
          overflow="hidden"
          transition="height .3s ease, border-color .3s linear, padding-top .3s ease, padding-bottom .3s ease, opacity .3s ease"
          borderRadius="lg"
          py={isOpen ? "1rem" : 0}
          px="1rem"
          background="rgba(255,255,255,0.45)"
          backdropFilter={"blur(2px)"}
        >
          <Heading size="sm" mb="0.5rem">
            Sensitive Content
          </Heading>
          <Text fontSize="sm" color="gray.500" lineHeight="1rem" mb="0.5rem">
            This link may contain content
            <br />
            that is not appropriate for all audiences.
          </Text>
          <Link
            href={url}
            target="_blank"
            w="100%"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button colorScheme="red" size="sm">
              I understand, take me there
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  if (calendar && config.hasCalendarsEnabled) {
    return (
      <CalendarPanel
        Icon={Icon}
        config={config}
        {...buttonConfig}
        background={background}
        color={color}
        calendarButtonOpen={calendarButtonOpen}
      >
        {children}
      </CalendarPanel>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      w="100%"
      _hover={{
        textDecoration: "none",
      }}
    >
      <Button
        className="list-button"
        size="lg"
        w="100%"
        my="0.5rem"
        leftIcon={<Box as={Icon} className="list-button-icon" />}
        borderRadius="full"
        onClick={onClick}
        background={background}
        color={color}
        borderColor={defaults?.[label]?.borderColor || "transparent"}
        borderWidth="1px"
        backdropFilter={"blur(5px)"}
        _hover={{
          opacity: 0.8,
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
