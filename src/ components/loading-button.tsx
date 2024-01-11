import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface loadingButtonProps {
  onClick: () => void;
  loading: boolean;
  children: string;
}

const LoadingButton: React.FC<loadingButtonProps> = ({
  onClick,
  loading,
  children,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={loading}
      sx={{ position: "relative", bgcolor: "primary.main" }}
    >
      {children}
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Button>
  );
};

export default LoadingButton;
