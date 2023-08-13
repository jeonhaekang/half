import { useRouter } from "next/router";
import { useMemo } from "react";
import { useMount } from "~/hooks";
import { useAuthStore, useThemeStore } from "~/states/client";
import { supabase } from "~/states/server";
import { darkTheme, lightTheme } from "~/styles/theme";

export const useApp = () => {
  const router = useRouter();
  const updateSession = useAuthStore((state) => state.updateSession);
  const { theme } = useThemeStore();

  const currentTheme = useMemo(() => (theme ? darkTheme : lightTheme), [theme]);

  useMount(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session) {
      updateSession({ user: session.user });
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, currentSession) => {
      const isNotValidSession = session?.access_token !== currentSession?.access_token;

      if (isNotValidSession) router.reload();
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  return { currentTheme };
};
