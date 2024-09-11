import React, { createContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import { config } from "../../../Config/configure";
export const CompanyContext = createContext();
export default function Context({ children }) {
  const { host } = config;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeNavOption, setActiveNavOption] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [singleBooking, setSingleBooking] = useState(null);
  const [counts, setCounts] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (pathname == `/company/Booking/${id}`) {
      setActiveNavOption("/company/Bookings");
    } else {
      setActiveNavOption(pathname);
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
    let token = localStorage.getItem("companyToken");
    axios
      .get(`${host}/company/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCompany(res.data.company);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("companyToken") != null) {
      getProfile();
    } else {
      setCompany(null);
      navigate("/company/");
    }
  }, [state]);
  const LogoutCompany = () => {
    localStorage.removeItem("companyToken");
    setState(!state);
    navigate("/company/");
  };

  const handleLogoutCompany = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutCompany
    );
  };
  const Login = async (data) => {
    axios
      .post(`${host}/company/Login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("companyToken", res.data.token);
          setCompany(res.data.company);
          setState(!state);
          directAlert("success", res.data.message, 3000);
          navigate("/company/Dashboard");
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.response.data.message, 3000);
      });
  };

  const Register = async (data) => {
    axios
      .post(`${host}/company/Register`, data)
      .then((res) => {
        if (res.data.success) {
          directAlert("success", "Registration successful", 3000);
          navigate("/company/");
        } else {
          directAlert("error", "Failed to register", 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const insertService = async (data) => {
    let token = localStorage.getItem("companyToken");
    axios
      .post(`${host}/company/insertService`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
          getAllServices();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllServices = async () => {
    let token = localStorage.getItem("companyToken");
    axios
      .get(`${host}/company/getAllServices`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllServices(res.data.services);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCategories = async () => {
    let token = localStorage.getItem("companyToken");
    axios
      .get(`${host}/company/getAllCategories`, {
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

  const updateService = async (id, data) => {
    let token = localStorage.getItem("companyToken");
    axios
      .put(`${host}/company/updateService/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          setState(!state);
          getAllServices();
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBookingForService = async () => {
    let token = localStorage.getItem("companyToken");
    axios
      .get(`${host}/company/getBookingForService`, {
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
  const getSingleBooking = async (id) => {
    let token = localStorage.getItem("companyToken");
    axios
      .get(`${host}/company/getSingleBooking/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setSingleBooking(res.data.booking);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateBooking = async (id, data) => {
    let token = localStorage.getItem("companyToken");
    axios
      .put(`${host}/company/updateBooking/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getSingleBooking(id);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updatePaymentStatus = async (id, paymentStatus) => {
    let token = localStorage.getItem("companyToken");
    axios
      .put(
        `${host}/company/updatePaymentStatus/${id}`,
        { paymentStatus },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getSingleBooking(id);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCounts = async () => {
    let token = localStorage.getItem("companyToken");
    axios
      .get(`${host}/company/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setCounts({
            services: res.data.services,
            bookings: res.data.bookings,
            revenue: res.data?.revenue,
          });
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        setCompany,
        state,
        setState,
        loading,
        setLoading,
        pathname,
        navigate,
        Login,
        Register,
        handleLogoutCompany,
        activeNavOption,
        setActiveNavOption,
        host,
        insertService,
        getAllCategories,
        updateService,
        allCategories,
        getAllServices,
        allServices,
        allBookings,
        setAllBookings,
        getBookingForService,
        singleBooking,
        setSingleBooking,
        getSingleBooking,
        updateBooking,
        updatePaymentStatus,
        getCounts,
        counts,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
