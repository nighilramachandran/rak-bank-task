import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface carouslProps {
  slides: slidesProps[];
  currentSlide: number;
  type: "question" | "emot";
}
interface slidesProps {
  description: string;
  polling?: JSX.Element;
}
const VerticalCarousel: React.FC<carouslProps> = ({
  slides,
  currentSlide,
  type,
}) => {
  return (
    <Box>
      <AnimatePresence mode="wait" initial={false}>
        {slides.map((slide, index) => {
          return (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -300 }}
                transition={{ duration: 0.2 }}
              >
                {type === "question" ? (
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "30px",
                      maxWidth: "300px",
                    }}
                  >
                    {slide.description}
                  </Typography>
                ) : (
                  <>{slide.polling}</>
                )}
              </motion.div>
            )
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

export default VerticalCarousel;
