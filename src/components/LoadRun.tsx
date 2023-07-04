import React, { useEffect } from "react";
import { useStore } from "./../state/store";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import IconButton from "@mui/material/IconButton";
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoadRun.scss";
import NavBar from "./NavBar";

export default function LoadRun() {
  const navigate = useNavigate();
  const [fetchData] = useStore((state) => [state.fetchData]);
  const [loading] = useStore((state) => [state.loading]);
  const [reset] = useStore((state) => [state.reset]);
  const [data] = useStore((state) => [state.data]);
  const [data_id] = useStore((state) => [state.data_id]);
  const [setDataId] = useStore((state) => [state.setDataId]);
  const [sample_idx] = useStore((state) => [state.sample_idx]);
  const [setSampleNum] = useStore((state) => [state.setSampleIDX]);

  const data_ids = Object.keys(data);
  let num_samples = 0;
  if (data_id in data) {
    num_samples = data[data_id]!.length;
  }

  const sampleOptions = Array.from({ length: num_samples }, (val, k) => {
    return k.toString();
  });
  //const sampleOptions = [0,1,2].map((val, idx)=>val.toString())
  console.log(data);

  return (
    <>
      <NavBar />
      <div>
        <div className="LoadRun">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="outlined"
              startIcon={<CachedIcon />}
              onClick={() => {
                //fetchData('test')
              }}
            >
              Reload
            </Button>
          )}
          {data ? (
            <div>
              <Button
                onClick={() => {
                  navigate("/view");
                }}
              >
                View Data
              </Button>
            </div>
          ) : (
            <p>No data, ensure that the backend is running and reload.</p>
          )}
        </div>
        {/* <Main /> */}
      </div >


    </>
  );
}

/*                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={data_ids}
                    value={data_id}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setDataId(newValue)
                        }
                    }}
                    sx={{ width: 300, marginTop: 5 }}
                    renderInput={(params) => <TextField {...params} label="id" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box"
                    options={sampleOptions}
                    value={sample_idx.toString()}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSampleNum(sampleOptions.indexOf(newValue))
                        }
                    }}
                    sx={{ width: 300, marginTop: 5 }}
                    renderInput={(params) => <TextField {...params} label="id" />}
                />*/
