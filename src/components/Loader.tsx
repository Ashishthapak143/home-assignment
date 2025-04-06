import React from "react";
import { Circles } from "react-loader-spinner";
import { styled } from "@mui/material/styles";

type LoaderProps = {
  loading: boolean;
};

const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Overlay>
      <Circles
        height="80"
        width="80"
        color="#dddce8"
        ariaLabel="circles-loading"
        visible={true}
      />
    </Overlay>
  );
};

export default Loader;
