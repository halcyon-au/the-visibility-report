import styled from "@emotion/styled";
import { CountryScore } from "../../useApiClient/ApiClient.generated";

interface RankingProps extends DefaultProps {
  countryRank: CountryScore;
  number: number;
}

function Ranking(props: RankingProps) {
  const { countryRank, number } = props;
  return (
    <div id="ranking" className="mb-8">
      <div className="px-2">
        <h6 className="text-stone-400 mb-0">#{number}</h6>
        <div className="flex justify-between">
          <h4 className="text-4xl ">{countryRank.countryName}</h4>
          <h5 className="text-stone-500">{countryRank.score}</h5>
        </div>
      </div>
      {number === 2 ?
        <div className="w-full bg-stone-600 h-6 mt-6" /> :
        number === 1 ?
          <div className="w-full bg-black h-12" /> :
          number === 3 ?
            <div className="w-full bg-stone-600 h-3 mt-9" />
            : <></>
      }
    </div>
  );
}
export default styled(Ranking)`
`;
