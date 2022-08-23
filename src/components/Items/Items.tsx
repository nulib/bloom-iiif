import React, { useEffect, useRef, useState } from "react";
import { CollectionItems, Collection, Manifest } from "@iiif/presentation-3";
import Item from "./Item";
import { ItemsStyled } from "./Items.styled";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCollectionState } from "context/collection-context";
import ItemsControl from "./Control";

interface ItemsProps {
  items: CollectionItems[];
}

const Items: React.FC<ItemsProps> = ({ items }) => {
  const { itemHeight } = useCollectionState();
  const [itemCount, setItemCount] = useState(3);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemsRef.current?.clientWidth)
      setItemCount(Math.ceil(itemsRef.current?.clientWidth / 290));
  }, [itemsRef.current?.clientWidth]);

  return (
    <ItemsStyled ref={itemsRef}>
      <Swiper
        a11y={{
          prevSlideMessage: "previous item",
          nextSlideMessage: "next item",
        }}
        spaceBetween={31}
        modules={[Navigation, A11y]}
        navigation={{ nextEl: ".bloom-next", prevEl: ".bloom-previous" }}
        slidesPerGroup={itemCount}
        slidesPerView={itemCount}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <Item index={index} item={item as Collection | Manifest} />
          </SwiperSlide>
        ))}
      </Swiper>
    </ItemsStyled>
  );
};

export default Items;
