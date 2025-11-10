import serverCall from "../serverCall";

const getDashboard = (filterType) => {
  try {
    let filter = "";
    if (filterType !== "all") {
      filter = `?filterType=${filterType}`;
    }

    const response = serverCall.get(`admin/dashBoard${filter}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const DashboardService = {
  getDashboard,
};

export default DashboardService;
