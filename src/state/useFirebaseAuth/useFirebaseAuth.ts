import { useCallback, useEffect, useState } from 'react';
import 'firebase/auth';
import 'firebase/functions';
import { SnuggUser } from '..';

export default function useFirebaseAuth() {
  const [user, setUser] = useState<SnuggUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const getToken = useCallback(async (token: string) => {
    /**
     * Snugg only needs the roomName to perform a getToken invocation.
     */
    const getTokenPromise: Promise<string> = new Promise(accept => {
      console.log('token', token);
      accept(token);
    });
    return getTokenPromise;
  }, []);

  useEffect(() => {
    console.log('ignoring firebase');
    const snuggUser = {
      displayName: '',
    };
    setUser(snuggUser);
    setIsAuthReady(true);
  }, []);

  /**
   * Snugg currently doesn't allow the influencers/users to sign in or out.
   */
  return { user, isAuthReady, getToken };
}
