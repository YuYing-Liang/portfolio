"use client";
import { Center, SimpleGrid, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { Layer, Stage } from "react-konva";
import { Shelf } from "./(components)/shelf";
import { serif } from "../fonts";

export default function BookshelfHomepage() {
  const { height, width } = useViewportSize();
  const isPortrait = height > width;
  const canvasSize = {
    width: isPortrait ? width : width / 2,
    height: isPortrait ? height * 0.6 : height,
  };
  const shelfSize = {
    width: canvasSize.width * (isPortrait ? 0.7 : 0.75),
    height: canvasSize.height * (isPortrait ? 0.9 : 0.75),
  };

  return (
    <SimpleGrid cols={isPortrait ? 1 : 2} verticalSpacing={0} spacing={0} className="h-screen w-screen">
      <Center h={isPortrait ? height - canvasSize.height : height}>
        <Title size={75} className={`w-[50%] ${serif.className}`}>
          Your Virtual Bookshelf
        </Title>
      </Center>
      <Stage width={canvasSize.width} height={canvasSize.height}>
        <Layer>
          <Shelf
            width={shelfSize.width}
            height={shelfSize.height}
            parentWidth={canvasSize.width}
            parentHeight={canvasSize.height}
            shelfThickness={20}
            shelfGap={120}
          />
        </Layer>
        <Layer></Layer>
      </Stage>
    </SimpleGrid>
  );
}
