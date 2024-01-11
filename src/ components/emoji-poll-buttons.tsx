import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useAppSelector } from "../redux/hooks";

export interface buttonProps {
  icon: string;
  value: string;
}

export interface EmojiPollButtonsProps {
  handleEmotSelect: (value: buttonProps, currentIndex: number) => void;
  _index: number;
}

const buttons: buttonProps[] = [
  {
    icon: "👍",
    value: "Good",
  },
  {
    icon: "🤔",
    value: "Not Sure",
  },

  {
    icon: "👎",
    value: "Bad",
  },
];

const EmojiPollButtons: React.FC<EmojiPollButtonsProps> = ({
  handleEmotSelect,
  _index,
}) => {
  //states
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);
  //functions
  const handleIconHover = (icon: string) => {
    setHoveredEmoji(icon);
  };

  const handleMouseOut = () => {
    setHoveredEmoji(null);
  };

  const handleClick = (button: buttonProps, currentIndex: number) => {
    handleEmotSelect && handleEmotSelect(button, currentIndex);
  };

  const polls = useAppSelector((state) => state.Poll.poll);

  return (
    <Stack direction={"row"} spacing={10}>
      {buttons.map((button, index) => {
        const pollExists = polls.find((poll) => poll.index === _index);

        return (
          <EmojiStyled
            key={index}
            onMouseOver={() => handleIconHover(button.icon)}
            onMouseOut={handleMouseOut}
            onClick={() => handleClick(button, _index)}
            sx={{
              opacity:
                (hoveredEmoji || pollExists?.icon) === button.icon ? 1 : 0.5,
              transform:
                (hoveredEmoji || pollExists?.icon) === button.icon
                  ? "translateY(-10px)"
                  : "",
            }}
          >
            {button.icon}

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "15px",
                opacity:
                  (hoveredEmoji || pollExists?.icon) === button.icon ? 1 : 0,
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

const EmojiStyled = styled(Box)(() => ({
  fontSize: "3em",
  transition: "opacity 0.3s,transform 0.3s",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

export default EmojiPollButtons;
