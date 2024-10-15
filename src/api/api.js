// api.js
import axios from "axios";

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:4000/api", // Base URL for your API
  
});

// Add a request interceptor to inject the token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API calls
export const fetchAllUsers = async () => {
  try {
    const response = await apiClient.get("/user/all-users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (userId) => {
  try {
    const response = await apiClient.put(`/user/block-user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await apiClient.put(`/user/unblock-user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchAllStaff = async () => {
  try {
    const response = await apiClient.get("/user/all-staff");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Block a staff user
export const blockStaff = async (userId) => {
  try {
    const response = await apiClient.put(`/user/block-staff/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Unblock a staff user
export const unblockStaff = async (userId) => {
  try {
    const response = await apiClient.put(`/user/unblock-staff/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a staff user
export const deleteStaff = async (userId) => {
  try {
    const response = await apiClient.delete(`/user/delete-staff/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new staff member
export const addStaff = async (newStaffData) => {
  try {
    const response = await apiClient.post("/user/register-staff", newStaffData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit a staff member
export const editStafff = async (staffId, editStaffData) => {
  try {
    const response = await apiClient.put(
      `/user/edit-staff/${staffId}`,
      editStaffData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Block a feature
export const blockFeature = async (featureId) => {
  try {
    const response = await apiClient.put(
      `/location/block-features/${featureId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Unblock a feature
export const unblockFeature = async (featureId) => {
  try {
    const response = await apiClient.put(
      `/location/unblock-features/${featureId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new feature
export const createFeature = async (featureData) => {
  try {
    const response = await apiClient.post(
      "/location/create-features",
      featureData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit a feature
export const editFeature = async (featureId, featureData) => {
  try {
    const response = await apiClient.put(
      `/location/edit-feature/${featureId}`,
      featureData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a feature
export const deleteFeature = async (featureId) => {
  try {
    const response = await apiClient.delete(
      `/location/delete-feature/${featureId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPodsData = async () => {
  try {
    const response = await apiClient.get("/product/getall");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all locations
export const fetchLocations = async () => {
  try {
    const response = await apiClient.get("/location/details");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all features
export const fetchFeatures = async () => {
  try {
    const response = await apiClient.get("/location/features");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload images
export const uploadImages = async (images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new pod
export const createPod = async (podData) => {
  try {
    const response = await apiClient.post("/product/create-pods", podData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit a pod
export const editPod = async (podId, podData) => {
  try {
    const response = await apiClient.put(
      `/product/edit-pods/${podId}`,
      podData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Block a pod
export const blockPod = async (podId) => {
  try {
    const response = await apiClient.put(`/product/block-pods/${podId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Unblock a pod
export const unblockPod = async (podId) => {
  try {
    const response = await apiClient.put(`/product/unblock-pods/${podId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a pod
export const deletePod = async (podId) => {
  try {
    const response = await apiClient.delete(`/product/delete-pods/${podId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchTransactionsData = async () => {
  try {
    const response = await apiClient.get("/transactions/getalltransactions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch the current rate
export const fetchRate = async () => {
  try {
    const response = await apiClient.get("/transactions/getrate");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Manage rate (create or update)
export const manageRate = async (rate) => {
  try {
    const response = await apiClient.post("/transactions/ManageRates", {
      rate,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const fetchAllBookings = async () => {
  try {
    const response = await apiClient.get("/user/all-bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Location-related API calls

// Fetch all locations

// Create a new location
export const createLocation = async (locationData) => {
  try {
    const response = await apiClient.post("/location/create", locationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Block a location
export const blockLocation = async (locationId) => {
  try {
    const response = await apiClient.put(`/location/block-Location/${locationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Unblock a location
export const unblockLocation = async (locationId) => {
  try {
    const response = await apiClient.put(`/location/unblock-Location/${locationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a location
export const deleteLocation = async (locationId) => {
  try {
    const response = await apiClient.delete(`/location/delete-Location/${locationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit a location
export const editLocation = async (locationId, locationData) => {
  try {
    const response = await apiClient.put(`/location/edit-location/${locationId}`, locationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
