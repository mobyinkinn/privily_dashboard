import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";

const VipBookingPods = () => {
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();

  useEffect(() => {
    const effect = async () => {
      let res = await verifyUser(4);
      setUserVerified(res);
    };
    effect();
  }, []);

  if (!userVerified) {
    return <NoAccess />;
  } else {
    return <div>VipBookingPods</div>;
  }
};

export default VipBookingPods;
