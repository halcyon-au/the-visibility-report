import styled from "@emotion/styled";
import countryToFlagJSON from "../../api/countrytoflag.json";
import WebsiteEntry from "./WebsiteEntry";
import { facebook, google, instagram, twitter, youtube } from "../../assets/img/Icons";
function Country(props: IndividualCountryProps) {
  const { country } = props;
  function webBlocked(uri: string) {
    return country.BlockedMapping.get(`HTTPS://${uri.toUpperCase()}`) || country.BlockedMapping.get(`HTTPS://WWW.${uri.toUpperCase()}`) || country.BlockedMapping.get(`HTTPS://WWW.${uri.toUpperCase()}/`) || country.BlockedMapping.get(`HTTPS://${uri.toUpperCase()}/`)
      || country.BlockedMapping.get(`HTTP://${uri.toUpperCase()}`) || country.BlockedMapping.get(`HTTP://WWW.${uri.toUpperCase()}`) || country.BlockedMapping.get(`HTTP://WWW.${uri.toUpperCase()}/`) || country.BlockedMapping.get(`HTTP://${uri.toUpperCase()}/`);
  }
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
      <h1 onClick={() => console.log(country.BlockedMapping.get("HTTP://".toUpperCase()))}>test data</h1>
      <div className="container mx-auto">
        <h4 className="mt-4 mb-2 text-4xl">TOP 5 GLOBAL SITES</h4>
        <div className="flex">
          <WebsiteEntry website={"https://www.google.com/"} blocked={webBlocked("google.com")} websiteIcon={google} className="mr-6" />
          <WebsiteEntry website={"https://www.youtube.com/"} blocked={webBlocked("youtube.com")} websiteIcon={youtube} className="mr-6" />
          <WebsiteEntry website={"https://www.facebook.com/"} blocked={webBlocked("facebook.com")} websiteIcon={facebook} className="mr-6" />
          <WebsiteEntry website={"https://www.twitter.com/"} blocked={webBlocked("twitter.com")} websiteIcon={twitter} className="mr-6" />
          <WebsiteEntry website={"https://www.instagram.com/"} blocked={webBlocked("instagram.com")} websiteIcon={instagram} />
        </div>
        <h4 className="mt-4 mb-2 text-4xl">BLOCKED TOP 100 SITES</h4>
        <div>
          <div className="flex">
            <WebsiteEntry website={"https://www.google.com/"} blocked={webBlocked("google.com")} websiteIcon={google} className="mr-6" />
            <WebsiteEntry website={"https://www.youtube.com/"} blocked={webBlocked("youtube.com")} websiteIcon={youtube} className="mr-6" />
            <WebsiteEntry website={"https://www.facebook.com/"} blocked={webBlocked("facebook.com")} websiteIcon={facebook} className="mr-6" />
            <WebsiteEntry website={"https://www.twitter.com/"} blocked={webBlocked("twitter.com")} websiteIcon={twitter} className="mr-6" />
            <WebsiteEntry website={"https://www.instagram.com/"} blocked={webBlocked("instagram.com")} websiteIcon={instagram} />
          </div>
          <div className="flex mt-4">
            <WebsiteEntry website={"https://www.google.com/"} blocked={webBlocked("google.com")} websiteIcon={google} className="mr-6" />
            <WebsiteEntry website={"https://www.youtube.com/"} blocked={webBlocked("youtube.com")} websiteIcon={youtube} className="mr-6" />
            <WebsiteEntry website={"https://www.facebook.com/"} blocked={webBlocked("facebook.com")} websiteIcon={facebook} className="mr-6" />
            <WebsiteEntry website={"https://www.twitter.com/"} blocked={webBlocked("twitter.com")} websiteIcon={twitter} className="mr-6" />
            <WebsiteEntry website={"https://www.instagram.com/"} blocked={webBlocked("instagram.com")} websiteIcon={instagram} />
          </div>
          <div className="inline-block bg-black text-white w-14 text-center my-2 mr-2 py-1 cursor-pointer">PREVIOUS</div>
          <div className="inline-block bg-black text-white w-14 text-center my-2 py-1 cursor-pointer">NEXT</div>
        </div>
      </div>
    </>
  );
}
export default styled(Country)`
`;