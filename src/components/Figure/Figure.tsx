import React, { useEffect, useRef, useState } from "react";
import {
  Description,
  FigureStyled,
  Placeholder,
  Title,
  Width,
} from "./Figure.styled";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useCollectionDispatch } from "context/collection-context";
import { Thumbnail } from "@samvera/nectar-iiif";
import { InternationalString } from "@iiif/presentation-3";

interface FigureProps {
  label: InternationalString;
  summary?: InternationalString;
  thumbnail: any;
  index: number;
  isFocused: boolean;
}

const Figure: React.FC<FigureProps> = ({
  isFocused,
  label,
  summary,
  thumbnail,
}) => {
  const widthRef = useRef<HTMLDivElement>(null);

  return (
    <FigureStyled isFocused={isFocused}>
      <AspectRatio.Root ratio={1 / 1}>
        <Width ref={widthRef} />
        <Placeholder>
          {thumbnail && thumbnail.length > 0 && (
            // TODO: Something here is causing the image not to initiall load
            // <Thumbnail altAsLabel={label} thumbnail={thumbnail} />

            <img src={thumbnail[0].id} alt="" />
          )}
        </Placeholder>
      </AspectRatio.Root>
      <figcaption>
        <Title label={label} />
        {summary && <Description summary={summary} />}
      </figcaption>
    </FigureStyled>
  );
};

export default Figure;
