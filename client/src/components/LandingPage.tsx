import { Typography } from "@mui/material";


function LandingPage() {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '55vh'
    }}>
      <h1>Run your LLM locally🚀</h1>
      <Typography>ChatLLM is a chat application that runs locally on your machine.</Typography>
    </div>
  );
}

export default LandingPage;