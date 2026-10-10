
export const PARTNER_OPTIONS = [
  { value: 1, label: "Fortune 8(demo)" },
  { value: 2, label: "GameZone" },
  { value: 3, label: "Palms Bet" },
];

// used in Generate License Key (checkboxes)
export const GAME_PROVIDERS = [
  { id: "EVO", name: "EVO GAMES", checked: false },
  { id: "LION", name: "LION DRAGON GAMES", checked: false },
  { id: "CT", name: "CT GAMES", checked: false },
  { id: "TWOYC", name: "TWOYC GAMES", checked: false },
  { id: "YGT", name: "YGT GAMES", checked: false },
  { id: "JDB", name: "JDB GAMES", checked: false },
  { id: "MACAW", name: "MACAW GAMES", checked: false },
  { id: "TINYREX", name: "TINYREX GAMES", checked: false },
  { id: "FFSTARS", name: "FFSTARS GAMES", checked: false },
];

export const GAME_CATEGORIES = [
  { value: 1, label: 'Slot' },
  { value: 2, label: 'Table' },
  { value: 3, label: 'Instant' },
  { value: 4, label: 'Action' },
  { value: 5, label: 'Puzzles' },
  { value: 6, label: 'Arcade' },
];

// used in Generate License Key (checkboxes)
export const PAYMENT_PROVIDERS = [
  { id: "PAYPAL", name: "PAYPAL", checked: false },
  { id: "CREDIT_CARD", name: "CREDIT CARD", checked: false },
  { id: "BITPACE", name: "BITPACE", checked: false },
  { id: "GOOGLE_PAY", name: "GOOGLE PAY", checked: false },
  { id: "BRAINTREE", name: "BRAINTREE", checked: false },
  { id: "APCOPAY", name: "APCO PAY", checked: false },
];

export const STATUS_OPTIONS = [
  { value: "Completed", label: "Completed" },
  { value: "Pending", label: "Incomplete" },
  { value: "Failed", label: "Failed" },
];

export const STATUS = [
  { value: 1, label: "ACTIVE" },
  { value: 0, label: "DEACTIVATED" },
];

export const ACCOUNT_TYPE = [
  { value: 2, label: "DEVELOPER" },
  { value: 3, label: "OWNER" },
  { value: 4, label: "ADMINISTRATOR" },
  { value: 5, label: "GENERAL" },
  { value: 6, label: "GAME PROVIDER" },
];

export const ACCOUNT_TYPE_OPTIONS_PER_USERTYPE = {
  2: [
    { value: 2, label: "DEVELOPER" },
    { value: 3, label: "OWNER" },
    { value: 4, label: "ADMINISTRATOR" },
    { value: 5, label: "GENERAL" },
  ],
  3: [
    { value: 4, label: "ADMINISTRATOR" },
    { value: 5, label: "GENERAL" },
  ],
  4: [
    { value: 4, label: "ADMINISTRATOR" },
    { value: 5, label: "GENERAL" },
  ],
  5: [],
};

export const ACCOUNT_TYPE_OPTIONS = [
  { value: 1, label: "PLAYER" },
  { value: 2, label: "DEVELOPER" },
  { value: 3, label: "OWNER" },
  { value: 4, label: "ADMINISTRATOR" },
  { value: 5, label: "GENERAL" },
  { value: 6, label: "GAME PROVIDER" },
];

export const GENDER = [
  { value: 1, label: "MALE" },
  { value: 2, label: "FEMALE" },
  { value: 3, label: "OTHER" },
];

export const PAYMENTS = [
  { value: 1, label: "Paypal Web" },
  { value: 2, label: "CreditCard Web" },
  { value: 3, label: "Bitpace Web" },
  { value: 4, label: "Bitpace App" },
  { value: 5, label: "Google Pay" },
  { value: 6, label: "Braintree Paypal" },
  { value: 7, label: "Braintree CreditCard" },
  { value: 8, label: "Apcopay CreditCard" },
  { value: 9, label: "Tierlock" },
  { value: 10, label: "Inovio" },
  { value: 101, label: "Point" },
  { value: 102, label: "PalmsBet Wallet" },
];

export const COUNTRIES = [
  { value: 1, label: "Afghanistan" },
  { value: 2, label: "Albania" },
  { value: 3, label: "Algeria" },
  { value: 4, label: "Andorra" },
  { value: 5, label: "Angola" },
  { value: 6, label: "Antigua" },
  { value: 7, label: "Argentina" },
  { value: 8, label: "Armenia" },
  { value: 9, label: "Australia" },
  { value: 10, label: "Austria" },
  { value: 11, label: "Azerbaijan" },
  { value: 12, label: "Bahamas" },
  { value: 13, label: "Bahrain" },
  { value: 14, label: "Bangladesh" },
  { value: 15, label: "Barbados" },
  { value: 16, label: "Belarus" },
  { value: 17, label: "Belgium" },
  { value: 18, label: "Belize" },
  { value: 19, label: "Benin" },
  { value: 20, label: "Bhutan" },
  { value: 21, label: "Bolivia" },
  { value: 22, label: "Bosnia" },
  { value: 23, label: "Botswana" },
  { value: 24, label: "Brazil" },
  { value: 25, label: "Brunei" },
  { value: 26, label: "Bulgaria" },
  { value: 27, label: "Burkina" },
  { value: 28, label: "Burundi" },
  { value: 29, label: "Cabo Verde" },
  { value: 30, label: "Cambodia" },
  { value: 31, label: "Cameroon" },
  { value: 32, label: "Canada" },
  { value: 33, label: "Central African" },
  { value: 34, label: "Chad" },
  { value: 35, label: "Chile" },
  { value: 36, label: "China" },
  { value: 37, label: "Colombia" },
  { value: 38, label: "Comoros" },
  { value: 39, label: "Congo" },
  { value: 40, label: "Cook Islands" },
  { value: 41, label: "Costa Rica" },
  { value: 42, label: "Côte d'Ivoire" },
  { value: 43, label: "Croatia" },
  { value: 44, label: "Cuba" },
  { value: 45, label: "Cyprus" },
  { value: 46, label: "Czechia" },
  { value: 47, label: "Democratic People's Republic of Korea" },
  { value: 48, label: "Democratic Republic of the Congo" },
  { value: 49, label: "Denmark" },
  { value: 50, label: "Djibouti" },
  { value: 51, label: "Dominica" },
  { value: 52, label: "Dominican Republic" },
  { value: 53, label: "Ecuador" },
  { value: 54, label: "Egypt" },
  { value: 55, label: "El Salvador" },
  { value: 56, label: "Equatorial Guinea" },
  { value: 57, label: "Eritrea" },
  { value: 58, label: "Estonia" },
  { value: 59, label: "Eswatini" },
  { value: 60, label: "Ethiopia" },
  { value: 61, label: "Faroe Islands" },
  { value: 62, label: "Fiji" },
  { value: 63, label: "Finland" },
  { value: 64, label: "France" },
  { value: 65, label: "Gabon" },
  { value: 66, label: "Gambia" },
  { value: 67, label: "Georgia" },
  { value: 68, label: "Germany" },
  { value: 69, label: "Ghana" },
  { value: 70, label: "Greece" },
  { value: 71, label: "Grenada" },
  { value: 72, label: "Guatemala" },
  { value: 73, label: "Guinea" },
  { value: 74, label: "Guinea-Bissau" },
  { value: 75, label: "Guyana" },
  { value: 76, label: "Haiti" },
  { value: 77, label: "Honduras" },
  { value: 78, label: "Hungary" },
  { value: 79, label: "Iceland" },
  { value: 80, label: "India" },
  { value: 81, label: "Indonesia" },
  { value: 82, label: "Iran" },
  { value: 83, label: "Iraq" },
  { value: 84, label: "Ireland" },
  { value: 85, label: "Israel" },
  { value: 86, label: "Italy" },
  { value: 87, label: "Jamaica" },
  { value: 88, label: "Japan" },
  { value: 89, label: "Jordan" },
  { value: 90, label: "Kazakhstan" },
  { value: 91, label: "Kenya" },
  { value: 92, label: "Kiribati" },
  { value: 93, label: "Kuwait" },
  { value: 94, label: "Kyrgyzstan" },
  { value: 95, label: "Lao People's Democratic Republic" },
  { value: 96, label: "Latvia" },
  { value: 97, label: "Lebanon" },
  { value: 98, label: "Lesotho" },
  { value: 99, label: "Liberia" },
  { value: 100, label: "Libya" },
  { value: 101, label: "Lithuania" },
  { value: 102, label: "Luxembourg" },
  { value: 103, label: "Madagascar" },
  { value: 104, label: "Malawi" },
  { value: 105, label: "Malaysia" },
  { value: 106, label: "Maldives" },
  { value: 107, label: "Mali" },
  { value: 108, label: "Malta" },
  { value: 109, label: "Marshall Islands" },
  { value: 110, label: "Mauritania" },
  { value: 111, label: "Mauritius" },
  { value: 112, label: "Mexico" },
  { value: 113, label: "Micronesia (Federated States of)" },
  { value: 114, label: "Monaco" },
  { value: 115, label: "Mongolia" },
  { value: 116, label: "Montenegro" },
  { value: 117, label: "Morocco" },
  { value: 118, label: "Mozambique" },
  { value: 119, label: "Myanmar" },
  { value: 120, label: "Namibia" },
  { value: 121, label: "Nauru" },
  { value: 122, label: "Nepal" },
  { value: 123, label: "Netherlands" },
  { value: 124, label: "New Zealand" },
  { value: 125, label: "Nicaragua" },
  { value: 126, label: "Niger" },
  { value: 127, label: "Nigeria" },
  { value: 128, label: "Niue" },
  { value: 129, label: "North Macedonia" },
  { value: 130, label: "Norway" },
  { value: 131, label: "Oman" },
  { value: 132, label: "Pakistan" },
  { value: 133, label: "Palau" },
  { value: 134, label: "Panama" },
  { value: 135, label: "Papua New Guinea" },
  { value: 136, label: "ParaguayGuinea" },
  { value: 137, label: "Peru" },
  { value: 138, label: "Philippines" },
  { value: 139, label: "Poland" },
  { value: 140, label: "Portugal" },
  { value: 141, label: "Qatar" },
  { value: 142, label: "Republic of Korea" },
  { value: 143, label: "Republic of Moldova" },
  { value: 144, label: "Romania" },
  { value: 145, label: "Russian Federation" },
  { value: 146, label: "Rwanda" },
  { value: 147, label: "Saint Kitts" },
  { value: 148, label: "Saint Lucia" },
  { value: 149, label: "Saint Vincent and the Grenadines" },
  { value: 150, label: "Samoa" },
  { value: 151, label: "San Marino" },
  { value: 152, label: "Sao Tome and Principe" },
  { value: 153, label: "Saudi Arabia" },
  { value: 154, label: "Senegal" },
  { value: 155, label: "Serbia" },
  { value: 156, label: "Seychelles" },
  { value: 157, label: "Sierra Leone" },
  { value: 158, label: "Singapore" },
  { value: 159, label: "Slovakia" },
  { value: 160, label: "Slovenia" },
  { value: 161, label: "Solomon Islands" },
  { value: 162, label: "Somalia" },
  { value: 163, label: "South Africa" },
  { value: 164, label: "South Sudan" },
  { value: 165, label: "Spain" },
  { value: 166, label: "Sri Lanka" },
  { value: 167, label: "Sudan" },
  { value: 168, label: "Suriname" },
  { value: 169, label: "Sweden" },
  { value: 170, label: "Switzerland" },
  { value: 171, label: "Syrian Arab Republic" },
  { value: 172, label: "Tajikistan" },
  { value: 173, label: "Thailand" },
  { value: 174, label: "Timor-Leste" },
  { value: 175, label: "Togo" },
  { value: 176, label: "Tokelau" },
  { value: 177, label: "Tonga" },
  { value: 178, label: "Trinidad and Tobago" },
  { value: 179, label: "Tunisia" },
  { value: 180, label: "Turkey" },
  { value: 181, label: "Turkmenistan" },
  { value: 182, label: "Tuvalu" },
  { value: 183, label: "Uganda" },
  { value: 184, label: "Ukraine" },
  { value: 185, label: "United Arab Emirates" },
  { value: 186, label: "United Kingdom of Great Britain and Northern Ireland" },
  { value: 187, label: "United Republic of Tanzania" },
  { value: 188, label: "United States of America" },
  { value: 189, label: "Uruguay" },
  { value: 190, label: "Uzbekistan" },
  { value: 191, label: "Vanuatu" },
  { value: 192, label: "Venezuela" },
  { value: 193, label: "Viet Nam" },
  { value: 194, label: "Yemen" },
  { value: 195, label: "Zambia" },
  { value: 196, label: "Zimbabwe" },
];

export const USSTATES = [
  {
      "value": 1,
      "code": "AL",
      "label": "Alabama"
  },
  {
      "value": 2,
      "code": "AK",
      "label": "Alaska"
  },
  {
      "value": 3,
      "code": "AS",
      "label": "American Samoa"
  },
  {
      "value": 4,
      "code": "AZ",
      "label": "Arizona"
  },
  {
      "value": 5,
      "code": "AR",
      "label": "Arkansas"
  },
  {
      "value": 6,
      "code": "CA",
      "label": "California"
  },
  {
      "value": 7,
      "code": "CO",
      "label": "Colorado"
  },
  {
      "value": 8,
      "code": "CT",
      "label": "Connecticut"
  },
  {
      "value": 9,
      "code": "DE",
      "label": "Delaware"
  },
  {
      "value": 10,
      "code": "DC",
      "label": "District Of Columbia"
  },
  {
      "value": 11,
      "code": "FL",
      "label": "Florida"
  },
  {
      "value": 12,
      "code": "GA",
      "label": "Georgia"
  },
  {
      "value": 13,
      "code": "GU",
      "label": "Guam"
  },
  {
      "value": 14,
      "code": "HI",
      "label": "Hawaii"
  },
  {
      "value": 15,
      "code": "ID",
      "label": "Idaho"
  },
  {
      "value": 16,
      "code": "IL",
      "label": "Illinois"
  },
  {
      "value": 17,
      "code": "IN",
      "label": "Indiana"
  },
  {
      "value": 18,
      "code": "IA",
      "label": "Iowa"
  },
  {
      "value": 19,
      "code": "KS",
      "label": "Kansas"
  },
  {
      "value": 20,
      "code": "KY",
      "label": "Kentucky"
  },
  {
      "value": 21,
      "code": "LA",
      "label": "Louisiana"
  },
  {
      "value": 22,
      "code": "ME",
      "label": "Maine"
  },
  {
      "value": 23,
      "code": "MD",
      "label": "Maryland"
  },
  {
      "value": 24,
      "code": "MA",
      "label": "Massachusetts"
  },
  {
      "value": 25,
      "code": "MI",
      "label": "Michigan"
  },
  {
      "value": 26,
      "code": "MN",
      "label": "Minnesota"
  },
  {
      "value": 27,
      "code": "MS",
      "label": "Mississippi"
  },
  {
      "value": 28,
      "code": "MO",
      "label": "Missouri"
  },
  {
      "value": 29,
      "code": "MT",
      "label": "Montana"
  },
  {
      "value": 30,
      "code": "NE",
      "label": "Nebraska"
  },
  {
      "value": 31,
      "code": "NV",
      "label": "Nevada"
  },
  {
      "value": 32,
      "code": "NH",
      "label": "New Hampshire"
  },
  {
      "value": 33,
      "code": "NJ",
      "label": "New Jersey"
  },
  {
      "value": 34,
      "code": "NM",
      "label": "New Mexico"
  },
  {
      "value": 35,
      "code": "NY",
      "label": "New York"
  },
  {
      "value": 36,
      "code": "NC",
      "label": "North Carolina"
  },
  {
      "value": 37,
      "code": "ND",
      "label": "North Dakota"
  },
  {
      "value": 38,
      "code": "MP",
      "label": "Northern Mariana Islands"
  },
  {
      "value": 39,
      "code": "OH",
      "label": "Ohio"
  },
  {
      "value": 40,
      "code": "OK",
      "label": "Oklahoma"
  },
  {
      "value": 41,
      "code": "OR",
      "label": "Oregon"
  },
  {
      "value": 42,
      "code": "PW",
      "label": "Palau"
  },
  {
      "value": 43,
      "code": "PA",
      "label": "Pennsylvania"
  },
  {
      "value": 44,
      "code": "PR",
      "label": "Puerto Rico"
  },
  {
      "value": 45,
      "code": "RI",
      "label": "Rhode Island"
  },
  {
      "value": 46,
      "code": "SC",
      "label": "South Carolina"
  },
  {
      "value": 47,
      "code": "SD",
      "label": "South Dakota"
  },
  {
      "value": 48,
      "code": "TN",
      "label": "Tennessee"
  },
  {
      "value": 49,
      "code": "TX",
      "label": "Texas"
  },
  {
      "value": 50,
      "code": "UT",
      "label": "Utah"
  },
  {
      "value": 51,
      "code": "VT",
      "label": "Vermont"
  },
  {
      "value": 52,
      "code": "VI",
      "label": "Virgin Islands"
  },
  {
      "value": 53,
      "code": "VA",
      "label": "Virginia"
  },
  {
      "value": 54,
      "code": "WA",
      "label": "Washington"
  },
  {
      "value": 55,
      "code": "WV",
      "label": "West Virginia"
  },
  {
      "value": 56,
      "code": "WI",
      "label": "Wisconsin"
  },
  {
      "value": 57,
      "code": "WY",
      "label": "Wyoming"
  }
];

export const REDEEM_TRANSACTIONS_STATUS_OPTIONS = [
  { value: 1, label: 'Request Submitted', disabled: true },
  { value: 2, label: 'Email verified', disabled: true },
  { value: 3, label: 'Review in progress' },
  { value: 4, label: 'Request approved' },
  { value: 5, label: 'Funded to User' },
  { value: 6, label: 'Request rejected' },
];

export const GAMBLY_REDEEM_TRANSACTIONS_STATUS_OPTIONS = [
  { value: "APPROVED", label: 'APPROVED' },
  { value: "REJECTED", label: 'REJECTED' },
];

export const GRAPH_PERIOD_OPTIONS = [
  { value: "DAILY", label: 'Daily' },
  { value: "THIS_WEEK", label: 'This week' },
  { value: "MONTHLY", label: 'Monthly' },
  { value: "YEARLY", label: 'Yearly' },
];

export const CODE_GENERATOR_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
  { value: "EXPIRED", label: "EXPIRED" },
  { value: "SCHEDULED", label: "SCHEDULED" },
];

export const COIN_TYPES_PB = [
  { value: 0, label: "ALL COINS" },
  { value: 1, label: "SILVER COINS" },
  { value: 2, label: "PALMS GOLD COINS" },
  { value: 3, label: "BONUS GOLD COINS" },
];

export const COIN_TYPES_F8 = [
  { value: 0, label: "ALL COINS" },
  { value: 1, label: "SILVER COINS" },
  { value: 2, label: "GWz GOLD COINS" },
  { value: 3, label: "BONUS GOLD COINS" },
];

export const COIN_TYPES_GAMBLY = [
  { value: 0, label: "ALL COINS" },
  { value: 1, label: "SILVER COINS" },
  { value: 2, label: "SWEEPS COINS" },
  { value: 3, label: "BONUS GOLD COINS" },
];

export const CURRENCY_TYPES = [
  { value: "ALL", label: "ALL" },
  { value: "SILVER", label: "SILVER" },
  { value: "GOLD", label: "GOLD" },
];

export const getCoinTypes = (partner: string) => {
  switch(partner){
    case "palmsplay":
      return COIN_TYPES_PB;
    case "fortune8":
    case "gamezone":
    case "palmssport":
    case "gambly":
      return COIN_TYPES_GAMBLY;
    default:
      return COIN_TYPES_F8;
  }
};

export const getObjectCoinType = (partner: string) => {
  const array: any = getCurrencyTypes(partner);
  return array.reduce((obj: any, item: any) => {
    obj[item.value] = item.label;
    return obj;
  }, {});
};

export const getCurrencyTypes = (partner: string) => {
  switch(partner){
    case "palmsplay":
      return [
        { value: 1, label: 'Silver' },
        { value: 2, label: 'Palms Gold' },
        { value: 3, label: 'Bonus Gold' },
      ];
    case "gambly":
      return [
        { value: 1, label: 'Silver' },
        { value: 2, label: 'Sweeps Coins' },
        { value: 3, label: 'Bonus Gold' },
      ];
    case "fortune8":
    case "gamezone":
    case "palmssport":
    default:
      return [
        { value: 1, label: 'Silver' },
        { value: 2, label: 'GWz Gold' },
        { value: 3, label: 'Gold Bonus' },
      ];
  }
};

export const getTierLevels = (partner: string) => {
  switch(partner){
    case "palmsplay":
    case "gamezone":
    case "palmssport":
    default:
      return [
        { value: 1, label: 'Copper' },
        { value: 2, label: 'Bronze' },
        { value: 3, label: 'Silver' },
        { value: 4, label: 'Gold' },
      ];
    case "fortune8":
      return [
        { value: 1, label: 'Sapphire' },
        { value: 2, label: 'Emerald' },
        { value: 3, label: 'Ruby' },
        { value: 4, label: 'Diamond' },
      ];
  }
};


