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
        if(auth){
          const res = await axios.get(
            process.env.REACT_APP_API_ENDPOINT + "problems/all",
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );
          setProblems(res.data);
        }else{
          const res = await axios.get(
            process.env.REACT_APP_API_ENDPOINT + "problems/all"
          );
          setProblems(res.data);
        }
      } catch {
        alert("Something went wrong while fetching the problems");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);
  console.log(problems);
  return (
    <>
      <Problem problems={problems} />
    </>
  );
}

export default Problems;