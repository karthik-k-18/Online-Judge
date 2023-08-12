import React, { useEffect } from "react";
import Problem from "./Table";
import axios from "axios";

function Problems({ auth }) {
  const [problems, setProblems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_ENDPOINT + "problems/all"
        );
        setProblems(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);
  return (
    <>
      <Problem problems={problems} />
    </>
  );
}

export default Problems;