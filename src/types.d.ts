interface DefaultProps {
  className?: string;
}
interface IndividualCountryProps extends DefaultProps {
  country: CountryRankingWBlocks
}
interface RankingProps extends DefaultProps {
  countryRank: CountryRanking;
  number: number;
}
interface LandingProps extends DefaultProps {
  SEARCH_MODE?: "Country" | "Site"
}
interface OONICountry {
  alpha_2: string,
  count: number,
  name: string
}
interface CountryRanking {
  CountryName: string;
  Score: number;
  Ranking: number;
}
interface WebsiteEntry extends DefaultProps {
  blocked?: WebsiteStatus;
  website: string;
  websiteIcon?: string;
}
interface WebsiteStatus {
  Blocked: boolean;
  Possible?: boolean;
}
interface CountryRankingWBlocks {
  CountryName: string;
  Score: number;
  Ranking: number;
  BlockedWebsites: string[];
  BlockedMapping: Map<string, WebsiteStatus>;
  UnblockedWebsites: string[];
  PossibleWebsites: string[];
  Websites: string[];
}