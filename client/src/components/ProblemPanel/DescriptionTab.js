import { Typography } from "@mui/material";


const DescriptionTab = ({ name,description }) => {
  return (
        <>
            <Typography variant="h4" component="h2" gutterBottom>
                {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {description}
            </Typography>
        </>
  );
};

export default DescriptionTab;
