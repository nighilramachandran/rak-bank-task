import { Grid, Typography } from "@mui/material";
import React from "react";
import EmojiPollButtons from "./ components/emoji-poll-buttons";

const Home: React.FC = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6} sx={{ bgcolor: "primary.main" }}>
        <Typography>test</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <EmojiPollButtons />
      </Grid>
    </Grid>
  );
};

export default Home;
