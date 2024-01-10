import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface buttonProps {
  id: number;
  icon: string;
  value: string;
}

const buttons: buttonProps[] = [
  {
    id: 1,
    icon: "👍",
    value: "Good",
  },
  {
    id: 2,
    icon: "🤔",
    value: "Not Sure",
  },

  {
    id: 3,
    icon: "👎",
    value: "Bad",
  },
];

const EmojiStyled = styled(Box)(() => ({
  fontSize: "3em",
  transition: "opacity 0.3s,transform 0.3s",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

const EmojiPollButtons = () => {
  //states
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);

  //functions
  const handleIconHover = (icon: string) => {
    setHoveredEmoji(icon);
  };

  const handleMouseOut = () => {
    setHoveredEmoji(null);
  };
  return (
    <Stack direction={"row"} spacing={10}>
      {buttons.map((button) => {
        return (
          <EmojiStyled
            key={button.id}
            onMouseOver={() => handleIconHover(button.icon)}
            onMouseOut={handleMouseOut}
            sx={{
              opacity:
                hoveredEmoji === null
                  ? 1
                  : hoveredEmoji === button.icon
                  ? 1
                  : 0.5,

              transform:
                hoveredEmoji === button.icon ? "translateY(-10px)" : "",
            }}
          >
            {button.icon}

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "15px",
                opacity: hoveredEmoji === button.icon ? 1 : 0,
              }}
            >
              {button.value}
            </Typography>
          </EmojiStyled>
        );
      })}
    </Stack>
  );
};

export default EmojiPollButtons;
