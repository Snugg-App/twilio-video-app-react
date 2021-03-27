import { nanoid } from 'nanoid';
import { useAppState } from '../../../../state';
import { useState, useEffect } from 'react';

export default function useGetPreflightTokens() {
  const { getToken } = useAppState();
  const [tokens, setTokens] = useState<[string, string]>();
  const [tokenError, setTokenError] = useState<Error>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching && !tokens) {
      const roomName = 'preflight-network-test-' + nanoid();

      setIsFetching(true);

      Promise.all([getToken(roomName), getToken(roomName)])
        .then(tokens => {
          setTokens(tokens);
          setIsFetching(false);
        })
        .catch(error => setTokenError(error));
    }
  }, [getToken, isFetching, tokens]);

  return { tokens, tokenError };
}
