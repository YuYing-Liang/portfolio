"use client";
import { ActionIcon, Center, Container, Flex, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import React, { type FC, type MouseEventHandler, useState } from "react";
import { DynamicTablerIcon, type IconProps } from "./(components)/Icon";
import { useViewportSize } from "@mantine/hooks";

const SkillDescriptions: Record<string, { description: string; icon: IconProps["name"] }> = {
  react: {
    icon: "IconBrandReact",
    description: `
    I've been creating websites in React since 2020.
    It started with making apps for student programs when I was in uni until now,
    where I use React in my job everyday to make HMIs for automation-manufacturing applications.
  `,
  },
  typescript: {
    icon: "IconBrandTypescript",
    description: `
    I don't know how I was able to code before Typescript.
    I've been using it since 2022 for all my web-related projects.
    The dynamic typing is really like no other and it's saved me so much time preventing bugs in my code. 
  `,
  },
  python: {
    icon: "IconBrandPython",
    description: `
    I've used Python since 2018 for running mathematical experiments, computer vision projects and backend frameworks.
    Today, I use it to create robotic applications for cobots in the manufacturing industry.
  `,
  },
  databases: {
    icon: "IconDatabaseStar",
    description: `
    From my time creating web apps, I've gained experience with relational (postgres) and non-relational (mongoDB, firestore) databases.
    Overtime, I've grown to prefer relational databases because I've noticed that data in most applications is usually related in some capacity.
  `,
  },
  robots: {
    icon: "IconRobotFace",
    description: `
    Currently I work with Fanuc and UR cobots to create automation applications such as palletizing and sanding.
    I'm involved in the architecture, path-planning and robot configuration process, and
    I'm constantly learning more about industry standards for cobots.
  `,
  },
};

export default function SplashPage() {
  const { height, width } = useViewportSize();
  const [displaySkill, setDisplaySkill] = useState<keyof typeof SkillDescriptions | undefined>(undefined);
  const isSkillSelected = displaySkill !== undefined;
  const setSkill = (skill: typeof displaySkill) => () => setDisplaySkill(skill);

  const isScreenShort = height < 1080;
  const isScreenExtraShort = height < 830;
  const isScreenWidthLg = width < 1300;
  const isScreenWidthMd = width < 1080;
  const isScreenWidthSm = width < 830;
  const isScreenWidthXs = width < 650;
  const isScreenWidthXXs = width < 480;
  const isScreenWidthXXXs = width < 350;
  const isScreenLandscape = height < width;
  const isScreenWideAndShort = isScreenShort && isScreenLandscape;
  const isScreenLandscapeAndNarrow = isScreenWidthMd && isScreenLandscape;
  const titleSize = isScreenWidthXXXs ? 4 : isScreenLandscapeAndNarrow ? 3 : isScreenWidthLg ? 2 : 1;

  return (
    <Stack
      className={`min-h-screen h-${!isScreenLandscape || (!isScreenLandscape && isScreenExtraShort && Math.abs(width - height) < 100) ? "full" : "screen"} min-w-screen w-full justify-between bg-[var(--mantine-color-beige-0)] pt-8`}
    >
      <Center className="h-[90%] w-full">
        <Flex
          align="center"
          className={`${isScreenWidthXXs ? "w-full" : ""}`}
          direction={isScreenWideAndShort && !isScreenWidthSm ? "row" : "column"}
          gap={{ base: "xl", md: isScreenWideAndShort ? "100px" : "xl" }}
        >
          <Container className={!isScreenWidthXXs ? "relative" : "flex flex-col items-center gap-4"}>
            <Image
              src="headshot.jpg"
              alt="profile-picture"
              radius={200}
              w={isScreenWidthXs ? 175 : isScreenLandscapeAndNarrow ? 200 : 250}
            />
            <Title
              order={titleSize}
              ff="monospace"
              w={isScreenWidthXXs || isScreenWideAndShort ? "100%" : isScreenWidthLg ? "115%" : "130%"}
              className={`${!isScreenWidthXXs ? "absolute bottom-[5%] left-[40%]" : ""} text-[var(--mantine-color-beige-5)]`}
            >
              {"Hi, I'm YuYing 👋"}
            </Title>
          </Container>
          <Stack gap="lg">
            <Title order={titleSize} ff="monospace">
              {"I'm a"}
            </Title>
            <Title order={titleSize} ff="monospace">
              {"🤖 Robotics"}
            </Title>
            <Title order={titleSize} ff="monospace">
              {"💻 Software"}
            </Title>
            <Title order={titleSize} ff="monospace">
              {"👩‍💻 Developer"}
            </Title>
          </Stack>
          <Stack align="center">
            <Group justify={isScreenWidthXXXs ? "center" : undefined}>
              {Object.entries(SkillDescriptions).map(([skillName, skillData]) => (
                <IconButton
                  key={skillName}
                  icon={skillData.icon}
                  size={Math.max(width, height) < 1080 ? 32 : 40}
                  onClick={setSkill(skillName)}
                  isActive={displaySkill === skillName}
                />
              ))}
            </Group>
            <Paper
              shadow="sm"
              p={isScreenWidthSm ? "xs" : isSkillSelected && !isScreenWideAndShort ? "xl" : "md"}
              w={
                isScreenWidthXs
                  ? "80vw"
                  : isScreenWidthSm
                    ? "60vw"
                    : isScreenWidthMd
                      ? "35vw"
                      : isSkillSelected
                        ? "25vw"
                        : "100%"
              }
              bg="var(--mantine-color-pink-2)"
              fz="md"
              className="text-center"
            >
              {isSkillSelected ? SkillDescriptions[displaySkill]?.description : "^ These are my most used skills ^"}
            </Paper>
          </Stack>
        </Flex>
      </Center>
      <Group p="md" justify="space-between">
        <Group gap="xs" className={isScreenWidthXXs ? "w-full justify-center" : ""}>
          <Text size="md" fw={600} className="text-[var(--mantine-color-tan-9)]">
            Made with
          </Text>
          <IconLink icon="IconBrandNextjs" link="https://nextjs.org/" />
          <IconLink icon="IconBrandTailwind" link="https://tailwindcss.com/" />
          <IconLink icon="IconBrandTabler" link="https://tabler.io/" />
        </Group>
        <Group gap="xs" className={isScreenWidthXXs ? "w-full justify-center" : ""}>
          <IconLink icon="IconBrandGithub" link="https://github.com/YuYing-Liang/porfolio" />
          <IconLink icon="IconBrandLinkedin" link="https://www.linkedin.com/in/yuying-liang/" />
          <Image src="logo-block.png" alt="logo" h={32} />
        </Group>
      </Group>
    </Stack>
  );
}

const IconButton: FC<{
  icon: IconProps["name"];
  isActive: boolean;
  size: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = (props) => (
  <ActionIcon
    component="button"
    w={props.size + 10}
    h={props.size + 10}
    bg={props.isActive ? "var(--mantine-color-pink-5)" : "transparent"}
    onClick={props.onClick}
  >
    <DynamicTablerIcon
      name={props.icon}
      size={props.size}
      color="black"
      className="transform transition-transform duration-300 hover:scale-110"
    />
  </ActionIcon>
);

const IconLink: FC<{ link: string; icon: IconProps["name"] }> = ({ link, icon }) => (
  <ActionIcon
    component="a"
    href={link}
    target="_blank"
    className="bg-transparent text-[var(--mantine-color-tan-9)] hover:bg-transparent hover:text-[var(--mantine-color-purple-7)]"
  >
    <DynamicTablerIcon name={icon} size={32} />
  </ActionIcon>
);
