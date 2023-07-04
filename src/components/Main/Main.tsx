import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Main.scss";
import { newData } from "../../utils/newData";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//
const fields = ["#Flow", "#plan_agent", "#plan_feedback_agent", "#code_agent"];
const Main = () => {
  //Accordion
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    const res: any = newData?.flatMap((data, index) => {
      let arr: any = [];

      data?.inference_outputs.map((item: any, index: number) => {
        arr.push({ id: data?.id, type: item?.message_type });
      });
      return arr;
    });

    if (data) {
      setData(res);
    }
  }, []);

  return (
    // <Box sx={{ flexGrow: 1 }} >
    //     <Grid container spacing={2} columns={16} >
    //         {
    //             fields.map((data, index) =>
    //                 <Grid item xs={4} key={index}>
    //                     <Item className='section'>
    //                         <div className='list'>
    //                             <div className='list-head'>{data}</div>
    //                             <div className='list-body'> <h1>tree</h1></div>
    //                         </div>

    //                     </Item>
    //                 </Grid>
    //             )
    //         }

    //     </Grid>
    // </Box>

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={4}>
          <Item className="section">
            <div className="list">
              <div className="list-head">#Flow</div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant="h6" className="collapse-header">
                    Dynamic Data
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Dynamic Data Will be Placed Here--- <br />
                    <br />
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item className="section">
            <div className="list">
              <div className="list-head">#plan_agent</div>
              <div className="list-body">
                {" "}
                <h1>tree</h1>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item className="section">
            <div className="list">
              <div className="list-head">#plan_feedback_agent</div>
              <div className="list-body">
                {" "}
                <h1>tree</h1>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item className="section">
            <div className="list">
              <div className="list-head">#code_agent'</div>
              <div className="list-body">
                {" "}
                <h1>tree</h1>
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
