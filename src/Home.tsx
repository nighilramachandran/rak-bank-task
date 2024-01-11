import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmojiPollButtons, {
  buttonProps,
} from "./ components/emoji-poll-buttons";
import VerticalCarousel from "./ components/vertical-carousel";
import styled from "@emotion/styled";

const Home: React.FC = () => {
  //states

  const [toggle, setToggle] = useState<boolean>(false);
  const [firstGridWidth, setFirstGridWidth] = useState<string>("50%");
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  //functions
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleEmotSelect = (value: buttonProps, currentIndex: number) => {
    // console.log(value, currentIndex);
    handleSlideChange(currentIndex + 1);
  };

  const slides = [
    {
      description: "How was your week overall?",
      polling: (
        <EmojiPollButtons
          _index={currentSlide}
          handleEmotSelect={(value, currentIndex) =>
            handleEmotSelect(value, currentIndex)
          }
        />
      ),
    },
    {
      description: "How did you like last weeks's bowling event",
      polling: (
        <EmojiPollButtons
          _index={currentSlide}
          handleEmotSelect={(value, currentIndex) =>
            handleEmotSelect(value, currentIndex)
          }
        />
      ),
    },
    {
      description: "How was your week overall?",
      polling: (
        <EmojiPollButtons
          _index={currentSlide}
          handleEmotSelect={(value, currentIndex) =>
            handleEmotSelect(value, currentIndex)
          }
        />
      ),
    },
    { description: "" },
  ];

  //effects

  useEffect(() => {
    if (currentSlide === slides.length - 1) {
      setTimeout(() => {
        setToggle(true);
      }, 200);
    } else {
      setToggle(false);
    }
    setFirstGridWidth(toggle ? "10%" : "50%");
  }, [currentSlide, slides.length, toggle]);

  //styles
  const firstGridStyles = {
    bgcolor: "primary.main",
    display: "flex",
    alignItems: "center",
    width: firstGridWidth,
    transition: "width 0.5s ease",
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        sx={{
          ...firstGridStyles,
          p: 5,
        }}
      >
        <Stack direction={"row"} spacing={5} alignItems={"center"}>
          <Stack spacing={2}>
            {slides.map((_, index) => (
              <StyledRadio
                key={index}
                sx={{
                  bgcolor: index === currentSlide ? "transparent" : "white",
                }}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </Stack>

          <VerticalCarousel
            type={"question"}
            slides={slides}
            currentSlide={currentSlide}
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <VerticalCarousel
          type={"emot"}
          slides={slides}
          currentSlide={currentSlide}
        />
      </Grid>
    </Grid>
  );
};

const StyledRadio = styled(Box)(({ theme }: any) => ({
  width: "13px",
  height: "13px",
  borderRadius: "50%",
  border: "1.5px solid white",
  cursor: "pointer",
}));

export default Home;
