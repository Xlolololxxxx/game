import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { verifyUserAPI } from "@src/api/auth";
import { VerifyUserFormValues } from "@src/lib/types/auth";
import Failed from "./failed";
import Success from "./success";

export default function AccountVerification() {
  const [searchParams] = useSearchParams();
  const idValue = searchParams.get('userId');
  const codeValue = searchParams.get('code');

  const { mutate: verifyUser, isSuccess, isError } = useMutation({
    mutationFn: async ({ code, userId }: VerifyUserFormValues) => {
      return await verifyUserAPI({
        userId,
        code,
      });
    }
  })

  useEffect(() => {
    if (idValue && codeValue) {
      setTimeout(() => {
        verifyUser({
          userId: idValue,
          code: codeValue,
        });
      }, 1000 * 3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idValue, codeValue]);

  const renderContent = () => {
    if (isError) {
      return <Failed />
    }

    if (isSuccess) {
      return <Success />
    }

    return (
      <h1>Verifying account...</h1>
    );
  }

  return (
    <Box
      flex={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
      }}
    >
      {renderContent()}
    </Box>
  )
}