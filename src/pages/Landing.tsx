import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useCountries } from '../api/ooni';
import countryJSON from "../api/countrytoflag.json";
import { useState } from 'react';

import ooni from '../assets/img/ooni.svg';
import '../assets/styles/landing.scss';


function Landing(props: LandingProps) {
  const navigate = useNavigate();
  const countries = useCountries();
  const [search, setSearch] = useState<string>();
  function doSearchLogic() {
    if (countries.countries.some((v) => v.name === search)) {
      navigate(`/country/${search}`)
    } else if (props.SEARCH_MODE != "Country") {
      navigate(`/site/${search}`)
    }
  }
  function detectIfDatalistOption(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.SEARCH_MODE != "Site" && countries.countries.some((v) => v.name === e.target.value)) {
      navigate(`/country/${e.target.value}`)
    } else if (props.SEARCH_MODE != "Country") {
      setSearch(e.target.value)
    }
  }
  return (
    <div id="home" className={`sm:container mx-auto ${props.className}`}>
      <div className="flex h-screen justify-center items-center">
      <div className="w-full">
        <div className="rev-block">
            <div id="content" className="flex">
              <h1 className="text-5xl my-auto"><span>THE VISIBILITY REPORT</span></h1>
              <div className="mx-10 flex-1">
                <div id="inputbox" className="flex">
                  <input type="text" onKeyPress={(e) => e.key === "Enter" ? doSearchLogic() : undefined} list="observabilitymode" className="text-4xl bg-black text-white px-8 py-5 w-full appearance-none placeholder:text-white" placeholder="ENTER COUNTRY/SITE" onChange={detectIfDatalistOption} />
                  <button className="material-icons text-white text-4xl bg-black px-8" onClick={() => doSearchLogic()}>&#xe5c8;</button>
                </div>
                {props.SEARCH_MODE != "Site" ?
                  <datalist aria-label="select observability mode" id="observabilitymode" className="text-4xl bg-black text-white px-8 py-5 w-full appearance-none"> { /* HTML datalists cant be styled... */}
                    {countries.countries.map((country) => <option key={country.alpha_2} value={country.name}>
                      {country.name} - {countryJSON[country.alpha_2 as "AC"].emoji}
                    </option>)}
                  </datalist> : <></>}
              </div>
              <span className="material-icons text-4xl my-auto">&#xe01d;</span>
            </div>

            <div id="ooni-attrib" className="absolute mt-8">
              <h2>POWERED BY</h2>
              <a href="https://ooni.org/data/" target="_blank">
                <img src={ooni} width="100" id="ooni" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="footer">
        <h1>©2022</h1>
        <h1>#STANDWITHUKRAINE 🇺🇦</h1>
        <a href="https://github.com/halcyon-au/the-visibility-report" target="_blank"><h1>SOURCE</h1></a>
      </div>
    </div>
  )
}
export default styled(Landing)`
#ooni {
  filter: grayscale(1) invert(1);
  -webkit-filter: grayscale(1) invert(1);
}
input::-webkit-calendar-picker-indicator {
  display: none;
}
`