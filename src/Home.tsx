import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmojiPollButtons, {
  buttonProps,
} from "./ components/emoji-poll-buttons";
import VerticalCarousel from "./ components/vertical-carousel";
import styled from "@emotion/styled";
import { AddPoll, SubmitPollAsync } from "./redux/reducers/poll";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import MotionViewport from "./animate/MotionViewport";
import { m } from "framer-motion";
import { varFade } from "./animate/variants";
import LoadingButton from "./ components/loading-button";

const Home: React.FC = () => {
  //states

  const [toggle, setToggle] = useState<boolean>(false);
  const [firstGridWidth, setFirstGridWidth] = useState<string>("50%");
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  //dispatchers
  const dispatch = useAppDispatch();

  //functions
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleEmotSelect = (value: buttonProps, currentIndex: number) => {
    handleSlideChange(currentIndex + 1);
    dispatch(
      AddPoll({
        index: currentIndex,
        description: slides[currentIndex].description,
        icon: value.icon,
        iconValue: value.value,
      })
    );
  };

  //slides
  const slides = [
    {
      description: "How was your week overall ?",
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
      description: "How did you like last weeks's bowling event ?",
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
      description: "How was your experience with us ?",
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
      description: "Will you recommend us to your friends ?",
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
  const isLastSlide = currentSlide === slides.length - 1;
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
        sx={{
          p: 5,
          display: "flex",
          alignItems: isLastSlide ? "start" : "center",
          justifyContent: isLastSlide ? "start" : "center",
        }}
      >
        {!isLastSlide ? (
          <VerticalCarousel
            type={"emot"}
            slides={slides}
            currentSlide={currentSlide}
          />
        ) : (
          toggle && <FinalForm />
        )}
      </Grid>
    </Grid>
  );
};

const FinalForm = () => {
  //selectors
  const { poll, status } = useAppSelector((state) => state.Poll);

  const dispatch = useAppDispatch();
  console.log("status", status);

  const handleSubmitPoll = () => {
    dispatch(SubmitPollAsync(poll));
  };

  return (
    <Stack gap={5} component={MotionViewport} width={"100%"}>
      <m.div variants={varFade().inRight}>
        <Typography
          sx={{ color: "text.dark", fontWeight: "800", fontSize: "30px" }}
        >
          An Overview of your Answers
        </Typography>
      </m.div>
      <Stack spacing={3}>
        {poll.map((pol, ind) => {
          return (
            <Stack spacing={2} key={ind}>
              <m.div variants={varFade().inRight}>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography sx={{ color: "text.dark", fontSize: "20px" }}>
                    {pol.description}
                  </Typography>
                  <Typography sx={{ fontSize: "30px" }}>{pol.icon}</Typography>
                </Stack>
              </m.div>
              <m.div key={ind} variants={varFade().inRight}>
                <Divider sx={{ bgcolor: "#dcd0d0", opacity: 0.5 }}></Divider>
              </m.div>
            </Stack>
          );
        })}
      </Stack>
      {poll.length > 0 && (
        <m.div variants={varFade().inRight}>
          <LoadingButton
            onClick={() => handleSubmitPoll()}
            loading={status === "loading" ? true : false}
            children="Submit"
          />
        </m.div>
      )}
    </Stack>
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
