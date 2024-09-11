import React, { createContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import { config } from "../../../Config/configure";
export const AdminContext = createContext();
export default function Context({ children }) {
  const { host } = config;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeNavOption, setActiveNavOption] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    if (pathname === "/admin/Dashboard") {
      setActiveNavOption("Dashboard");
    } else if (pathname == "/admin/Companies") {
      setActiveNavOption("Companies");
    } else if (pathname == "/admin/Clients") {
      setActiveNavOption("Clients");
    } else if (pathname == "/admin/Categories") {
      setActiveNavOption("Categories");
    } else if (pathname == "/admin/Bookings") {
      setActiveNavOption("Bookings");
    } else {
      setActiveNavOption("Feedbacks");
    }
  }, [pathname]);
  //alerts
  const autoCloseAlert = (msgTitle, msgHtml, msgTimer) => {
    let timerInterval;
    Swal.fire({
      title: msgTitle,
      html: msgHtml + " in <b></b> milliseconds.",
      timer: msgTimer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });
  };

  const confirmation = (
    mainSubTitle,
    confirmButtonLabel,
    cancelMessage,
    successTitle,
    successSubTitle,
    performAction
  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: mainSubTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonLabel,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          performAction();
          swalWithBootstrapButtons.fire({
            title: successTitle,
            text: successSubTitle,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: cancelMessage,
            icon: "error",
          });
        }
      });
  };

  const directAlert = (type, message, time) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  };

  //functions
  const getProfile = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken") != null) {
      getProfile();
    } else {
      setAdmin(null);
      navigate("/admin/");
    }
  }, [state]);
  const LogoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setState(!state);
    navigate("/admin/");
  };

  const handleLogoutAdmin = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutAdmin
    );
  };
  const adminLogin = async (data) => {
    axios
      .post(`${host}/admin/Login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          setAdmin(res.data.admin);
          setState(!state);
          directAlert("success", res.data.message, 3000);
          navigate("/admin/Dashboard");
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.response.data.message, 3000);
      });
  };

  const insertCategory = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertCategory`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCategories = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCategories`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCategory = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateCategory/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCompanies = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCompanies`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllCompanies(res.data.companies);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCompanyStatus = (id, status) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateCompanyStatus/${id}`,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getAllCompanies();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCustomers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCustomers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllCustomers(res.data.customers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCustomerStatus = (id, status) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateCustomerStatus/${id}`,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getAllCustomers();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllFeedbacks = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllFeedbacks`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllFeedbacks(res.data.feedbacks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllBookings = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllBookings`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllBookings(res.data.bookings);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCounts = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setCounts({
            customers: res.data.customers,
            companies: res.data.companies,
            services: res.data.services,
            bookings: res.data.bookings,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        state,
        setState,
        loading,
        setLoading,
        pathname,
        navigate,
        adminLogin,
        handleLogoutAdmin,
        activeNavOption,
        setActiveNavOption,
        host,
        insertCategory,
        getAllCategories,
        updateCategory,
        allCategories,
        getAllCompanies,
        allCompanies,
        allCustomers,
        getAllCustomers,
        updateCustomerStatus,
        updateCompanyStatus,
        allFeedbacks,
        getAllFeedbacks,
        allBookings,
        getAllBookings,
        counts,
        getCounts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
