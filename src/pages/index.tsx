import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { css } from "@emotion/react";
import { config } from "./config";
import * as fa from "react-icons/fa";
import * as devicons from "react-icons/di";
import * as simpleIcons from "react-icons/si";
import { MdEventAvailable, MdEventBusy, MdEventNote } from "react-icons/md";
import useFetch from "use-http";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Heading,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { defaults } from "./defaults";

const icons = {
  fa,
  devicons,
  simpleIcons,
} as any;

const CalendarPanel: React.FC<any> = ({ Icon, children, ...buttonProfile }) => {
  const {
    icon,
    icontype,
    label,
    url,
    isAgeRestricted,
    calendar,
    calendarLabel,
    categoryFilters,
  } = buttonProfile;

  console.log(icontype, icon);
  const { isOpen, onToggle } = useDisclosure();

  const [filters, setFilters] = React.useState<any>([]);

  const perChunk = 4;

  const chunkedCategories = React.useMemo(
    () =>
      categoryFilters.reduce((all: any, one: any, i: any) => {
        const ch = Math.floor(i / perChunk);
        all[ch] = [].concat(all[ch] || [], one);
        return all;
      }, []),
    [categoryFilters]
  );

  const [currentPage, setCurrentPage] = React.useState(0);

  const listofNext28Days = React.useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + 28 * currentPage);
    const next28 = new Date();
    next28.setDate(today.getDate() + 28 * (currentPage + 1) - 1);
    const list = [];
    for (let d = today; d <= next28; d.setDate(d.getDate() + 1)) {
      list.push(new Date(d));
    }
    return list;
  }, []);

  const startDate = listofNext28Days[0];
  const endDate = listofNext28Days[listofNext28Days.length - 1];

  const next28daysByWeek = React.useMemo(() => {
    const weeks = [];
    const chunkSize = 7;

    for (let i = 0; i < listofNext28Days.length; i += chunkSize) {
      const chunk = listofNext28Days.slice(i, i + chunkSize);
      weeks.push(chunk);
      // do whatever
    }

    return weeks;
  }, [listofNext28Days]);

  // ------------------------------

  const [events, setEvents] = React.useState([]);
  const { get, post, response, loading, error } = useFetch(
    buttonProfile.calendarUrl
  );

  React.useEffect(() => {
    initializeEvents();
  }, []);

  async function initializeEvents() {
    const initialTodos = await get("/todos");
    if (response.ok) {
      // TODO: only grab events after today
      setEvents(initialTodos?.events || []);
    }
  }
  console.log(events);

  return (
    <Box w="100%" overflow="hidden">
      <ButtonGroup
        isAttached
        size="lg"
        w="100%"
        my="0.5rem"
        borderRadius="full"
        borderWidth="1px"
        backdropFilter={"blur(5px)"}
        display="flex"
      >
        <Button
          flex={1}
          onClick={() => window.open(url, "_blank")}
          className="list-button"
          leftIcon={<Box as={Icon} className="list-button-icon" />}
          background={
            defaults[label]
              ? defaults[label].background
              : config.defaultButtonColor
          }
          color={
            defaults[label]
              ? defaults[label].color
              : config.defaultButtonTextColor
          }
          borderColor={defaults?.[label]?.borderColor || "transparent"}
          borderLeftRadius="full"
          _hover={{
            opacity: 0.8,
          }}
          justifyContent="flex-end"
          pr="2.25rem"
        >
          {children}
        </Button>
        <Button
          onClick={() => onToggle()}
          borderRightRadius="full"
          background={
            defaults[label]
              ? defaults[label].background
              : config.defaultButtonColor
          }
          color={
            defaults[label]
              ? defaults[label].color
              : config.defaultButtonTextColor
          }
          borderColor={defaults?.[label]?.borderColor || "transparent"}
          borderLeft="1px solid rgba(0,0,0,0.1)"
          _hover={{
            opacity: 0.8,
          }}
          fontSize="sm"
          px="0.75rem"
        >
          {calendarLabel}
        </Button>
      </ButtonGroup>
      <Box
        height={isOpen ? "300px" : 0}
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
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          {chunkedCategories.map((chunk: any, i: any) => {
            return (
              <ButtonGroup
                isAttached
                size="xs"
                width="100%"
                display="flex"
                flexWrap="wrap"
                mb={i === 0 ? 0 : "0.5rem"}
                mt={i === 0 ? "0.5rem" : 0}
                borderRadius="24px"
                color={config.defaultButtonTextColor}
                borderTopLeftRadius={i === 0 ? "12px" : 0}
                borderTopRightRadius={i === 0 ? "12px" : 0}
                borderBottomLeftRadius={
                  i === chunkedCategories.length - 1 ? "12px" : 0
                }
                borderBottomRightRadius={
                  i === chunkedCategories.length - 1 ? "12px" : 0
                }
              >
                {i === 0 && (
                  <Button
                    color={config.defaultButtonTextColor}
                    background={
                      filters.length === 0
                        ? config.defaultButtonColor
                        : "red.500"
                    }
                    onClick={() => {
                      if (filters.length !== 0) {
                        setFilters([]);
                      }
                    }}
                    borderTopLeftRadius="12px"
                    borderBottomLeftRadius={chunk.length === 1 ? "12px" : 0}
                    pointerEvents={filters.length === 0 ? "none" : "all"}
                  >
                    {filters.length === 0 ? "Filter" : "Clear"}
                  </Button>
                )}
                {chunk.map((filter: any, ii: any) => (
                  <Button
                    flexGrow={1}
                    flexShrink={0}
                    key={filter}
                    onClick={() => {
                      if (filters.includes(filter)) {
                        setFilters(filters.filter((f: any) => f !== filter));
                      } else {
                        setFilters([...filters, filter]);
                      }
                    }}
                    borderColor={
                      defaults?.[label]?.borderColor || "transparent"
                    }
                    borderWidth="1px"
                    borderTopLeftRadius={0}
                    borderTopRightRadius={
                      i === 0 && ii === chunk.length - 1 ? "12px" : 0
                    }
                    borderBottomLeftRadius={
                      i === chunkedCategories.length - 1 && ii === 0
                        ? "12px"
                        : 0
                    }
                    borderBottomRightRadius={
                      i === chunkedCategories.length - 1 &&
                      ii === chunk.length - 1
                        ? "12px"
                        : 0
                    }
                    color={config.defaultButtonTextColor}
                    background={config.defaultButtonColor}
                    opacity={filters.includes(filter) ? 1 : 0.5}
                    _hover={{
                      opacity: 0.8,
                    }}
                    px="0.5rem"
                    py="0.25rem"
                  >
                    {filter}
                  </Button>
                ))}
              </ButtonGroup>
            );
          })}
        </Box>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          mt={"0.5rem"}
          flexDirection="column"
        >
          {next28daysByWeek.map((week, weekindex) => {
            return (
              <Box
                key={weekindex}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                flexDirection="row"
              >
                {week.map((day, dayindex) => {
                  const thisMonth = new Intl.DateTimeFormat("en-US", {
                    month: "short",
                  }).format(day);
                  const thisWeekday = new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                  }).format(day);
                  // TODO: Determine what category events fall on this day
                  const relevantEvents = events.filter((event: any) => {
                    // see if event is between start and end date
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);

                    return eventStart <= day && eventEnd >= day;
                  });
                  const filteredEvents = relevantEvents.filter((event: any) => {
                    if (filters.length === 0) return true;
                    return filters.includes(event.category);
                  });
                  return (
                    <Popover placement="top-start">
                      <PopoverTrigger>
                        <Box
                          key={dayindex}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="14.2857%"
                          height="2.5rem"
                          flexDirection="row"
                          borderColor={
                            isOpen ? config.defaultButtonColor : "transparent"
                          }
                          borderTopWidth={"1px"}
                          borderBottomWidth="1px"
                          borderLeftWidth={day.getDate() === 1 ? "2px" : "1px"}
                          borderRightWidth={dayindex === 6 ? "1px" : 0}
                          transition="border-color .3s linear"
                          position="relative"
                          cursor="pointer"
                        >
                          <Box
                            position="absolute"
                            top="0"
                            left="0"
                            w="100%"
                            h="100%"
                            opacity={0.5}
                            zIndex={-1}
                            backdropFilter={"blur(4px)"}
                            backgroundColor={
                              filteredEvents.length === 0
                                ? "green.100"
                                : filters.length !== 0
                                ? filteredEvents.length < filters.length
                                  ? "yellow.100"
                                  : "red.100"
                                : filteredEvents.length < categoryFilters.length
                                ? "yellow.100"
                                : "gray.100"
                            }
                          />
                          {((weekindex === 1 && dayindex === 0) ||
                            day.getDate() === 1) && (
                            <Text
                              zIndex={2}
                              fontSize="10px"
                              position="absolute"
                              top="0"
                              left="0"
                              background={config.defaultButtonColor}
                              color={config.defaultButtonTextColor}
                              p="2px"
                              borderBottomRightRadius="4px"
                            >
                              {thisMonth}
                            </Text>
                          )}
                          <Box
                            zIndex={1}
                            as={
                              filteredEvents.length === 0
                                ? MdEventAvailable
                                : filters.length !== 0
                                ? filteredEvents.length < filters.length
                                  ? MdEventNote
                                  : MdEventBusy
                                : filteredEvents.length < categoryFilters.length
                                ? MdEventNote
                                : MdEventBusy
                            }
                            w="30px"
                            h="30px"
                            opacity={0.75}
                            color={
                              filteredEvents.length === 0
                                ? "green.200"
                                : filters.length !== 0
                                ? filteredEvents.length < filters.length
                                  ? "yellow.200"
                                  : "red.200"
                                : filteredEvents.length < categoryFilters.length
                                ? "yellow.200"
                                : "gray.200"
                            }
                          />
                          <Text
                            zIndex={2}
                            fontSize="8px"
                            position="absolute"
                            top="2px"
                            right="4px"
                            color={config.textColor}
                          >
                            {thisWeekday}
                          </Text>
                          <Text
                            zIndex={2}
                            fontSize="xs"
                            position="absolute"
                            bottom="4px"
                            right="4px"
                            color={config.textColor}
                          >
                            {day.getDate()}
                          </Text>
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader fontWeight="semibold">
                          {day.toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          {!!filters.length && (
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Text fontSize="xs">
                                Filtering for {filters.join(", ")}
                              </Text>
                              <Button
                                size="xs"
                                fontSize="xs"
                                colorScheme={"red"}
                                variant="ghost"
                                px="2px"
                                mx="4px"
                                onClick={() => {
                                  setFilters([]);
                                }}
                              >
                                Clear Filters
                              </Button>
                            </Box>
                          )}
                          {categoryFilters.map(
                            (category: any, categoryindex: any) => {
                              if (
                                filters.length > 0 &&
                                !filters.includes(category)
                              )
                                return null;
                              const eventsForCategory = filteredEvents.filter(
                                (event: any) => event.category === category
                              );
                              const isAvailable =
                                eventsForCategory.length === 0;
                              return (
                                <Tag
                                  size="md"
                                  key={category}
                                  variant="subtle"
                                  colorScheme={isAvailable ? "green" : "gray"}
                                  m="0.25rem"
                                  py="0.25rem"
                                  px="0.5rem"
                                >
                                  <TagLeftIcon
                                    boxSize="12px"
                                    as={
                                      isAvailable
                                        ? fa.FaCheck
                                        : fa.FaTimesCircle
                                    }
                                  />
                                  <TagLabel>{category}</TagLabel>
                                </Tag>
                              );
                            }
                          )}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const PrettyButton: React.FC<any> = ({
  children,
  onClick = () => null,
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
  } = buttonConfig;

  console.log(icontype, icon);

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
          background={
            defaults[label]
              ? defaults[label].background
              : config.defaultButtonColor
          }
          color={
            defaults[label]
              ? defaults[label].color
              : config.defaultButtonTextColor
          }
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

  if (calendar) {
    return (
      <CalendarPanel Icon={Icon} {...buttonConfig}>
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
        background={
          defaults[label]
            ? defaults[label].background
            : config.defaultButtonColor
        }
        color={
          defaults[label]
            ? defaults[label].color
            : config.defaultButtonTextColor
        }
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

const IndexPage: React.FC<PageProps> = () => {
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
          w="400px"
          maxW="82vw"
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

          {config.buttons.map((button) => (
            <PrettyButton key={button.label} {...button}>
              {button.label}
            </PrettyButton>
          ))}
        </Box>
      </Box>
    </>
  );
};

const App = (props: PageProps) => {
  return (
    <ChakraProvider>
      <IndexPage {...props} />
    </ChakraProvider>
  );
};

export default App;

export const Head: HeadFC = () => <title>{config.title}</title>;
