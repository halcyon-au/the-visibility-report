import styled from "@emotion/styled";
import { useRankings } from "../api/hooks";
import Ranking from "../components/countriesranked/Ranking";
import TopBar from "../components/countriesranked/TopBar";

function CountriesRanked() {
  const { loading, data } = useRankings();
  return (
    <>
      <TopBar />
      <div id="container" className="container mx-auto">
        <h3 className="text-3xl mt-8 mb-4">COUNTRIES WITH THE LEAST BLOCKS ON CONTENT</h3>
        <p>
          Countries here are scored based on the amount of limits they have placed on content.<br />
          There are many other factors to consider that affect the freedom of the internet.
        </p>
        { /* TODO: remove */}
        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        {!loading ?
          <div id="rankings" className="grid grid-cols-3">
            <Ranking key={data![1].CountryName} countryRank={data![1]} number={2} />
            <Ranking key={data![0].CountryName} countryRank={data![0]} number={1} />
            <Ranking key={data![2].CountryName} countryRank={data![2]} number={3} />
            {data!.slice(3).map((ranking, idx) => (
              <Ranking key={ranking.CountryName} countryRank={ranking} number={idx + 4} />
            ))}
          </div> : <>
            TODO: Loading Indicator
          </>
        }
        {/* eslint-enable @typescript-eslint/no-non-null-assertion */}
      </div>
    </>
  );
}
export default styled(CountriesRanked)`
`;
