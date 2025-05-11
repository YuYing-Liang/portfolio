import {
  Container,
  Group,
  List,
  ListItem,
  Space,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from "@mantine/core";
import { NextPage } from "next";
import Image from "next/image";

const DubinsModel: NextPage = () => {
  return (
    <Container p={0} m={0} w="100%">
      <Group gap="md">
        <h1 className="overflow-wrap w-[65%] text-[100px] leading-[100%]">
          Dubins Model: an interactive explanation and simulation
        </h1>
        <img
          src="https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-981-19-2635-8_80/MediaObjects/520264_1_En_80_Fig1_HTML.png"
          width="30%"
          alt="Dubins Model"
        />
      </Group>
      <Space h={100} />
      <Container h="100vh" mah={750} p={0} m={0}>
        <Stack h="100%" justify="center">
          <Title size={50} mb={25}>
            Dubins model is ...
          </Title>
          <Text size="40px" className="leading-normal">
            an optimal path planning algorithm that determines the shortest curve a mobile robot (constrained by a
            turning radius) can take between two poses on a 2D plane.
          </Text>
        </Stack>
      </Container>
      <Stack gap="md">
        <Text>But what does that really mean?</Text>
        <Text>
          The key word here is <b>poses</b> which means a position <i>and</i> orientation
        </Text>
        <Text>Say you have a car (or bike or scooter), how would you get from point A to point B?</Text>
        {/* TODO: insert simulation here */}
        <Text>Insert simulation here</Text>
        <Text>Your vehicle can complete 4 motions:</Text>
        <List listStyleType="disc" withPadding id="movementList">
          <ListItem>Move forward</ListItem>
          <ListItem>Turn Left</ListItem>
          <ListItem>Turn Right</ListItem>
          <ListItem>Stop</ListItem>
        </List>
        <Text>You can technically go backwards too, but driving in reverse isn't very safe is it?</Text>
        <Text>
          Note that your vehicle <b>cannot</b> pivot on the spot (or else we could just choose the straight-line path to
          each pose and turn on the spot, but what fun is that? 😛). So we have to make wide turns based on the
          vehicle's minimum turning radius.
        </Text>
        <Text>So how do we find the shortest path between two poses?</Text>
        <Text>This is where Dubin's model comes in:</Text>
        <Text>It's an algorithm that can calculate the shortest path given the above constraints ^</Text>
        <Text>
          Now let's think, if these <a href="#movementList">(*)</a> are the only movements we can do, what are all the
          possible paths we can take?
        </Text>
        {/* TODO: insert table with graphics for each type of movement */}
        <Text>Insert table here</Text>
        <Text>Dubin categorizes every shortest path solution into 6 variations, each with 3 segments:</Text>
        {/* TODO: add visualizations */}
        <Table>
          <TableThead>
            <TableTr>
              <TableTh>Path</TableTh>
              <TableTh>Path Type</TableTh>
              <TableTh>Visualization</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            <TableTr>
              <TableTd>LSL</TableTd>
              <TableTd>Left-Straight-Left</TableTd>
              <TableTd>Visualization</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>RSR</TableTd>
              <TableTd>Right-Straight-Right</TableTd>
              <TableTd>Visualization</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>LSR</TableTd>
              <TableTd>Left-Straight-Right</TableTd>
              <TableTd>Visualization</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>RSL</TableTd>
              <TableTd>Right-Straight-Left</TableTd>
              <TableTd>Visualization</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>RLR</TableTd>
              <TableTd>Right-Left-Right</TableTd>
              <TableTd>Visualization</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>LRL</TableTd>
              <TableTd>Left-Right-Left</TableTd>
              <TableTd>Visualization</TableTd>
            </TableTr>
          </TableTbody>
        </Table>
        <Text>How much we turn and how far we drive straight is what we need to figure out.</Text>
        <Text>
          You can move your vehicle in more variations but try coming up with ones that are unique to the the ones
          above. Do the variations you came up with lead to a shorter path? Can they be reduced down to the variations
          we've laid out?
        </Text>
        <Text>So using this rule, we can solve the previous problem:</Text>
        {/* TODO: insert solution from TODO #1 */}
        <Text>Insert solution here</Text>
        <Text>But how did we get to this conclusion?</Text>
        <Text>We can solve Dubin's model using linear algebra concepts and geometry.</Text>
        <Text>
          How we do this is by defining the problem as a set of constraints. Then using a constraint solver to uncover
          the solutions.
        </Text>
        <Text>Using the table above, we can break down these constraints as follows:</Text>
        {/* TODO: create table with all constraints */}
        <Text>
          Using these 4 equations, we can solve for t_1, t_2, p_1 and p_2 and adjust them to their positions relative to
          our origin and destination poses.
        </Text>
        <Text>
          To solve for these unkowns I use a nonlinear optimization solver. I found <a href="">ceres.js</a> to be a
          pretty good library for this. But you can also use anything from Matlab or python which are pretty popular.
        </Text>
        <Text>
          After using our constraint solver, we get 4 solutions (which makes sense, 8 unknowns and 4 equations should
          get you at least 4 unique solutions). They are as follows:
        </Text>
        {/* TODO: insert the solutions here with graphics */}
        <Text>We can now compute the total distance of each solution and take the shortest one. </Text>
        {/* TODO: insert the solutions */}
        <Text>And we have a winner!</Text>
        <Text>Now you know how it works, you can play around with dubins model for all types of paths.</Text>
      </Stack>
    </Container>
  );
};

export default DubinsModel;
