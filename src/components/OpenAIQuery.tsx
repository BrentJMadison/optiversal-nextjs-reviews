import { useEffect, useState } from "react";

import { Typography, Box, Button, CircularProgress } from "@mui/material";

import useOpenAIQuery from "@/hooks/useOpenAIQuery";
import { OpenAIAction, OpenAIActions } from "@/types/OpenAIActions";

const OpenAIQuery = (props: { text: string }) => {
  const { text } = props;
  const { loading, response, clearResponse, queryOpenAI } = useOpenAIQuery();
  const [actionType, setActionType] = useState<OpenAIAction>();

  useEffect(() => {
    clearResponse();
    setActionType(undefined);
  }, [text]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 3,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography
          variant="h6"
          sx={{ color: "text.primary", textAlign: "center", mb: 2 }}
        >
          {response}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {Object.values(OpenAIActions).map((action) => (
          <Button
            key={action}
            variant="contained"
            onClick={() => {
              setActionType(action);
              queryOpenAI(text, action);
            }}
            color="info"
            disabled={loading || actionType === action}
          >
            {action}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default OpenAIQuery;
