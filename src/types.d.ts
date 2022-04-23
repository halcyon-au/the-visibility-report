interface DefaultProps {
  className?: string;
}
interface SectionProps extends DefaultProps {
  sectionItems: string[];
}
interface TopBarOverride extends DefaultProps {
  overrideText?: string;
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
interface WebsiteEntryProps extends DefaultProps {
  blocked?: WebsiteStatus;
  website: string;
  websiteIcon?: string;
}
interface CountryEntryProps extends DefaultProps {
  blocked?: WebsiteStatus;
  country: string;
  countryFlag?: string;
}
interface WebsiteStatus {
  Blocked: boolean;
  Possible?: boolean;
  Unknown?: boolean;
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

interface WebsiteBlockedSectionProps extends DefaultProps {
  blocked: string[];

}
