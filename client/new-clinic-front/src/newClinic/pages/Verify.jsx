import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading } = useGlobalContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h4 className="text-lg text-red-500">
          There was an error, please double check your verification link.
        </h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Account Confirmed
      </h2>
      <Link
        to="../../auth/login"
        className="px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition"
      >
        Please login
      </Link>
    </div>
  );
};

export default VerifyPage;
