/* eslint-disable react/display-name */
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/auth/login");
      }
    }, [user]);

    if (!user) {
      return null; // You can add a loading spinner here
    }

    return <Component {...props} />;
  };
};

export default withAuth;
