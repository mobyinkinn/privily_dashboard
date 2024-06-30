import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/Authcontext";
import axios from "axios";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Widget = styled.div`
  background: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Dashboard = () => {
  const [data, setData] = useState({});
  const { auth } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/${auth?.user?._id || ""}`
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data, "this is data");

  return (
    <DashboardContainer>
      <Widget>Widget 1</Widget>
      <Widget>Widget 2</Widget>
      <Widget>Widget 3</Widget>
    </DashboardContainer>
  );
};

export default Dashboard;
