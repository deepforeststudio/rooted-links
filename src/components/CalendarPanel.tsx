import * as React from "react";
import { MdEventAvailable, MdEventBusy, MdEventNote } from "react-icons/md";
import useFetch from "use-http";
import {
  Box,
  Button,
  ButtonGroup,
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
import { defaults as defaultsOriginal } from "../data/defaults";
import { icons } from "./icons";

export const CalendarPanel: React.FC<any> = ({
  Icon,
  children,
  config,
  calendarButtonOpen,
  ...buttonProfile
}) => {
  const {
    icon,
    icontype,
    label,
    url,
    isAgeRestricted,
    calendar,
    calendarLabel,
    calendarId,
  } = buttonProfile;

  let { categoryFilters } = buttonProfile;

  if (typeof categoryFilters === "string") {
    categoryFilters = JSON.parse(categoryFilters);
  } else if (!categoryFilters) {
    categoryFilters = [];
  }

  const { isOpen, onToggle } = useDisclosure({ isOpen: !!calendarButtonOpen });

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
    `${process.env.GATSBY_CALENDAR_ROOT}/?${new URLSearchParams({
      calid: calendarId,
    })}`
  );

  React.useEffect(() => {
    initializeEvents();
  }, []);

  async function initializeEvents() {
    const initialEvents = await get();
    if (response.ok) {
      // TODO: only grab events after today
      setEvents(initialEvents?.events || []);
    }
  }

  const defaults = { ...defaultsOriginal, ...config.defaultOverrides };

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
        position="relative"
      >
        <Button
          flex={1}
          zIndex={1}
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
          borderRadius="50px !important"
          _hover={{
            opacity: 0.8,
          }}
          justifyContent="center"
          pr="2.25rem"
        >
          {children}
        </Button>
        <Button
          zIndex={2}
          position="absolute"
          right="0"
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
        pointerEvents="all"
        height={!isOpen ? 0 : categoryFilters.length ? "300px" : "210px"}
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
                          {weekindex === 0 && dayindex === 0 && (
                            <>
                              <Text
                                zIndex={2}
                                fontSize="10px"
                                position="absolute"
                                top="0"
                                left="0"
                                background={config.defaultButtonColor}
                                color={config.defaultButtonTextColor}
                                px="2px"
                                py="1px"
                                borderBottomRightRadius="4px"
                              >
                                {thisMonth}
                              </Text>
                              <Text
                                zIndex={2}
                                fontSize="10px"
                                position="absolute"
                                bottom="0"
                                left="0"
                                background={config.defaultButtonColor}
                                color={config.defaultButtonTextColor}
                                px="2px"
                                py="1px"
                                borderTopRightRadius="4px"
                              >
                                Today
                              </Text>
                            </>
                          )}
                          {day.getDate() === 1 && (
                            <>
                              <Text
                                zIndex={2}
                                fontSize="10px"
                                position="absolute"
                                top="0"
                                left="0"
                                background={config.defaultButtonColor}
                                color={config.defaultButtonTextColor}
                                px="2px"
                                py="1px"
                                borderBottomRightRadius="4px"
                              >
                                {thisMonth}
                              </Text>
                            </>
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
                                        ? icons.fa.FaCheck
                                        : icons.fa.FaTimesCircle
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
