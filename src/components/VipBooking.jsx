

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import moment from "moment";
// import debounce from "lodash.debounce";

// const VipBooking = () => {
//   const [purpose, setPurpose] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
//   const [showTimeSlots, setShowTimeSlots] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [checkoutUrl, setCheckoutUrl] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [rate, setRate] = useState(0);
//   const [timeSlotError, setTimeSlotError] = useState("");
//   const [isDoneDisabled, setIsDoneDisabled] = useState(false);
//   const [pods, setPods] = useState([]);
//   const [selectedPodSlug, setSelectedPodSlug] = useState("");

//   useEffect(() => {
//     fetchRate();
//     fetchPods();
//   }, []);

//   useEffect(() => {
//     if (date && selectedPodSlug) {
//       fetchAvailability();
//     }
//   }, [date, selectedPodSlug]);

//   const fetchPods = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/product/getall",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJjYjRmZWRjZmU3M2U2N2U4NGY0MSIsImlhdCI6MTcyNjEzOTk0OCwiZXhwIjoxNzM0Nzc5OTQ4fQ.Uy0EDbnQ1clGLvZBjtPFhjQjx0PqngDsYLj2hUkBEQ4",
//           },
//         }
//       );
//       const podsData = response.data.map((pod) => ({
//         title: pod.title,
//         _id: pod._id,
//       }));
//       setPods(podsData);
//     } catch (error) {
//       console.error("Error fetching pods:", error);
//     }
//   };

//   const fetchAvailability = async () => {
//     try {
//       const formattedDate = moment(date).format("YYYY-MM-DD");
//       const response = await axios.get(
//         `http://localhost:4000/api/product/availability/${selectedPodSlug}?booking_date=${formattedDate}`
//       );
//       const { product_availability } = response.data;
//       setBookedSlots(product_availability.slot_bookings);
//       generateTimeSlots();
//     } catch (error) {
//       console.error("Error fetching availability:", error);
//     }
//   };
// const renderTimeSlot = (slot, index) => {
//   const currentTime = moment();
//   const slotTime = moment(date).set({
//     hour: parseInt(slot.split(":")[0]),
//     minute: parseInt(slot.split(":")[1]),
//   });

//   const isPast = slotTime.isBefore(currentTime);
//   const nextSlotTime = slotTime.clone().add(15, "minutes");
//   const isInCurrentSlotRange = currentTime.isBefore(nextSlotTime);

//   const isBooked = bookedSlots.includes(slot); // Adjust this according to your booked slots structure

//   const shouldShowAsAvailable = !isPast || (isInCurrentSlotRange && !isBooked);

//   return (
//     <button
//       key={index}
//       style={{
//         ...styles.timeSlot,
//         ...(selectedTimeSlots.includes(slot) ? styles.selectedTimeSlot : {}),
//         ...(isBooked || !shouldShowAsAvailable ? styles.bookedTimeSlot : {}),
//       }}
//       onClick={() =>
//         !isBooked && shouldShowAsAvailable && handleTimeSlotPress(slot)
//       }
//       disabled={isBooked || !shouldShowAsAvailable}
//     >
//       {slot}
//     </button>
//   );
// };
//   const fetchRate = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/transactions/getrate"
//       );
//       setRate(response.data.rate);
//     } catch (error) {
//       console.error("Error fetching rate:", error);
//     }
//   };

//   const validateFields = () => {
//     const errors = {};
//     if (!purpose) errors.purpose = "Purpose is required";
//     if (!selectedPodSlug) errors.pod = "Pod selection is required";
//     if (selectedTimeSlots.length === 0) {
//       errors.timeSlots = "Time slot is required";
//     } else {
//       const startTime = selectedTimeSlots[0];
//       const endTime = selectedTimeSlots[selectedTimeSlots.length - 1];
//       const duration = calculateDuration(startTime, endTime);
//       if (duration > 180) {
//         errors.timeSlots = "Maximum booking time is 3 hours";
//       }
//     }
//     return errors;
//   };

//   const handleBookNow = useCallback(
//     debounce(async () => {
//       if (loading) return;

//       const validationErrors = validateFields();

//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//       } else {
//         setLoading(true);

//         const duration = calculateDuration(
//           selectedTimeSlots[0],
//           selectedTimeSlots[selectedTimeSlots.length - 1]
//         );
//         const amount = duration * rate;

//         try {
//           const response = await axios.post(
//             "http://localhost:4000/api/payments",
//             {
//               amount: amount,
//               currency: "ZAR",
//               cancelUrl: "https://example.com/cancel",
//               successUrl: "https://example.com/success",
//               failureUrl: "https://example.com/failure",
//             }
//           );

//           if (response.data && response.data.redirectUrl) {
//             setCheckoutUrl(response.data.redirectUrl);
//             setShowPaymentModal(true);
//           } else {
//             alert("Error: Failed to create checkout");
//           }
//         } catch (error) {
//           console.error("Error creating checkout:", error);
//           alert("Error: An error occurred while creating the checkout");
//         } finally {
//           setLoading(false);
//         }
//       }
//     }, 3000),
//     [date, purpose, selectedTimeSlots, selectedPodSlug, loading, rate]
//   );

//   const calculateDuration = (start, end) => {
//     const [startHours, startMinutes] = start.split(":").map(Number);
//     const [endHours, endMinutes] = end.split(":").map(Number);
//     return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
//   };

//   const generateTimeSlots = () => {
//     let startTime = 6 * 60; // 6:00 AM
//     const endTime = 24 * 60; // 12:00 AM
//     const interval = 15;
//     const slots = [];

//     while (startTime <= endTime) {
//       const hours = Math.floor(startTime / 60);
//       const minutes = startTime % 60;
//       slots.push(
//         `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}`
//       );
//       startTime += interval;
//     }

//     setTimeSlots(slots);
//   };

//   const handleTimeSlotPress = (slot) => {
//     let newSelectedSlots = [...selectedTimeSlots];

//     if (newSelectedSlots.includes(slot)) {
//       const index = newSelectedSlots.indexOf(slot);
//       newSelectedSlots.splice(index, 1);
//     } else {
//       newSelectedSlots.push(slot);
//     }

//     setSelectedTimeSlots(newSelectedSlots);
//     validateTimeSlots(newSelectedSlots);
//   };

//   const validateTimeSlots = (slots) => {
//     if (slots.length > 0) {
//       const startTime = slots[0];
//       const endTime = slots[slots.length - 1];
//       const duration = calculateDuration(startTime, endTime);

//       if (duration <= 0) {
//         setTimeSlotError("Please choose a valid time.");
//         setIsDoneDisabled(true);
//       } else if (duration > 180) {
//         setTimeSlotError("Maximum booking time is 3 hours.");
//         setIsDoneDisabled(true);
//       } else {
//         setTimeSlotError("");
//         setIsDoneDisabled(false);
//       }
//     } else {
//       setTimeSlotError("");
//       setIsDoneDisabled(true);
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     // handle payment success logic here
//   };

//   const duration =
//     selectedTimeSlots.length > 0
//       ? calculateDuration(
//           selectedTimeSlots[0],
//           selectedTimeSlots[selectedTimeSlots.length - 1]
//         )
//       : 0;
//   const amount = duration * rate;

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>VIP Booking</div>

//       <div style={styles.field}>
//         <label>Purpose:</label>
//         <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
//           <option value="">Select Purpose</option>
//           <option value="meeting">Meeting</option>
//           <option value="work">Work</option>
//           <option value="personal">Personal</option>
//         </select>
//         {errors.purpose && <div style={styles.errorText}>{errors.purpose}</div>}
//       </div>
//       <div style={styles.field}>
//         <label>Pod:</label>
//         <select
//           value={selectedPodSlug}
//           onChange={(e) => setSelectedPodSlug(e.target.value)}
//         >
//           <option value="">Select Pod</option>
//           {pods.map((pod) => (
//             <option key={pod._id} value={pod._id}>
//               {pod.title}
//             </option>
//           ))}
//         </select>
//         {errors.pod && <div style={styles.errorText}>{errors.pod}</div>}
//       </div>
//       <div style={styles.field}>
//         <label>Date:</label>
//         <input
//           type="date"
//           value={moment(date).format("YYYY-MM-DD")}
//           onChange={(e) => setDate(new Date(e.target.value))}
//         />
//       </div>

//       <div style={styles.field}>
//         <label>Time Slots:</label>
//         <button onClick={() => setShowTimeSlots(true)}>
//           {selectedTimeSlots.length > 0
//             ? `${selectedTimeSlots[0]} - ${
//                 selectedTimeSlots[selectedTimeSlots.length - 1]
//               }`
//             : "Select an Available Time Slot"}
//         </button>
//         {errors.timeSlots && (
//           <div style={styles.errorText}>{errors.timeSlots}</div>
//         )}
//       </div>

//       {showTimeSlots && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <div style={styles.modalHeader}>Select Time Slots</div>
//             {timeSlotError && (
//               <div style={styles.errorText}>{timeSlotError}</div>
//             )}
//             <div style={styles.timeSlotsContainer}>
//               {timeSlots.map((slot, index) => renderTimeSlot(slot, index))}
//             </div>
//             <button
//               onClick={() => setShowTimeSlots(false)}
//               style={styles.doneButton}
//               disabled={isDoneDisabled}
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}

//       {/* <div style={styles.field}>
//         <label>Amount:</label>
//         <div>{selectedTimeSlots.length > 0 ? `${amount} ZAR` : "---"}</div>
//       </div> */}

//       <button onClick={handleBookNow} disabled={loading}>
//         {loading ? "Processing..." : "Proceed to Pay"}
//       </button>

//       {showPaymentModal && (
//         <div style={styles.paymentModal}>
//           <iframe
//             src={checkoutUrl}
//             style={{ width: "100%", height: "100%" }}
//             onLoad={() => handlePaymentSuccess()}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     maxWidth: "600px",
//     margin: "0 auto",
//     backgroundColor: "#f5f5f5",
//     borderRadius: "8px",
//   },
//   header: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   },
//   field: {
//     marginBottom: "20px",
//   },
//   errorText: {
//     color: "red",
//   },
//   timeSlotsContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "10px",
//     overflow:"scroll",
//     height:"300px"
//   },
//   timeSlot: {
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     textAlign: "center",
//   },
//   selectedTimeSlot: {
//     backgroundColor: "#FF1200",
//     color: "#fff",
//   },
//   bookedTimeSlot: {
//     backgroundColor: "#ccc",
//     color: "#999",
//   },
//   modal: {
//     position: "fixed",
//     top: "0",
//     left: "0",
//     right: "0",
//     bottom: "0",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     width: "90%",
//     maxWidth: "600px",
//   },
//   modalHeader: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   doneButton: {
//     marginTop: "20px",
//     padding: "10px 20px",
//     backgroundColor: "#FF1200",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   paymentModal: {
//     position: "fixed",
//     top: "0",
//     left: "0",
//     right: "0",
//     bottom: "0",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

// export default VipBooking;



import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import debounce from "lodash.debounce";
import { Button, Stack, Typography } from "@mui/material";

const VipBooking = () => {
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [errors, setErrors] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pods, setPods] = useState([]);
  const [selectedPodSlug, setSelectedPodSlug] = useState("");
  const [userToken, setUserToken] = useState("your-token"); // Replace with actual token logic

  useEffect(() => {
    fetchPods();
  }, []);

  useEffect(() => {
    if (date && selectedPodSlug) {
      fetchAvailability();
    }
  }, [date, selectedPodSlug]);

  const fetchPods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/getall",
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJjYjRmZWRjZmU3M2U2N2U4NGY0MSIsImlhdCI6MTcyNjEzOTk0OCwiZXhwIjoxNzM0Nzc5OTQ4fQ.Uy0EDbnQ1clGLvZBjtPFhjQjx0PqngDsYLj2hUkBEQ4',
          },
        }
      );
      const podsData = response.data.map((pod) => ({
        title: pod.title,
        _id: pod._id,
      }));
      setPods(podsData);
    } catch (error) {
      console.error("Error fetching pods:", error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(
        `http://localhost:4000/api/product/availability/${selectedPodSlug}?booking_date=${formattedDate}`
      );
      const { product_availability } = response.data;
      setBookedSlots(product_availability.slot_bookings);
      generateTimeSlots();
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const renderTimeSlot = (slot, index) => {
    const currentTime = moment();
    const slotTime = moment(date).set({
      hour: parseInt(slot.split(":")[0]),
      minute: parseInt(slot.split(":")[1]),
    });

    const isPast = slotTime.isBefore(currentTime);
    const nextSlotTime = slotTime.clone().add(15, "minutes");
    const isInCurrentSlotRange = currentTime.isBefore(nextSlotTime);

    const isBooked = bookedSlots.includes(slot);

    const shouldShowAsAvailable =
      !isPast || (isInCurrentSlotRange && !isBooked);

    return (
      <button
        key={index}
        style={{
          ...styles.timeSlot,
          ...(selectedTimeSlots.includes(slot) ? styles.selectedTimeSlot : {}),
          ...(isBooked || !shouldShowAsAvailable ? styles.bookedTimeSlot : {}),
        }}
        onClick={() =>
          !isBooked && shouldShowAsAvailable && handleTimeSlotPress(slot)
        }
        disabled={isBooked || !shouldShowAsAvailable}
      >
        {slot}
      </button>
    );
  };

  const validateFields = () => {
    const errors = {};
    if (!purpose) errors.purpose = "Purpose is required";
    if (!selectedPodSlug) errors.pod = "Pod selection is required";
    if (selectedTimeSlots.length === 0) {
      errors.timeSlots = "Time slot is required";
    } else {
      const startTime = selectedTimeSlots[0];
      const endTime = selectedTimeSlots[selectedTimeSlots.length - 1];
      const duration = calculateDuration(startTime, endTime);
      if (duration > 180) {
        errors.timeSlots = "Maximum booking time is 3 hours";
      }
    }
    return errors;
  };
const handleBookNow = debounce(async () => {
  if (loading) return;

  const validationErrors = validateFields();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
  } else {
    setLoading(true);

    const startTimeSlot = selectedTimeSlots[0];
    const endTimeSlot = selectedTimeSlots[selectedTimeSlots.length - 1];

    // Combine the selected date with the time slots to create valid ISO date strings
    const startTime = moment(
      `${moment(date).format("YYYY-MM-DD")} ${startTimeSlot}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();
    const endTime = moment(
      `${moment(date).format("YYYY-MM-DD")} ${endTimeSlot}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();

    const bookingDetails = {
      bookingPurpose: purpose,
      bookingDate: moment(date).format("YYYY-MM-DD"),
      startTime,
      endTime,
      timeSlotNumber: selectedTimeSlots.length.toString(),
      status: "Pending",
      isBookingActive: true,
    };

    try {
      const response = await createBooking(selectedPodSlug, bookingDetails);
      console.log("response", response);
      if (response.booking) {
        // Navigate to QR Screen
        console.log("asdasd",response)
        window.location.href = `/qr?bookingId=${response.booking._id}`;
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error: An error occurred while creating the booking");
    } finally {
      setLoading(false);
    }
  }
}, 3000);

  // const handleBookNow = debounce(async () => {
  //   if (loading) return;

  //   const validationErrors = validateFields();

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     setLoading(true);

  //     const startTime = selectedTimeSlots[0];
  //     const endTime = selectedTimeSlots[selectedTimeSlots.length - 1];

  //     const bookingDetails = {
  //       bookingPurpose: purpose,
  //       bookingDate: moment(date).format("YYYY-MM-DD"),
  //       startTime,
  //       endTime,
  //       timeSlotNumber: selectedTimeSlots.length.toString(),
  //       status: "Pending",
  //       isBookingActive: true,
  //     };

  //     try {
  //       const response = await createBooking(selectedPodSlug, bookingDetails);
  //       if (response.booking) {
  //         // Navigate to QR Screen
  //         window.location.href = `/qr?bookingId=${response.booking._id}`;
  //       }
  //     } catch (error) {
  //       console.error("Error creating booking:", error);
  //       alert("Error: An error occurred while creating the booking");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // }, 3000);

  const createBooking = async (slugs, bookingDetails) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/create-booking/${slugs}`,
        bookingDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJjYjRmZWRjZmU3M2U2N2U4NGY0MSIsImlhdCI6MTcyNjEzOTk0OCwiZXhwIjoxNzM0Nzc5OTQ4fQ.Uy0EDbnQ1clGLvZBjtPFhjQjx0PqngDsYLj2hUkBEQ4`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  const calculateDuration = (start, end) => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);
    return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
  };

  const generateTimeSlots = () => {
    let startTime = 6 * 60; // 6:00 AM
    const endTime = 24 * 60; // 12:00 AM
    const interval = 15;
    const slots = [];

    while (startTime <= endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      slots.push(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
      startTime += interval;
    }

    setTimeSlots(slots);
  };

  const handleTimeSlotPress = (slot) => {
    let newSelectedSlots = [...selectedTimeSlots];

    if (newSelectedSlots.includes(slot)) {
      const index = newSelectedSlots.indexOf(slot);
      newSelectedSlots.splice(index, 1);
    } else {
      newSelectedSlots.push(slot);
    }

    setSelectedTimeSlots(newSelectedSlots);
    validateTimeSlots(newSelectedSlots);
  };

  const validateTimeSlots = (slots) => {
    if (slots.length > 0) {
      const startTime = slots[0];
      const endTime = slots[slots.length - 1];
      const duration = calculateDuration(startTime, endTime);

      if (duration <= 0) {
        setErrors({ timeSlots: "Please choose a valid time." });
      } else if (duration > 180) {
        setErrors({ timeSlots: "Maximum booking time is 3 hours." });
      } else {
        setErrors({});
      }
    } else {
      setErrors({ timeSlots: "Time slot is required" });
    }
  };

  return (
    <div style={styles.container}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        sx={{ marginBottom: 2, color: "#ED3327" }}
      >
        Corporate Booking
      </Typography>

      <div style={styles.field}>
        <label>Purpose:</label>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="">Select Purpose</option>
          <option value="meeting">Meeting</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
        {errors.purpose && <div style={styles.errorText}>{errors.purpose}</div>}
      </div>
      <div style={styles.field}>
        <label>Pod:</label>
        <select
          value={selectedPodSlug}
          onChange={(e) => setSelectedPodSlug(e.target.value)}
        >
          <option value="">Select Pod</option>
          {pods.map((pod) => (
            <option key={pod._id} value={pod._id}>
              {pod.title}
            </option>
          ))}
        </select>
        {errors.pod && <div style={styles.errorText}>{errors.pod}</div>}
      </div>
      <div style={styles.field}>
        <label>Date:</label>
        <input
          type="date"
          value={moment(date).format("YYYY-MM-DD")}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>

      <div style={styles.field}>
        <label>Time Slots:</label>
        <button onClick={() => setShowTimeSlots(true)}>
          {selectedTimeSlots.length > 0
            ? `${selectedTimeSlots[0]} - ${
                selectedTimeSlots[selectedTimeSlots.length - 1]
              }`
            : "Select an Available Time Slot"}
        </button>
        {errors.timeSlots && (
          <div style={styles.errorText}>{errors.timeSlots}</div>
        )}
      </div>

      {showTimeSlots && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>Select Time Slots</div>
            {errors.timeSlots && (
              <div style={styles.errorText}>{errors.timeSlots}</div>
            )}
            <div style={styles.timeSlotsContainer}>
              {timeSlots.map((slot, index) => renderTimeSlot(slot, index))}
            </div>
            <button
              onClick={() => setShowTimeSlots(false)}
              style={styles.doneButton}
              disabled={errors.timeSlots ? true : false}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <button onClick={handleBookNow} disabled={loading}>
        {loading ? "Processing..." : "Create Booking"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "20px",
  },
  errorText: {
    color: "red",
  },
  timeSlotsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    overflow: "scroll",
    height: "300px",
  },
  timeSlot: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#FF1200",
    color: "#fff",
  },
  bookedTimeSlot: {
    backgroundColor: "#ccc",
    color: "#999",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
  },
  modalHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  doneButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#FF1200",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default VipBooking;
