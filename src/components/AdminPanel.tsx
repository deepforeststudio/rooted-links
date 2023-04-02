import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  HStack,
  IconButton,
  useToast,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Portal,
  Text,
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
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { PrettyButton } from "./PrettyButton";
import { icons } from "./icons";
import { MdPlaylistAdd } from "react-icons/md";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import { TbInfoCircle } from "react-icons/tb";
import { ImageUploader } from "./ImageUploader";

import { BlockPicker } from "react-color";
import { defaults as defaultsOriginal } from "../data/defaults";

const AdminPanel: React.FC<any> = ({ config }) => {
  const defaults = { ...defaultsOriginal, ...config.defaultOverrides };

  const [links, setLinks] = useState<any[]>(config.links);
  const toast = useToast();

  const iconKeyMaps = React.useMemo(() => {
    const iconKeyMaps: any = {};
    Object.keys(icons).forEach((key) => {
      iconKeyMaps[key] = Object.keys(icons[key]);
    });
    return iconKeyMaps;
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setLinks(reorderedLinks);
  };

  const handleSave = () => {
    // onSave(links);
    toast({ title: "Configuration saved", status: "success" });
  };
  console.log(config);

  return (
    <Box w="100%">
      <VStack spacing={4}>
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

            console.log(link.label, link.order);
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
                  <VStack spacing={4} w="110px">
                    <Button
                      size="sm"
                      leftIcon={<Box as={HiBarsArrowUp} />}
                      onClick={() => {
                        const newLinkOrder = link.order - 1;
                        if (newLinkOrder >= 0) {
                          setLinks((prev) => {
                            const newLinks = [...prev];
                            const targetIndex = newLinks.findIndex(
                              (thisLink) => thisLink.order === newLinkOrder
                            );

                            // Swap the order values between the current link and the target link
                            newLinks[index].order = newLinkOrder;
                            newLinks[targetIndex].order = newLinkOrder + 1;

                            // Swap the positions of the current link and the target link in the array
                            [newLinks[index], newLinks[targetIndex]] = [
                              newLinks[targetIndex],
                              newLinks[index],
                            ];

                            return newLinks;
                          });
                        }
                      }}
                    >
                      Move Up
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<Box as={icons.fa.FaRegTrashAlt} />}
                      colorScheme={"red"}
                      variant="outline"
                      onClick={() => {
                        setLinks((prev) => {
                          const newLinks = [...prev];

                          // Remove the link from the array
                          newLinks.splice(index, 1);

                          // Sort the remaining links by their order
                          newLinks.sort((a, b) => a.order - b.order);

                          // Update the order numbers of the remaining links
                          newLinks.forEach((thisLink, idx) => {
                            thisLink.order = idx;
                          });

                          return newLinks;
                        });
                      }}
                    >
                      Remove
                    </Button>

                    <Button
                      size="sm"
                      leftIcon={<Box as={HiBarsArrowDown} />}
                      onClick={() => {
                        const newLinkOrder = link.order + 1;
                        if (newLinkOrder < links.length) {
                          setLinks((prev) => {
                            const newLinks = [...prev];
                            const targetIndex = newLinks.findIndex(
                              (thisLink) => thisLink.order === newLinkOrder
                            );

                            // Swap the order values between the current link and the target link
                            newLinks[index].order = newLinkOrder;
                            newLinks[targetIndex].order = newLinkOrder - 1;

                            // Swap the positions of the current link and the target link in the array
                            [newLinks[index], newLinks[targetIndex]] = [
                              newLinks[targetIndex],
                              newLinks[index],
                            ];

                            return newLinks;
                          });
                        }
                      }}
                    >
                      Move Down
                    </Button>
                  </VStack>
                  <Stack
                    direction="row"
                    flexWrap={"wrap"}
                    background="rgba(255,255,255,0.55)"
                    borderRadius="md"
                    p={4}
                  >
                    <FormControl w="300px" mr="4px" mb="4px" ml="0">
                      <InputGroup size="sm">
                        <InputLeftAddon
                          children="Label"
                          borderLeftRadius="md"
                        />
                        <Input
                          background="white"
                          value={link.label}
                          borderRightRadius="md"
                          onChange={(e) =>
                            setLinks((prev) => {
                              const newLinks = [...prev];
                              newLinks[index].label = e.target.value;
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
                          value={link.url}
                          onChange={(e) =>
                            setLinks((prev) => {
                              const newLinks = [...prev];
                              newLinks[index].url = e.target.value;
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
                            <MenuButton
                              as={Button}
                              aria-label="Options"
                              size="xs"
                              ml="8px"
                            >
                              {icontypeName}
                            </MenuButton>
                            <Portal>
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    setLinks((prev) => {
                                      const newLinks = [...prev];
                                      newLinks[index].icontype = "simpleIcons";
                                      return newLinks;
                                    })
                                  }
                                >
                                  Simple Icons
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    setLinks((prev) => {
                                      const newLinks = [...prev];
                                      newLinks[index].icontype = "devicons";
                                      return newLinks;
                                    })
                                  }
                                >
                                  Dev Icons
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    setLinks((prev) => {
                                      const newLinks = [...prev];
                                      newLinks[index].icontype = "fa";
                                      return newLinks;
                                    })
                                  }
                                >
                                  Font Awesome
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    setLinks((prev) => {
                                      const newLinks = [...prev];
                                      newLinks[index].icontype = "url";
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
                          value={link.icon}
                          borderRightRadius="md"
                          pl={
                            iconShortName === "url"
                              ? "50px"
                              : iconShortName === "fa"
                              ? "115px"
                              : iconShortName === "devicons"
                              ? "90px"
                              : "100px"
                          }
                          onChange={(e) =>
                            setLinks((prev) => {
                              const newLinks = [...prev];
                              newLinks[index].icon = e.target.value;
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
                          {iconShortName === "url" ? (
                            <ImageUploader
                              key={`image-uploader-${link.label}`}
                              size="xs"
                              mr="8px"
                              label={link.label}
                              onImageChange={(url) => {
                                console.log(link.label);
                                setLinks((prev) => {
                                  const newLinks = [...prev];
                                  const thisIndex = newLinks.findIndex(
                                    (thisLink) => {
                                      console.log(thisLink.label, link.label);
                                      return thisLink.label === link.label;
                                    }
                                  );
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
                                  `https://react-icons.github.io/react-icons/icons?name=${iconShortName}`,
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
                        isChecked={link.ageRestricted}
                        onChange={(e) =>
                          setLinks((prev) => {
                            const newLinks = [...prev];
                            newLinks[index].ageRestricted = e.target.checked;
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
                                  link?.background ||
                                  defaults[link.label]?.background ||
                                  config.defaultButtonColor
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
                                  link?.background ||
                                  defaults[link.label]?.background ||
                                  config.defaultButtonColor
                                }
                                onChange={(color, event) => {
                                  setLinks((prev) => {
                                    const newLinks = [...prev];

                                    const thisIndex = newLinks.findIndex(
                                      (thisLink) => {
                                        return thisLink.label === link.label;
                                      }
                                    );
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
                                  link?.color ||
                                  defaults[link.label]?.color ||
                                  config.defaultButtonTextColor
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
                                  link?.color ||
                                  defaults[link.label]?.color ||
                                  config.defaultButtonTextColor
                                }
                                onChange={(color, event) => {
                                  setLinks((prev) => {
                                    const newLinks = [...prev];

                                    const thisIndex = newLinks.findIndex(
                                      (thisLink) => {
                                        return thisLink.label === link.label;
                                      }
                                    );
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
                            setLinks((prev) => {
                              const newLinks = [...prev];

                              const thisIndex = newLinks.findIndex(
                                (thisLink) => {
                                  return thisLink.label === link.label;
                                }
                              );
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
                        isChecked={link.calendar}
                        disabled={!config.hasCalendarsEnabled}
                        onChange={(e) =>
                          setLinks((prev) => {
                            const newLinks = [...prev];
                            newLinks[index].calendar = e.target.checked;
                            if (!newLinks[index].calendarLabel) {
                              newLinks[index].calendarLabel = "Avaliability";
                            }
                            if (!newLinks[index].calendarUrl) {
                              newLinks[index].calendarUrl = "";
                            }
                            if (!newLinks[index].calendarFilters) {
                              newLinks[index].calendarFilters = JSON.stringify(
                                []
                              );
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
                        {!config.hasCalendarsEnabled && (
                          <Popover
                            placement="right"
                            trigger="hover"
                            openDelay={500}
                          >
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
                              <PopoverHeader>
                                Calendar Addon Required
                              </PopoverHeader>
                              <PopoverBody>
                                Running an availability calendar requires
                                additional reesources on the backend, hence
                                needing an add-on purchase. Read more here.
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
                      <Accordion index={link.calendar ? 0 : undefined}>
                        <AccordionItem>
                          <AccordionButton display="none">
                            <Box as="span" flex="1" textAlign="left">
                              Section 1 title
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel
                            pb={4}
                            display="flex"
                            flexDirection="column"
                          >
                            <InputGroup size="sm">
                              <InputLeftAddon
                                children="Label"
                                borderLeftRadius="md"
                              />
                              <Input
                                background="white"
                                borderRightRadius="md"
                                value={link.calendarLabel}
                                onChange={(e) => {
                                  setLinks((prev) => {
                                    const newLinks = [...prev];
                                    const thisIndex = newLinks.findIndex(
                                      (thisLink) => {
                                        return thisLink.label === link.label;
                                      }
                                    );
                                    newLinks[thisIndex].calendarLabel =
                                      e.target.value;
                                    return newLinks;
                                  });
                                }}
                              />
                            </InputGroup>
                            <InputGroup size="sm" mt="4px">
                              <InputLeftAddon
                                children="URL"
                                borderLeftRadius="md"
                              />
                              <Input
                                background="white"
                                borderRightRadius="md"
                                value={link.calendarUrl}
                                onChange={(e) => {
                                  setLinks((prev) => {
                                    const newLinks = [...prev];
                                    const thisIndex = newLinks.findIndex(
                                      (thisLink) => {
                                        return thisLink.label === link.label;
                                      }
                                    );
                                    newLinks[thisIndex].calendarUrl =
                                      e.target.value;
                                    return newLinks;
                                  });
                                }}
                              />
                            </InputGroup>

                            <InputGroup size="sm" mt="4px">
                              <InputLeftAddon
                                children="Filters"
                                borderLeftRadius="md"
                              />
                              <Input
                                background="white"
                                borderRightRadius="md"
                                value={(
                                  JSON.parse(link.categoryFilters) || []
                                ).join(",")}
                                onChange={(e) => {
                                  setLinks((prev) => {
                                    const newLinks = [...prev];
                                    const thisIndex = newLinks.findIndex(
                                      (thisLink) => {
                                        return thisLink.label === link.label;
                                      }
                                    );
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
                <Box
                  width="100%"
                  borderTopWidth="1px"
                  borderBottomWidth="1px"
                  py="8px"
                >
                  <Button
                    leftIcon={<Box as={MdPlaylistAdd} />}
                    colorScheme={"green"}
                    onClick={() => {
                      setLinks((prev) => {
                        const newLinks = [...prev];

                        // Create an empty link object
                        const emptyLink = {
                          // Add any properties that are needed for a new link object
                          // For example: title: '', url: '', etc.
                          order: index + 1,
                          label: "",
                          url: "",
                          icon: "",
                          icontype: "url",
                          ageRestricted: false,
                        };

                        // Insert the empty link object into the array
                        newLinks.splice(index + 1, 0, emptyLink);

                        // Update the order numbers of the links after the inserted link
                        newLinks.forEach((thisLink) => {
                          if (
                            thisLink.order >= emptyLink.order &&
                            thisLink !== emptyLink
                          ) {
                            thisLink.order = thisLink.order + 1;
                          }
                        });

                        return newLinks;
                      });
                    }}
                  >
                    Insert New Link Here
                  </Button>
                </Box>
              </VStack>
            );
          })}
      </VStack>
      <Button mt={4} onClick={handleSave}>
        Save
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
          onClick={() => loginWithRedirect()}
          position="fixed"
          top="20px"
          right="20px"
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
          onClick={() => loginWithRedirect()}
          position="fixed"
          top="20px"
          right="20px"
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
