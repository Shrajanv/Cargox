import React, { createContext } from "react";
import { config } from "../../../Config/configure";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

export const CustomerContext = createContext();
export default function Context({ children }) {
  const { host } = config;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [singleService, setSingleService] = useState(null);
  const [activeNavOption, setActiveNavOption] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setActiveNavOption(pathname);
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

  const getProfile = async () => {
    let token = localStorage.getItem("clientToken");
    axios
      .get(`${host}/customer/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCustomer(res.data.customer);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("clientToken") != null) {
      getProfile();
    } else {
      setCustomer(null);
      // navigate("/");
    }
  }, [state]);

  const Login = async (data) => {
    axios
      .post(`${host}/customer/Login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("clientToken", res.data.token);
          setState(!state);
          autoCloseAlert(
            res.data.message,
            "You will redirected to the home page ",
            2000
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const LogoutCustomer = () => {
    localStorage.removeItem("clientToken");
    setState(!state);
    navigate("/");
  };

  const handleLogoutCustomer = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutCustomer
    );
  };

  const viewAllServices = async () => {
    axios
      .get(`${host}/customer/viewAllServices`)
      .then((res) => {
        setAllServices(res.data.services);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllCategories = async () => {
    axios
      .get(`${host}/customer/getAllCategories`)
      .then((res) => {
        setAllCategories(res.data.categories);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getSingleService = async (id) => {
    axios
      .get(`${host}/customer/getSingleService/${id}`)
      .then((res) => {
        setSingleService(res.data.service);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const submitContactFeedback = async (data) => {
    axios
      .post(`${host}/customer/submitContactFeedback`, data)
      .then((res) => {
        if (res.data.success) {
          directAlert("success", "Feedback submitted successfully", 3000);
        } else {
          directAlert("error", "Failed to submit feedback", 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const Register = async (data) => {
    axios
      .post(`${host}/customer/Register`, data)
      .then((res) => {
        if (res.data.success) {
          directAlert("success", "Registration successful", 3000);
          navigate("/Login");
        } else {
          directAlert("error", "Failed to register", 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getBookings = async () => {
    let token = localStorage.getItem("clientToken");
    axios
      .get(`${host}/customer/getBookings`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAllBookings(res.data.bookings);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const bookService = async (data) => {
    let token = localStorage.getItem("clientToken");
    axios
      .post(`${host}/customer/bookService`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getBookings();
          navigate("/MyBookings");
        } else {
          directAlert("error", "Failed to book service", 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const cancelBooking = async (id) => {
    let token = localStorage.getItem("clientToken");
    axios
      .put(
        `${host}/customer/cancelBooking/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getBookings();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const payForBooking = async (id, data) => {
    let token = localStorage.getItem("clientToken");
    axios
      .put(`${host}/customer/payForBooking/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getBookings();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const feedbackForBooking = async (id, feedback) => {
    let token = localStorage.getItem("clientToken");
    axios
      .put(`${host}/customer/feedbackForBooking/${id}`, feedback, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getBookings();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <CustomerContext.Provider
      value={{
        host,
        pathname,
        navigate,
        customer,
        setCustomer,
        state,
        setState,
        loading,
        setLoading,
        allCategories,
        setAllCategories,
        getAllCategories,
        allServices,
        viewAllServices,
        getSingleService,
        singleService,
        setSingleService,
        submitContactFeedback,
        activeNavOption,
        Register,
        Login,
        handleLogoutCustomer,
        getBookings,
        bookService,
        allBookings,
        cancelBooking,
        confirmation,
        selectedItem,
        setSelectedItem,
        payForBooking,
        feedbackForBooking,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
