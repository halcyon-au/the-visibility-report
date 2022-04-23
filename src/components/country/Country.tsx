import styled from "@emotion/styled";
import countryToFlagJSON from "../../api/countrytoflag.json";
import WebsiteEntry from "./WebsiteEntry";
import { accuweather, amazon, baidu, bbc, bilibili, bing, discord, docomo, duckduckgo, ebay, facebook, fandom, globo, google, instagram, linkedin, mailru, microsoft, miguvideo, msn, naver, netflix, office365, outlook, pinterest, pornhub, powerlanguage, qq, reddit, roblox, samsung, tiktok, twitch, twitter, vk, weather, whatsapp, wikipedia, xhamster, xvideos, yahoo, yandex, youtube, zoom } from "../../assets/img/Icons";
import { useState } from "react";
import { CountryScoreWBlocked } from "../../useApiClient/ApiClient.generated";
interface IndividualCountryProps extends DefaultProps {
  country: CountryScoreWBlocked;
  blockedMapping: Map<string, WebsiteStatus>;
}

function Country(props: IndividualCountryProps) {
  const { country, className, blockedMapping } = props;
  const [topFiftyPage, setTopFiftyPage] = useState(1);
  function webBlocked(uri: string) {
    return blockedMapping.get(`HTTPS://${uri.toUpperCase()}`) || blockedMapping.get(`HTTPS://WWW.${uri.toUpperCase()}`) || blockedMapping.get(`HTTPS://WWW.${uri.toUpperCase()}/`) || blockedMapping.get(`HTTPS://${uri.toUpperCase()}/`)
      || blockedMapping.get(`HTTP://${uri.toUpperCase()}`) || blockedMapping.get(`HTTP://WWW.${uri.toUpperCase()}`) || blockedMapping.get(`HTTP://WWW.${uri.toUpperCase()}/`) || blockedMapping.get(`HTTP://${uri.toUpperCase()}/`);
  }

  return (
    <div className={className}>
      {country ? <>
        <header className="bg-black py-6">
          <div className="container mx-auto">
            <div className="flex">
              <div className="flex-1">
                <h1 className="text-white text-4xl mb-3">THE VISIBILITY REPORT</h1>
                <div className="flex">
                  <h2 className="text-white text-6xl mt-1 mr-12">{country.countryName}</h2>
                  <img src={(countryToFlagJSON as any)[country.countryName!]?.image} alt={country.countryName} className="w-20" />
                </div>
              </div>
              <div className="flex justify-center items-center text-8xl">
                <h3 className="text-white">#{country.ranking}</h3>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto pb-4">
          <h4 className="mt-4 mb-2 text-4xl">TOP 5 GLOBAL SITES</h4>
          <div className="grid grid-cols-5 gap-3">
            <WebsiteEntry website={"https://www.google.com/"} blocked={webBlocked("google.com")} websiteIcon={google} />
            <WebsiteEntry website={"https://www.youtube.com/"} blocked={webBlocked("youtube.com")} websiteIcon={youtube} />
            <WebsiteEntry website={"https://www.facebook.com/"} blocked={webBlocked("facebook.com")} websiteIcon={facebook} />
            <WebsiteEntry website={"https://www.twitter.com/"} blocked={webBlocked("twitter.com")} websiteIcon={twitter} />
            <WebsiteEntry website={"https://www.instagram.com/"} blocked={webBlocked("instagram.com")} websiteIcon={instagram} />
          </div>
          <h4 className="mt-4 mb-2 text-4xl">TOP 50 GLOBAL SITES</h4>
          <div>
            <div className="grid grid-cols-5 gap-3">
              {topFiftyPage === 1 ? <>
                <WebsiteEntry website={"https://www.google.com/"} blocked={webBlocked("google.com")} websiteIcon={google} />
                <WebsiteEntry website={"https://www.youtube.com/"} blocked={webBlocked("youtube.com")} websiteIcon={youtube} />
                <WebsiteEntry website={"https://www.facebook.com/"} blocked={webBlocked("facebook.com")} websiteIcon={facebook} />
                <WebsiteEntry website={"https://www.twitter.com/"} blocked={webBlocked("twitter.com")} websiteIcon={twitter} />
                <WebsiteEntry website={"https://www.instagram.com/"} blocked={webBlocked("instagram.com")} websiteIcon={instagram} />
                <WebsiteEntry website={"baidu.com"} blocked={webBlocked("baidu.com")} websiteIcon={baidu} />
                <WebsiteEntry website={"wikipedia.org"} blocked={webBlocked("wikipedia.org")} websiteIcon={wikipedia} />
                <WebsiteEntry website={"yandex.ru"} blocked={webBlocked("yandex.ru")} websiteIcon={yandex} />
                <WebsiteEntry website={"yahoo.com"} blocked={webBlocked("yahoo.com")} websiteIcon={yahoo} />
                <WebsiteEntry website={"xvideos.com"} blocked={webBlocked("xvideos.com")} websiteIcon={xvideos} />
              </> :
                topFiftyPage === 2 ? <>
                  <WebsiteEntry website={"whatsapp.com"} blocked={webBlocked("whatsapp.com")} websiteIcon={whatsapp} />
                  <WebsiteEntry website={"xnxx.com"} blocked={webBlocked("xnxx.com")} websiteIcon={xvideos} />
                  <WebsiteEntry website={"amazon.com"} blocked={webBlocked("amazon.com")} websiteIcon={amazon} />
                  <WebsiteEntry website={"netflix.com"} blocked={webBlocked("netflix.com")} websiteIcon={netflix} />
                  <WebsiteEntry website={"yahoo.co.jp"} blocked={webBlocked("yahoo.co.jp")} websiteIcon={yahoo} />
                  <WebsiteEntry website={"live.com"} blocked={webBlocked("live.com")} websiteIcon={outlook} />
                  <WebsiteEntry website={"pornhub.com"} blocked={webBlocked("pornhub.com")} websiteIcon={pornhub} />
                  <WebsiteEntry website={"zoom.us"} blocked={webBlocked("zoom.us")} websiteIcon={zoom} />
                  <WebsiteEntry website={"office.com"} blocked={webBlocked("office.com")} websiteIcon={office365} />
                  <WebsiteEntry website={"reddit.com"} blocked={webBlocked("reddit.com")} websiteIcon={reddit} />
                </> : topFiftyPage === 3 ? <>
                  <WebsiteEntry website={"tiktok.com"} blocked={webBlocked("tiktok.com")} websiteIcon={tiktok} />
                  <WebsiteEntry website={"linkedin.com"} blocked={webBlocked("linkedin.com")} websiteIcon={linkedin} />
                  <WebsiteEntry website={"vk.com"} blocked={webBlocked("vk.com")} websiteIcon={vk} />
                  <WebsiteEntry website={"xhamster.com"} blocked={webBlocked("xhamster.com")} websiteIcon={xhamster} />
                  <WebsiteEntry website={"discord.com"} blocked={webBlocked("discord.com")} websiteIcon={discord} />
                  <WebsiteEntry website={"twitch.tv"} blocked={webBlocked("twitch.tv")} websiteIcon={twitch} />
                  <WebsiteEntry website={"naver.com"} blocked={webBlocked("naver.com")} websiteIcon={naver} />
                  <WebsiteEntry website={"bing.com"} blocked={webBlocked("bing.com")} websiteIcon={bing} />
                  <WebsiteEntry website={"bilibili.com"} blocked={webBlocked("bilibili.com")} websiteIcon={bilibili} />
                  <WebsiteEntry website={"mail.ru"} blocked={webBlocked("mail.ru")} websiteIcon={mailru} />
                </> : topFiftyPage === 4 ? <>
                  <WebsiteEntry website={"duckduckgo.com"} blocked={webBlocked("duckduckgo.com")} websiteIcon={duckduckgo} />
                  <WebsiteEntry website={"roblox.com"} blocked={webBlocked("roblox.com")} websiteIcon={roblox} />
                  <WebsiteEntry website={"microsoftonline.com"} blocked={webBlocked("microsoftonline.com")} websiteIcon={microsoft} />
                  <WebsiteEntry website={"microsoft.com"} blocked={webBlocked("microsoft.com")} websiteIcon={microsoft} />
                  <WebsiteEntry website={"pinterest.com"} blocked={webBlocked("pinterest.com")} websiteIcon={pinterest} />
                  <WebsiteEntry website={"samsung.com"} blocked={webBlocked("samsung.com")} websiteIcon={samsung} />
                  <WebsiteEntry website={"qq.com"} blocked={webBlocked("qq.com")} websiteIcon={qq} />
                  <WebsiteEntry website={"msn.com"} blocked={webBlocked("msn.com")} websiteIcon={msn} />
                  <WebsiteEntry website={"globo.com"} blocked={webBlocked("globo.com")} websiteIcon={globo} />
                  <WebsiteEntry website={"news.yahoo.co.jp"} blocked={webBlocked("news.yahoo.co.jp")} websiteIcon={yahoo} />
                </> : <>
                  <WebsiteEntry website={"google.com.br"} blocked={webBlocked("google.com.br")} websiteIcon={google} />
                  <WebsiteEntry website={"ebay.com"} blocked={webBlocked("ebay.com")} websiteIcon={ebay} />
                  <WebsiteEntry website={"fandom.com"} blocked={webBlocked("fandom.com")} websiteIcon={fandom} />
                  <WebsiteEntry website={"bbc.co.uk"} blocked={webBlocked("bbc.co.uk")} websiteIcon={bbc} />
                  <WebsiteEntry website={"miguvideo.com"} blocked={webBlocked("miguvideo.com")} websiteIcon={miguvideo} />
                  <WebsiteEntry website={"accuweather.com"} blocked={webBlocked("accuweather.com")} websiteIcon={accuweather} />
                  <WebsiteEntry website={"docomo.ne.jp"} blocked={webBlocked("docomo.ne.jp")} websiteIcon={docomo} />
                  <WebsiteEntry website={"realsrv.com"} blocked={webBlocked("realsrv.com")} />
                  <WebsiteEntry website={"powerlanguage.co.uk"} blocked={webBlocked("powerlanguage.co.uk")} websiteIcon={powerlanguage} />
                  <WebsiteEntry website={"weather.com"} blocked={webBlocked("weather.com")} websiteIcon={weather} />
                </>}
            </div>
            <p>PAGE {topFiftyPage}/5</p>
            <div className="inline-block bg-black text-white w-14 text-center my-2 mr-2 py-1 cursor-pointer" onClick={() => setTopFiftyPage(topFiftyPage - 1 > 0 ? topFiftyPage - 1 : 5)}>PREVIOUS</div>
            <div className="inline-block bg-black text-white w-14 text-center my-2 py-1 cursor-pointer" onClick={() => setTopFiftyPage(topFiftyPage + 1 < 6 ? topFiftyPage + 1 : 1)}>NEXT</div>
            <h4 className="mt-4 mb-2 text-4xl">ALL BLOCKED SITES</h4>
            <div className="grid grid-cols-5 gap-3 max-h-96 overflow-y-auto">
              {country.blockedWebsites?.map((website: string) =>
                <WebsiteEntry website={website} blocked={{ Blocked: true }} key={website} />
              )}
            </div>
          </div>
        </div>
      </> : <><button onClick={() => console.log(country)}>AAA</button></>}
    </div>
  );
}
export default styled(Country)`
`;
