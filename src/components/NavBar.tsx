import * as React from "react";
// import { jsonData } from "../utils/data";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import { shallow } from "zustand/shallow";
import { FormLabel } from "@mui/material";
import {
  Autocomplete,
  FormGroup,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./NavBar.scss";
import ReplayRoundedIcon from "@mui/icons-material/Replay";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function isLoading(loading: boolean) {
  if (loading) {
    window.setTimeout(isLoading, 100);
  } else {
    return;
  }
}

function NavBar() {
  const navigate = useNavigate();
  const [textInputState, setTextInputState] = useState("");
  const [errorState, setErrorState] = useState(false);

  const [isValid] = useStore((state) => [state.isSelectionValid], shallow);
  const fetchData = useStore((state) => state.fetchData, shallow);
  const data = useStore((state) => state.data, shallow);
  const loading = useStore((state) => state.loading, shallow);
  const loadingError = useStore((state) => state.loadingError, shallow);
  const [setDataId] = useStore((state) => [state.setDataId], shallow);
  const [data_id] = useStore((state) => [state.data_id], shallow);
  const [sample_idx] = useStore((state) => [state.sample_idx], shallow);

  // currently selected index in the dropdown menu
  const [idx, setidx] = useState(-1);
  useEffect(() => {
    setidx(-1);
  }, [data]);

  // we construct the values for the dropdown menu
  // this is based on the data ids + evaluation state
  const data_ids = Object.keys(data);
  const selectionOptions = data_ids.map((val) => {
    let evaluation_state = "❓";
    if (data[val]) {
      if (data[val][0]) {
        if (Object.keys(data[val][0]).indexOf("passed") > -1) {
          if (
            data[val][0].passed === null ||
            data[val][0].passed === undefined
          ) {
            // nothing to do, we already have set eval state to 'no eval'
          } else if (data[val][0].passed) {
            evaluation_state = "✅";
          } else {
            evaluation_state = "❌";
          }
        }
      }
    }
    return val + ": " + evaluation_state;
  });

  const [setSampleNum] = useStore((state) => [state.setSampleIDX]);
  const valid = isValid();
  const wandb_run = useStore((state) => state.wandb_run, shallow);

  useEffect(() => {
    setTextInputState(wandb_run);
  }, [wandb_run]);

  let num_samples = 0;
  if (data_id in data) {
    num_samples = data[data_id]!.length;
  }

  const sampleOptions = Array.from({ length: num_samples }, (val, k) => {
    return k.toString();
  });

  return (
    <AppBar position="static">
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters className="header">
          <Typography
            variant="h3"
            style={{ paddingInline: "20px", fontWeight: "bold" }}
          >
            Flow
          </Typography>
          <FormGroup id="navbar-formgroup">
            <TextField
              InputProps={{
                style: {
                  width: "300px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        fetchData(textInputState);
                      }}
                    >
                      <ReplayRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id={errorState ? "wandb-path-error" : "wandb-path"}
              size="small"
              variant="outlined"
              //defaultValue="martinj96/GPTeam/2kxdlg4l"
              value={textInputState}
              onChange={(event) => {
                setTextInputState(event.target.value);
              }}
              error={loadingError.length > 0}
              helperText={loadingError}
              label="WandB Run"
            ></TextField>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              style={{ width: "300px" }}
              options={selectionOptions}
              // value={data_ids.length < idx ? data_ids[idx] : ""}
              value={selectionOptions[idx] ?? ""}
              // value = 1
              onChange={(event, newValue) => {
                if (newValue) {
                  const newIDX = selectionOptions.indexOf(newValue);
                  setidx(newIDX);
                  if (newIDX >= 0) {
                    setDataId(data_ids[newIDX]);
                  }
                  navigate("/view");
                }
              }}
              sx={{ width: 150, borderRadius: "3pt" }}
              // renderInput={(params) => (
              //   <TextField {...params} label="Problem ID" />
              // )}
              renderInput={(params) => (
                <TextField {...params} label="Problem ID" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box"
              options={sampleOptions}
              value={sample_idx.toString()}
              size="small"
              disableClearable
              style={{ width: "50px" }}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSampleNum(sampleOptions.indexOf(newValue));
                  navigate("/view");
                }
              }}
              sx={{ width: 150, borderRadius: "3pt" }}
              renderInput={(params) => <TextField {...params} label="idx" />}
            />
          </FormGroup>
          <div style={{ flexGrow: 1 }}></div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://github.com/epfl-dlab/multi-level-reasoning-for-code"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <GitHubIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

/*          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                onClick={()=>{
                    navigate("/")
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Load Data
              </Button>
              <Button
              disabled={!valid}
                onClick={()=>{
                    navigate("/view")
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                View Data
              </Button>
          </Box>


    <Button onClick={()=>{
                    navigate("/view")
                }}>View Data</Button>

 */
