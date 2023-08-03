import React, { useEffect } from "react";
import Problem from "./Table";
import axios from "axios";

function Problems() {
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
  console.log(problems);
  return (
    <>
      {/* {problems.map((problem) => (
        <Problem
          key={problem.id}
          id={problem.id}
          name={problem.name}
          tags={problem.tags}
          handleClick={() => navigate(`/problems/${problem.id}`)}
        />
      ))} */}
      <Problem
        problems={problems}
      />
    </>
  );
}

// const Problem = ({ id, name, description,tags, handleClick }) => {
//   return (
//     <>
//       <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//         <List component="nav" aria-label="main mailbox folders">
//           <ListItem>
//             <ListItemButton onClick={handleClick}>
//               <ListItemIcon>
//                 <TaskAltTwoToneIcon />
//               </ListItemIcon>
//               <ListItemText primary={id} />
//               <ListItemText primary={name} />
//               <ListItemText primary={tags.difficulty} />
//             </ListItemButton>
//           </ListItem>
//         </List>
//         <Divider />
//       </Box>
//     </>
//   );
// };

export default Problems;
