import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { axiosPublic } from "../../Hooks/axiosPublic";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const strictRef = useRef(false);
  const [isSuccess, setIsSuccess] = useState("Success Your Payment.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) return;

    if (!strictRef.current) {
      strictRef.current = true;
      try {
        axiosPublic(`/session-status?session_id=${session_id}`).then((res) => {
          console.log(res);
          if (res?.data?.status === 409) {
            setIsSuccess(res.data.message);
          }
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        toast.error(error.code);
      }
    }
  }, [searchParams]);
  if (loading) {
    return <Loading/>;
  }
  return <div>{isSuccess}</div>;
};

export default PaymentSuccess;
