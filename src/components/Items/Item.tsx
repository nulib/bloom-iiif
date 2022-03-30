import React, { useEffect, useState, useRef } from "react";
import Figure from "components/Figure/Figure";
import { Collection, Manifest } from "@iiif/presentation-3";
import { useGetLabel } from "hooks/useGetLabel";
import { useGetResourceImage } from "hooks/useGetResourceImage";
import { useCollectionState } from "context/collection-context";
import { Anchor, ItemStyled } from "./Item.styled";
import Preview from "components/Preview/Preview";

interface ItemProps {
  item: Collection | Manifest;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const store = useCollectionState();
  const { vault } = store;

  const itemRef = useRef(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeCanvas, setActiveCanvas] = useState<number>(0);
  const [image, setImage] = useState<string | null>();
  const [manifest, setManifest] = useState<Manifest>();

  useEffect(() => {
    if (item.thumbnail)
      setImage(useGetResourceImage(vault.get(item.thumbnail[0].id), "200,"));
  }, []);

  useEffect(() => {
    isFocused
      ? setTimeout(() => {
          if (!manifest)
            vault
              .loadCollection(item.id)
              .then((data: any) => setManifest(data))
              .catch((error: any) => {
                console.error(`Manifest failed to load: ${error}`);
              });
        }, 1000)
      : null;
    return;
  }, [isFocused]);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  /**
   * todo: be more defensive about collections without `homepage`
   */
  let url = null;
  if (item.homepage) url = item.homepage[0].id;

  const handleActiveCanvas = (e) => {
    e.preventDefault();
    setActiveCanvas(activeCanvas + parseInt(e.target.dataset.increment));
    const canvas = vault.get(manifest.items[activeCanvas]);
    setImage(getCanvasImage(canvas));
  };

  const getCanvasImage = (canvas) => {
    if (canvas.thumbnail.length > 0)
      return useGetResourceImage(vault.get(canvas.thumbnail[0].id), "200,");

    const annotationPage = vault.get(canvas.items[0]);
    const annotation = vault.get(annotationPage.items[0]);
    const contentResource = vault.get(annotation.body[0]);

    if (contentResource.type === "Image")
      return useGetResourceImage(contentResource, "200,");
  };

  return (
    <ItemStyled>
      <Anchor
        href={url}
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        ref={itemRef}
      >
        <Figure
          caption={useGetLabel(item.label)}
          description={useGetLabel(item.summary)}
          image={image}
          isFocused={isFocused}
        />
        <Preview
          manifest={manifest}
          activeCanvas={activeCanvas}
          handleActiveCanvas={handleActiveCanvas}
          isFocused={isFocused}
        />
      </Anchor>
    </ItemStyled>
  );
};

export default Item;
