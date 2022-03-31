import styled from "@emotion/styled";
import countryToFlagJSON from "../../api/countrytoflag.json";
function Country(props: IndividualCountryProps) {
  const { country } = props;
  return (
    <>
      <header className="bg-black py-6">
        <div className="container mx-auto">
          <div className="flex">
            <div className="flex-1">
              <h1 className="text-white text-4xl mb-3">THE VISIBILITY REPORT</h1>
              <div className="flex">
                <h2 className="text-white text-6xl mt-1 mr-12">{country.CountryName}</h2>
                <img src={(countryToFlagJSON as any)[country.CountryName].image} alt={country.CountryName} className="w-20" />
              </div>
            </div>
            <div className="flex justify-center items-center text-8xl">
              <h3 className="text-white">#{country.Ranking}</h3>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto">
        <h4 className="mt-4 mb-2 text-4xl">TOP 5 GLOBAL SITES</h4>
        {country.BlockedWebsites.map((block, i) => <div key={i}>
          {block}
        </div>)}
        <h4 className="mt-4 mb-2 text-4xl">RECENT BLOCKS</h4>
        {country.BlockedWebsites.map((block, i) => <div key={i}>
          {block}
        </div>)}
      </div>
    </>
  );
}
export default styled(Country)`
`;