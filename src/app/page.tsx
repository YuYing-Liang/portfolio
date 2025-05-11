"use client";
import { ActionIcon, Center, Group, Image, Paper, Space, Stack, Text, Title } from "@mantine/core";
import React, { FC, MouseEventHandler, useState } from "react";
import { DynamicTablerIcon, IconProps } from "./(components)/Icon";

const SkillDescriptions: Record<string, { description: string; icon: IconProps["name"]; hoverAnimation: string }> = {
  react: {
    icon: "IconBrandReact",
    hoverAnimation: "rotate-45",
    description: `
    I've been creating websites in React since 2020.
    It started with making apps for student programs when I was in uni until now,
    where I use React in my job everyday to make HMIs for automation-manufacturing applications.
  `,
  },
  typescript: {
    icon: "IconBrandTypescript",
    hoverAnimation: "scale-110",
    description: `
    I don't know how I was able to code before Typescript.
    I've been using it since 2022 for all my web-related projects.
    The dynamic typing is really like no other and it's saved me so much time preventing bugs in my code. 
  `,
  },
  python: {
    icon: "IconBrandPython",
    hoverAnimation: "rotate-[-90deg]",
    description: `
    I've used Python since 2018 for running mathematical experiments, computer vision projects and backend frameworks.
    Today, I use it to create robotic applications for cobots in the manufacturing industry.
  `,
  },
  databases: {
    icon: "IconDatabaseStar",
    hoverAnimation: "-translate-y-2",
    description: `
    From my time creating web apps, I've gained experience with relational (postgres) and non-relational (mongoDB, firestore) databases.
    I've grown to prefer relational databases because I have yet to see a situation where the data is entirely not related.
  `,
  },
  robots: {
    icon: "IconRobotFace",
    hoverAnimation: "-skew-x-12",
    description: `
    Currently I work with Fanuc and UR cobots to create automation applications such as palletizing and sanding.
    I'm involved in the architecture, path-planning and robot configuration process, and
    I'm constantly learning more about industry standards for cobots.
  `,
  },
};

export default function SplashPage() {
  const [displaySkill, setDisplaySkill] = useState<keyof typeof SkillDescriptions | undefined>(undefined);
  const isSkillSelected = displaySkill !== undefined;
  const setSkill = (skill: typeof displaySkill) => () => setDisplaySkill(skill);

  return (
    <Stack className="h-screen w-screen justify-between bg-[var(--mantine-color-beige-0)]">
      <Center className="h-[90%] w-full">
        <Stack align="center" gap="xl">
          <Title order={1} ff="monospace" className="absolute left-[50%] top-[30%] text-[var(--mantine-color-beige-5)]">
            Hi, I'm YuYing 👋
          </Title>
          <Image src="headshot.jpg" radius={200} w={250} />
          <Stack gap="lg">
            <Title order={1} ff="monospace">
              I'm a
            </Title>
            <Title order={1} ff="monospace">
              🤖 Robotics
            </Title>
            <Title order={1} ff="monospace">
              💻 Software
            </Title>
            <Title order={1} ff="monospace">
              👩‍💻 Developer
            </Title>
          </Stack>
          <Group>
            {Object.entries(SkillDescriptions).map(([skillName, skillData]) => (
              <IconButton
                key={skillName}
                icon={skillData.icon}
                hoverAnimation={skillData.hoverAnimation}
                onClick={setSkill(skillName)}
                isActive={displaySkill === skillName}
              />
            ))}
          </Group>
          <Paper
            shadow="xs"
            p={isSkillSelected ? "xl" : "sm"}
            w={isSkillSelected ? "50vh" : "100%"}
            bg="var(--mantine-color-pink-2)"
            className="text-center"
          >
            {isSkillSelected ? SkillDescriptions[displaySkill]?.description : "^ These are my most used skills ^"}
          </Paper>
        </Stack>
      </Center>
      <Group p="md" justify="space-between">
        <Group gap="xs">
          <Text size="md" fw={600} className="text-[var(--mantine-color-tan-9)]">
            Made with
          </Text>
          <IconLink icon="IconBrandNextjs" link="https://nextjs.org/" />
          <IconLink icon="IconBrandTailwind" link="https://tailwindcss.com/" />
          <IconLink icon="IconBrandTabler" link="https://tabler.io/" />
        </Group>
        <Group gap="xs">
          <IconLink icon="IconBrandGithub" link="https://github.com/YuYing-Liang/porfolio" />
          <IconLink icon="IconBrandLinkedin" link="https://www.linkedin.com/in/yuying-liang/" />
          <Image src="logo-block.png" h={32} />
        </Group>
      </Group>
    </Stack>
  );
}

const IconButton: FC<{
  hoverAnimation: string;
  icon: IconProps["name"];
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = (props) => (
  <ActionIcon
    component="button"
    className="h-[50px] w-[50px]"
    bg={props.isActive ? "var(--mantine-color-pink-5)" : "transparent"}
    onClick={props.onClick}
  >
    <DynamicTablerIcon
      name={props.icon}
      size={40}
      color="black"
      className={`transform transition-transform duration-300 hover:${props.hoverAnimation}`}
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
