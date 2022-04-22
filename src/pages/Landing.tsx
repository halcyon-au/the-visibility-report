import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCountries } from "../api/ooni";
import countryJSON from "../api/countrytoflag.json";
import { useState } from "react";

import ooni from "../assets/img/ooni.svg";
import "../assets/styles/landing.scss";
import { Box, Container, Grid, InputAdornment, ListItem, TextField, Typography } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { ArrowForward, ArrowRight, Equalizer } from "@mui/icons-material";
import { useEffect } from "react";


function Landing(props: LandingProps) {
  const { className } = props;
  const navigate = useNavigate();
  const countries = useCountries();
  const [search, setSearch] = useState<string>("");
  function doSearchLogic() {
    if (props.SEARCH_MODE != "Site" && countries.countries.some((v) => v.name.toUpperCase() === search?.toUpperCase())) {
      navigate(`/country/${search}`);
    } else if (props.SEARCH_MODE != "Country") {
      navigate(`/site/${search}/`);
    }
  }
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: OONICountry) => option.name,
  });
  useEffect(() => {
    if (props.SEARCH_MODE != "Site" && countries.countries.some((v) => v.name.toUpperCase() === search.toUpperCase())) {
      navigate(`/country/${search}`);
    }
  }, [search]);
  return (
    <Container id="home" className={className} maxWidth="xl">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box width="100%" className='rev-block'>
          <Box display="flex">
            <Box mr={2} my="auto">
              <Typography fontFamily="League Gothic" className="marginTopBottom" variant="h3" component="h1">THE VISIBILITY REPORT</Typography>
            </Box>
            <Autocomplete
              value={search}
              onInput={(e) => {
                setSearch((e.target as any).value);
              }}
              onKeyDown={(e) => {
                if (e.key.toUpperCase() === "ENTER") {
                  doSearchLogic();
                }
              }}
              onChange={(_, val) => {
                if (typeof val !== "string" && val) {
                  navigate(`/country/${val.name}`);
                }
              }}
              freeSolo
              disablePortal
              className="flex-1"
              id="country-website-search"
              options={countries.countries}
              filterOptions={filterOptions}
              renderInput={(params) => {
                params.InputLabelProps.style = {
                  color: "#FFF",
                  backgroundColor: "#000",
                  fontFamily: "League Gothic",
                  fontSize: 25
                };
                params.InputProps.endAdornment = <InputAdornment position="end">
                  <ArrowForward sx={{ color: "#FFF" }} className="cursor-pointer" onClick={() => doSearchLogic()} />
                </InputAdornment>;
                params.InputProps.className = "searchStyle";
                return (<TextField
                  sx={{ backgroundColor: "#000" }}
                  variant="outlined"
                  label="ENTER COUNTRY/SITE"
                  {...params}
                />);
              }}
              getOptionLabel={(option) => typeof option === "string" ? option : option.name}
              renderOption={(props, option) => 
                /* We default on italy because we are italian like curtis */
                <ListItem {...props}>{option.name} - <img style={{ maxHeight: "20px" }} src={(countryJSON as any)[option.name] ? (countryJSON as any)[option.name].image : (countryJSON as any)["Italy"].image} height="20px" /></ListItem>
              }
            />
            <Equalizer fontSize="large" className="my-auto ml-4" />
            <Box id="ooni-attrib" position="absolute" mt={10}>
              <Typography sx={{ fontFamily: "'League Gothic', sans-serif !important"}} variant="body1">POWERED BY</Typography>
              <a href="https://ooni.org/data/" target="_blank" rel="noreferrer">
                <img src={ooni} width="100" id="ooni" />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
      <div id="footer">
        <h1>©2022</h1>
        <h1>#STANDWITHUKRAINE 🇺🇦</h1>
        <a href="https://github.com/halcyon-au/the-visibility-report" target="_blank" rel="noreferrer"><h1>SOURCE</h1></a>
      </div>
    </Container>
  );
}
export default styled(Landing)`
#ooni {
  filter: grayscale(1) invert(1);
  -webkit-filter: grayscale(1) invert(1);
}
input::-webkit-calendar-picker-indicator {
  display: none;
}
.marginTopBottom {
  margin: auto !important;
}
.searchStyle {
  color: #FFF !important;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 25px;
}
& .MuiOutlinedInput-root {
  &.Mui-focused fieldset {
    border-color: #000;
  }
}
.MuiOutlinedInput-root {
  padding-right: 9px !important;
}
`;