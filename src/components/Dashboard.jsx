// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/Authcontext";
// import axios from "axios";

// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const Widget = styled.div`
//   background: #fff;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
// `;

// const Dashboard = () => {
//   const [data, setData] = useState({});
//   const { auth } = useAuth();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `https://hammerhead-app-lqsdj.ondigitalocean.app/api/dashboard/${auth?.user?._id || ""}`
//       );
//       const data = response.data;
//       setData(data);
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   console.log(data, "this is data");

//   return (
//     <DashboardContainer>
//       <Widget>Widget 1</Widget>
//       <Widget>Widget 2</Widget>
//       <Widget>Widget 3</Widget>
//     </DashboardContainer>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart.js for the charts

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Widget = styled.div`
  background: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const PodCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const PodImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Dashboard = () => {
  const [data, setData] = useState({});
  const { auth } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://hammerhead-app-lqsdj.ondigitalocean.app/api/dashboard/${
          auth?.user?._id || ""
        }`
      );
      const data = response.data.data;
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.userDetails) {
      // Initialize charts when data is loaded
      const ctx1 = document
        .getElementById("userVisitorInsights")
        .getContext("2d");
      new Chart(ctx1, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Minimum Customers",
              data: [10, 20, 15, 30, 25, 35, 20, 40, 30, 50, 45, 60],
              borderColor: "red",
              fill: false,
            },
            {
              label: "Average Customers",
              data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
              borderColor: "green",
              fill: false,
            },
            {
              label: "Maximum Customers",
              data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
              borderColor: "purple",
              fill: false,
            },
          ],
        },
      });

      const ctx2 = document.getElementById("bookingSummary").getContext("2d");
      new Chart(ctx2, {
        type: "bar",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Upcoming",
              data: [10, 15, 20, 25, 30, 35, 40],
              backgroundColor: "blue",
            },
            {
              label: "Complete",
              data: [5, 10, 15, 20, 25, 30, 35],
              backgroundColor: "green",
            },
          ],
        },
      });

      const ctx3 = document
        .getElementById("customerSatisfaction")
        .getContext("2d");
      new Chart(ctx3, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "No",
              data: [10, 20, 15, 30, 25, 35, 20, 40, 30, 50, 45, 60],
              borderColor: "blue",
              fill: false,
            },
            {
              label: "Yes",
              data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
              borderColor: "green",
              fill: false,
            },
          ],
        },
      });

      const ctx4 = document.getElementById("targetVsReality").getContext("2d");
      new Chart(ctx4, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Reality Sales",
              data: [8.823, 9.823, 10.823, 11.823, 12.823, 13.823, 14.823],
              backgroundColor: "yellow",
            },
            {
              label: "Target Sales",
              data: [12.122, 13.122, 14.122, 15.122, 16.122, 17.122, 18.122],
              backgroundColor: "green",
            },
          ],
        },
      });

      const ctx5 = document
        .getElementById("newAdminPerformance")
        .getContext("2d");
      new Chart(ctx5, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "High",
              data: [15, 25, 35, 45, 55, 65, 75],
              backgroundColor: "blue",
            },
            {
              label: "Low",
              data: [5, 15, 25, 35, 45, 55, 65],
              backgroundColor: "green",
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <DashboardContainer>
      <Widget>
        <h3>Pods to Explore</h3>
        {data.pods?.map((pod) => (
          <PodCard key={pod._id}>
            <PodImage src={pod.images[0].url} alt={pod.title} />
            <h4>{pod.title}</h4>
            <p>{pod.description}</p>
          </PodCard>
        ))}
      </Widget>

      <Widget>
        <canvas id="userVisitorInsights"></canvas>
      </Widget>

      <Widget>
        <canvas id="bookingSummary"></canvas>
      </Widget>

      <Widget>
        <canvas id="customerSatisfaction"></canvas>
      </Widget>

      <Widget>
        <canvas id="targetVsReality"></canvas>
      </Widget>

      <Widget>
        <h3>VIP Booking</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Time Used</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.userDetails
              ?.filter((user) => user.role === "admin")
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
                  <td>{Math.floor(Math.random() * 120) + 30} Min</td>
                  <td>Active</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Widget>

      <Widget>
        <h3>Pods Location</h3>
        <div>
          <img src="https://via.placeholder.com/300x200" alt="World Map" />
        </div>
      </Widget>

      <Widget>
        <canvas id="newAdminPerformance"></canvas>
      </Widget>
    </DashboardContainer>
  );
};

export default Dashboard;
