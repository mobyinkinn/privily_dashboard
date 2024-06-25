import React from "react";
import styled from "styled-components";

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
  return (
    <DashboardContainer>
      <Widget>Widget 1</Widget>
      <Widget>Widget 2</Widget>
      <Widget>Widget 3</Widget>
    </DashboardContainer>
  );
};

export default Dashboard;
