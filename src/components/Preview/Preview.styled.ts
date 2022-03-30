import { styled } from "stitches";

const PreviewStyled = styled("div", {
  position: "absolute",
  zIndex: "1",
  left: "-$2",
  top: "-$2",
  width: "calc(100% + (0.618rem * 2))",
  opacity: "0",

  variants: {
    isFocused: {
      true: {
        opacity: "1",
      },
    },
  },
});

const Overlay = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  zIndex: "1",
});

const Controls = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  padding: "$2 $2 0",
  background: "linear-gradient(0deg, rgba(0,0,0,0.618) 0%, rgba(0,0,0,0) 100%)",
});

const Label = styled("div", {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.618)",
  color: "$secondaryAlt",
  fontSize: "$1",
  padding: "$1",
});

export { Controls, Label, Overlay, PreviewStyled };