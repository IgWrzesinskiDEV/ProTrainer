import { useState, useEffect } from "react";
import { verifyAuth } from "@/lib/lucia/auth";
import { DatabaseUserAttributes } from "@/lib/lucia/lucia";
export default function useUserData(formState: unknown) {
  const [userData, setUserData] = useState<DatabaseUserAttributes | null>();

  useEffect(() => {
    const getData = async () => {
      const data = await verifyAuth();

      if (!data.user) {
        return;
      }

      setUserData(data.user);
    };

    getData().catch(console.error);
  }, [formState]);

  return { userData, setUserData };
}
