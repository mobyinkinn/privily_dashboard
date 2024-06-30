import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";

const AssignRole = () => {
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();

  useEffect(() => {
    const effect = async () => {
      let res = await verifyUser(8);
      setUserVerified(res);
      if (res) {
      }
    };
    effect();
  }, []);

  if (!userVerified) {
    return <NoAccess />;
  } else {
    return <div>AssignRole</div>;
  }
};

export default AssignRole;
