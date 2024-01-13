import { Box, Typography } from "@mui/material";
import { m, AnimatePresence } from "framer-motion";
import React from "react";

//interfaces
export interface carouslProps {
  slides: slidesProps[];
  currentSlide: number;
  type: "question" | "emot";
}
export interface slidesProps {
  description: string;
  polling?: React.JSX.Element;
}
const VerticalCarousel: React.FC<carouslProps> = ({
  slides,
  currentSlide,
  type,
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {slides.map((slide, index) => {
        return (
          index === currentSlide && (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -300 }}
              transition={{ duration: 0.2 }}
            >
              {type === "question" ? (
                <Typography
                  data-testid={`type-question-index-${index}`}
                  sx={{
                    fontWeight: 800,
                    fontSize: "30px",
                    maxWidth: "300px",
                  }}
                >
                  {slide.description}
                </Typography>
              ) : (
                <Box data-testid={`type-emot-index-${index}`}>
                  {slide.polling}
                </Box>
              )}
            </m.div>
          )
        );
      })}
    </AnimatePresence>
  );
};

export default VerticalCarousel;
