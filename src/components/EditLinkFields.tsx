import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Portal,
  Switch,
  InputLeftAddon,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Link,
} from "@chakra-ui/react";
import { TbInfoCircle } from "react-icons/tb";
import { ImageUploader } from "./ImageUploader";
import { BlockPicker } from "react-color";

export const EditLinkFields = (props) => {
  return (
    <Stack
      direction="row"
      flexWrap={"wrap"}
      background="rgba(255,255,255,0.55)"
      borderRadius="md"
      p={4}
    >
      <FormControl w="300px" mr="4px" mb="4px" ml="0">
        <InputGroup size="sm">
          <InputLeftAddon children="Label" borderLeftRadius="md" />
          <Input
            background="white"
            value={props.link.label}
            borderRightRadius="md"
            onChange={(e) =>
              props.setLinks((prev) => {
                const newLinks = [...prev];
                newLinks[props.index].label = e.target.value;
                return newLinks;
              })
            }
          />
        </InputGroup>
      </FormControl>
      <FormControl w="300px" mr="4px" mb="4px" ml="0">
        <InputGroup size="sm">
          <InputLeftAddon children="URL" borderLeftRadius="md" />
          <Input
            borderRightRadius="md"
            background="white"
            value={props.link.url}
            onChange={(e) =>
              props.setLinks((prev) => {
                const newLinks = [...prev];
                newLinks[props.index].url = e.target.value;
                return newLinks;
              })
            }
          />
        </InputGroup>
      </FormControl>
      <FormControl w="600px" mr="4px" mb="4px" ml="0">
        <InputGroup size="sm">
          <InputLeftAddon children="Icon" borderLeftRadius="md" />
          <InputLeftElement
            width="150px"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            ml="50px"
          >
            <Menu>
              <MenuButton as={Button} aria-label="Options" size="xs" ml="8px">
                {props.icontypeName}
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      props.setLinks((prev) => {
                        const newLinks = [...prev];
                        newLinks[props.index].icontype = "simpleIcons";
                        return newLinks;
                      })
                    }
                  >
                    Simple Icons
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      props.setLinks((prev) => {
                        const newLinks = [...prev];
                        newLinks[props.index].icontype = "devicons";
                        return newLinks;
                      })
                    }
                  >
                    Dev Icons
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      props.setLinks((prev) => {
                        const newLinks = [...prev];
                        newLinks[props.index].icontype = "fa";
                        return newLinks;
                      })
                    }
                  >
                    Font Awesome
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      props.setLinks((prev) => {
                        const newLinks = [...prev];
                        newLinks[props.index].icontype = "url";
                        return newLinks;
                      })
                    }
                  >
                    Image URL
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </InputLeftElement>
          <Input
            background="white"
            value={props.link.icon}
            borderRightRadius="md"
            pl={
              props.iconShortName === "url"
                ? "50px"
                : props.iconShortName === "fa"
                ? "115px"
                : props.iconShortName === "devicons"
                ? "90px"
                : "100px"
            }
            onChange={(e) =>
              props.setLinks((prev) => {
                const newLinks = [...prev];
                newLinks[props.index].icon = e.target.value;
                return newLinks;
              })
            }
          />
          <InputRightElement
            width="150px"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {props.iconShortName === "url" ? (
              <ImageUploader
                key={`image-uploader-${props.link.label}`}
                size="xs"
                mr="8px"
                label={props.link.label}
                onImageChange={(url) => {
                  console.log(props.link.label);
                  props.setLinks((prev) => {
                    const newLinks = [...prev];
                    const thisIndex = newLinks.findIndex((thisLink) => {
                      console.log(thisLink.label, props.link.label);
                      return thisLink.label === props.link.label;
                    });
                    newLinks[thisIndex].icon = url;
                    console.log(thisIndex, newLinks[thisIndex]);
                    return newLinks;
                  });
                }}
              />
            ) : (
              <Button
                size="xs"
                mr="8px"
                onClick={() =>
                  window.open(
                    `https://react-icons.github.io/react-icons/icons?name=${props.iconShortName}`,
                    "_blank"
                  )
                }
              >
                See Icons
              </Button>
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl
        w="300px"
        display="flex"
        flexDirection="row"
        alignItems="center"
        py="8px"
        mr="4px"
        ml="0"
      >
        <Switch
          colorScheme="red"
          isChecked={props.link.ageRestricted}
          onChange={(e) =>
            props.setLinks((prev) => {
              const newLinks = [...prev];
              newLinks[props.index].ageRestricted = e.target.checked;
              return newLinks;
            })
          }
        />
        <FormLabel ml="4px" my="0">
          Is this age restricted?
        </FormLabel>
      </FormControl>
      <FormControl
        w="300px"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        py="8px"
        mr="4px"
        ml="0"
      >
        <ButtonGroup size="xs" isAttached>
          <Menu>
            <MenuButton
              as={Button}
              borderLeftRadius="md"
              leftIcon={
                <Box
                  w="20px"
                  h="20px"
                  borderRadius="100%"
                  background={
                    props.link?.background ||
                    props.defaults[props.link.label]?.background ||
                    props.config.defaultButtonColor
                  }
                />
              }
            >
              Button Color
            </MenuButton>
            <MenuList>
              <MenuItem>
                {" "}
                <BlockPicker
                  triangle="hide"
                  color={
                    props.link?.background ||
                    props.defaults[props.link.label]?.background ||
                    props.config.defaultButtonColor
                  }
                  onChange={(color, event) => {
                    props.setLinks((prev) => {
                      const newLinks = [...prev];
                      const thisIndex = newLinks.findIndex((thisLink) => {
                        return thisLink.label === props.link.label;
                      });
                      newLinks[thisIndex].background = color.hex;
                      return newLinks;
                    });
                  }}
                />
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              borderLeftWidth="1px"
              borderRightWidth="1px"
              leftIcon={
                <Box
                  w="20px"
                  h="20px"
                  borderRadius="100%"
                  background={
                    props.link?.color ||
                    props.defaults[props.link.label]?.color ||
                    props.config.defaultButtonTextColor
                  }
                />
              }
            >
              Text Color
            </MenuButton>
            <MenuList>
              <MenuItem>
                {" "}
                <BlockPicker
                  triangle="hide"
                  color={
                    props.link?.color ||
                    props.defaults[props.link.label]?.color ||
                    props.config.defaultButtonTextColor
                  }
                  onChange={(color, event) => {
                    props.setLinks((prev) => {
                      const newLinks = [...prev];
                      const thisIndex = newLinks.findIndex((thisLink) => {
                        return thisLink.label === props.link.label;
                      });
                      newLinks[thisIndex].color = color.hex;
                      return newLinks;
                    });
                  }}
                />
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            borderRightRadius="md"
            onClick={() => {
              props.setLinks((prev) => {
                const newLinks = [...prev];
                const thisIndex = newLinks.findIndex((thisLink) => {
                  return thisLink.label === props.link.label;
                });
                newLinks[thisIndex] = {
                  ...newLinks[thisIndex],
                  color: undefined,
                  background: undefined,
                };
                return newLinks;
              });
            }}
          >
            Use Defaults
          </Button>
        </ButtonGroup>
      </FormControl>
      <FormControl
        w="300px"
        display="flex"
        flexDirection="row"
        alignItems="center"
        py="8px"
        mr="4px"
        ml="0"
      >
        <Switch
          colorScheme="green"
          isChecked={props.link.calendar}
          disabled={!props.config.hasCalendarsEnabled}
          onChange={(e) =>
            props.setLinks((prev) => {
              const newLinks = [...prev];
              newLinks[props.index].calendar = e.target.checked;

              if (!newLinks[props.index].calendarLabel) {
                newLinks[props.index].calendarLabel = "Avaliability";
              }

              if (!newLinks[props.index].calendarUrl) {
                newLinks[props.index].calendarUrl = "";
              }

              if (!newLinks[props.index].calendarFilters) {
                newLinks[props.index].calendarFilters = JSON.stringify([]);
              }

              return newLinks;
            })
          }
        />
        <FormLabel
          ml="4px"
          my="0"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          Enable Availability Calendar?
          {!props.config.hasCalendarsEnabled && (
            <Popover placement="right" trigger="hover" openDelay={500}>
              <PopoverTrigger>
                <Box
                  ml="4px"
                  color="blue.500"
                  as={TbInfoCircle}
                  cursor="help"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Calendar Addon Required</PopoverHeader>
                <PopoverBody>
                  Running an availability calendar requires additional
                  reesources on the backend, hence needing an add-on purchase.
                  Read more here.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </FormLabel>
      </FormControl>
      <FormControl
        w="300px"
        display="flex"
        flexDirection="row"
        alignItems="center"
        py="8px"
        mr="4px"
        ml="0"
      >
        <Accordion index={props.link.calendar ? 0 : undefined}>
          <AccordionItem>
            <AccordionButton display="none">
              <Box as="span" flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} display="flex" flexDirection="column">
              <InputGroup size="sm">
                <InputLeftAddon children="Label" borderLeftRadius="md" />
                <Input
                  background="white"
                  borderRightRadius="md"
                  value={props.link.calendarLabel}
                  onChange={(e) => {
                    props.setLinks((prev) => {
                      const newLinks = [...prev];
                      const thisIndex = newLinks.findIndex((thisLink) => {
                        return thisLink.label === props.link.label;
                      });
                      newLinks[thisIndex].calendarLabel = e.target.value;
                      return newLinks;
                    });
                  }}
                />
              </InputGroup>
              <InputGroup size="sm" mt="4px">
                <InputLeftAddon children="CalID" borderLeftRadius="md" />
                <Input
                  background="white"
                  borderRightRadius="md"
                  value={props.link.calendarId}
                  onChange={(e) => {
                    props.setLinks((prev) => {
                      const newLinks = [...prev];
                      const thisIndex = newLinks.findIndex((thisLink) => {
                        return thisLink.label === props.link.label;
                      });
                      newLinks[thisIndex].calendarId = e.target.value;
                      return newLinks;
                    });
                  }}
                />
                <InputRightElement borderRightRadius="md">
                  <Box position="relative">
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <IconButton
                          aria-label="Help"
                          icon={<TbInfoCircle />}
                          size="xs"
                          cursor="help"
                          color="blue.500"
                          variant="ghost"
                        />
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Calendar ID</PopoverHeader>
                          <style>
                            {`
                                              .calendar-id-help::-webkit-scrollbar {
                                                -webkit-appearance: none;
                                                width: 7px;
                                              }

                                              .calendar-id-help::-webkit-scrollbar-thumb {
                                                border-radius: 4px;
                                                background-color: rgba(
                                                  0,
                                                  0,
                                                  0,
                                                  0.5
                                                );
                                                box-shadow: 0 0 1px
                                                  rgba(255, 255, 255, 0.5);
                                              }
                                            `}
                          </style>
                          <PopoverBody
                            className="calendar-id-help"
                            h="190px"
                            overflowY="auto"
                          >
                            The calendar ID is the unique identifier for your
                            calendar. You can find it in the calendar settings
                            in Google Calendar.
                            <br />
                            <br />
                            Your calendar must be public for this functionality
                            to work. NOTE: DO NOT STORE SENSITIVE INFORMATION IN
                            THIS CALENDAR.
                            <br />
                            <br />
                            Calendar events MUST have a "-" in the title. The
                            text before the "-" will be dropped and may be used
                            for your own notes/reference. The text after the "-"
                            will be displayed publically, and used as the
                            filter/category for the event ('Filter 1', 'Filter
                            2', etc.) allowing for multiple events to be
                            displayed on the same day. (e.g. "Tommy - Filter 1",
                            "Logan - Filter 2) Make sure the Filters you use in
                            your event titles are the same as the Filters you
                            set below.
                            <br />
                            <br />
                            For more information, see{" "}
                            <Link
                              color="blue"
                              href="https://docs.simplecalendar.io/find-google-calendar-id/"
                            >
                              {" "}
                              this article.
                            </Link>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Box>
                </InputRightElement>
              </InputGroup>

              <InputGroup size="sm" mt="4px">
                <InputLeftAddon children="Filters" borderLeftRadius="md" />
                <Input
                  background="white"
                  borderRightRadius="md"
                  value={(JSON.parse(props.link.categoryFilters) || []).join(
                    ","
                  )}
                  onChange={(e) => {
                    props.setLinks((prev) => {
                      const newLinks = [...prev];
                      const thisIndex = newLinks.findIndex((thisLink) => {
                        return thisLink.label === props.link.label;
                      });
                      const newFilters = e.target.value
                        .split(",")
                        .map((filter) => {
                          return filter.trim();
                        });
                      newLinks[thisIndex].categoryFilters =
                        JSON.stringify(newFilters);
                      return newLinks;
                    });
                  }}
                />
              </InputGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </FormControl>
    </Stack>
  );
};
