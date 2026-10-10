import Config from "@src/utils/api/config";


export const fileName = (url: string) => {
  const decoded = decodeURI(url);

  // eslint-disable-next-line no-useless-escape
  return decoded.replace(/^.*(\\|\/|\:)/, "");
};

const f8Tier: any = {
  1: "Sapphire",
  2: "Emerald",
  3: "Ruby",
  4: "Diamond",
};

const gzTier: any = {
  1: "Copper",
  2: "Bronze",
  3: "Silver",
  4: "Gold",
};

const ppTier: any = {
  1: "Copper",
  2: "Bronze",
  3: "Silver",
  4: "Gold",
}

export const tierName = (value: number) => {
  switch(Config.PARTNER_ID){
    case "1":
      return f8Tier[value];
    case "2":
      return gzTier[value];
    case "3":
      return ppTier[value];
    case "4":
      return ppTier[value];
    default:
      return ppTier[value];
  }
};

// OPEN LINK TO NEW TAB
export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}