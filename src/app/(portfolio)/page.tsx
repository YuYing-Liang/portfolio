import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Grid,
  GridCol,
  Group,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowDown,
  IconArrowRight,
  IconBrandGithub,
  IconCameraCode,
  IconDevicesCode,
  IconIrregularPolyhedron,
  IconMap2,
  IconMathMaxMin,
} from "@tabler/icons-react";
import { ReactNode } from "react";

export const metadata = {
  title: "Projects - YuYing Liang",
  description: "Robotics and software engineering projects by YuYing Liang",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Projects() {
  return (
    <Container px={0} fluid>
      <Stack justify="space-evenly" gap="lg" className="h-screen">
        <Stack justify="center" className="h-[70%]">
          <Title order={1}>Hi, I'm YuYing</Title>
          <Text size="lg" className="bg-gradient-to-r from-primary to-dark to-35% bg-clip-text text-transparent">
            I like writing code and building things.
          </Text>
          <Group gap="md">
            <SkillButton icon={<IconMathMaxMin size={20} />} title="Control Systems" color="purple" />
            <SkillButton icon={<IconCameraCode size={20} />} title="Computer Vision" color="indigo" />
            <SkillButton icon={<IconMap2 size={20} />} title="Localization and Mapping" color="blue" />
            <SkillButton icon={<IconIrregularPolyhedron size={20} />} title="3D Development" color="cyan" />
            <SkillButton icon={<IconDevicesCode size={20} />} title="Software Engineering" color="teal" />
          </Group>
        </Stack>
        <Stack justify="start" align="center">
          <Text size="md" className="w-[25%] text-center">
            Here are some of my projects in robotics and software engineering
          </Text>
          <ActionIcon variant="filled" color="black" radius="lg" size="md" className="hover:relative hover:top-[10px]">
            <IconArrowDown size={20} />
          </ActionIcon>
        </Stack>
      </Stack>
      <Space h="10vh" />
      <Stack gap="xl">
        <Title order={1}>Projects</Title>
        <Grid>
          <ProjectThumbnail
            title="Dubins Model"
            description="Using linear algebra to calculate the shortest straight-line path with various differential drives"
            githubUrl="https://github.com"
            readMoreUrl="portfolio/blog/dubins-model"
            tags={["Typescript", "Linear Algebra"]}
          />
          <ProjectThumbnail
            title="SLAM"
            description="Simultaneous Localization and Mapping using the Extended Kalman Filter"
            githubUrl="https://github.com"
            readMoreUrl="https://google.com"
          />
        </Grid>
      </Stack>
    </Container>
  );
}

const SkillButton = ({ icon, title, color }: { icon: ReactNode; title: string; color: string }) => (
  <Tooltip label={title} position="bottom" offset={10}>
    <ActionIcon variant="light" color={color} radius="lg" size="lg">
      {icon}
    </ActionIcon>
  </Tooltip>
);

const ProjectThumbnail = ({
  title,
  description,
  githubUrl,
  readMoreUrl,
  tags,
}: {
  title: string;
  description: string;
  githubUrl: string;
  readMoreUrl: string;
  tags?: string[];
}) => (
  <GridCol span={4} m="md" px="md" className="rounded-md border-2 border-solid border-dark">
    <Stack w="100%" h="100%" justify="space-between">
      <Stack gap="xs">
        <Title order={3}>{title}</Title>
        <Text size="sm">{description}</Text>
        {(tags?.length ?? 0) > 0 && (
          <Group gap="xs">
            {tags?.map((tag) => (
              <Badge key={tag} size="sm" color="cyan" variant="light" style={{ textTransform: "lowercase" }}>
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
      <Group gap="xs" justify="end" mt="sm">
        <Button
          component="a"
          href={githubUrl}
          size="xs"
          variant="light"
          color="dark"
          leftSection={<IconBrandGithub size={20} />}
        >
          Peep the code
        </Button>
        <Button
          component="a"
          href={readMoreUrl}
          size="xs"
          variant="light"
          color="purple"
          rightSection={<IconArrowRight size={20} />}
        >
          Read more
        </Button>
      </Group>
    </Stack>
  </GridCol>
);
