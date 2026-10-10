export const TABLE_HEAD_USERS = [
  { id: "id", label: "User ID", sortable: true },
  { id: "firstName", label: "Name", sortable: true },
  { id: "emailAddress", label: "Email", sortable: true },
  { id: "displayName", label: "Display Name", sortable: true },
  { id: "SILVER", label: "Silver Balance" },
  { id: "GOLD", label: "GWz Gold" },
  { id: "GOLD BONUS", label: "Gold Balance" },
  { id: "enrollmentDate", label: "Date Created", sortable: true },
  { id: "isDeleted", label: "Status", sortable: true },
  { id: "isVerified", label: "Verified", sortable: true },
  { id: "" },
];

export const TABLE_HEAD_USERS_GAMBLY = [
  { id: "id", label: "User ID", sortable: true },
  { id: "firstName", label: "Name", sortable: true },
  { id: "emailAddress", label: "Email", sortable: true },
  { id: "displayName", label: "Display Name", sortable: true },
  { id: "SILVER", label: "Silver Balance" },
  { id: "GOLD", label: "SC Balance" },
  { id: "GOLD BONUS", label: "B-Gold Balance" },
  { id: "enrollmentDate", label: "Date Created", sortable: true },
  { id: "kycStatus", label: "KYC Verification Status", sortable: true },
  { id: "isDeleted", label: "Status", sortable: true },
  { id: "isVerified", label: "Verified", sortable: true },
  { id: "" },
];

export const TABLE_HEAD_ACTIVE_USERS = [
  { id: "id", label: "User ID", sortable: true },
  { id: "displayName", label: "Display Name", sortable: true },
  { id: "loginDate", label: "Log In Date", sortable: false },
  { id: "loginTime", label: "Log In Time", sortable: false },
  { id: "logoutTime", label: "Log Out Time", sortable: false },
];

export const TABLE_HEAD_USERS_PALMSPLAY = [
  { id: "id", label: "User ID", sortable: true },
  { id: "displayName", label: "Display Name", sortable: true },
  { id: "emailAddress", label: "Email", sortable: true },
  { id: "SILVER", label: "Silver Balance" },
  { id: "GOLD", label: "Palms Gold" },
  { id: "GOLD BONUS", label: "Bonus Gold" },
  { id: "enrollmentDate", label: "Date Created", sortable: true },
  { id: "isDeleted", label: "Status", sortable: true },
  { id: "" },
];

export const TABLE_HEAD_MANAGE_TEAM = [
  { id: "id", label: "User ID", sortable: true },
  { id: "firstName", label: "User Name", sortable: true },
  { id: "emailAddress", label: "Email Address", sortable: true },
  { id: "jobTitle", label: "Title", sortable: false },
  { id: "userTypeID", label: "Access", sortable: true },
  { id: "isDeleted", label: "Status", sortable: true },
  { id: "" },
];

export const TABLE_HEAD_MANAGE_PARTNERS = [
  { id: "partnerName", label: "Name", sortable: true },
  { id: "licenseKey", label: "Key" },
  { id: "createdDate", label: "Created", sortable: true },
  { id: "expiryDate", label: "Expiry" },
  { id: "isActive", label: "Status", sortable: true },
  { id: "activatedIP", label: "Activated IP" },
  { id: "" },
];

export const TABLE_HEAD_MANAGE_LICENSES = [
  { id: "id", label: "ID" },
  { id: "licenseKey", label: "Key" },
  { id: "partnerName", label: "Partner" },
  { id: "createdDate", label: "Created", sortable: true },
  { id: "expiryDate", label: "Expiry" },
  { id: "status", label: "Status", sortable: true },
];

export const TABLE_HEAD_GAMES = [
  { id: "gameName", label: "Game Name", highlight: true, sortable: true },
  { id: "gameTypeID", label: "Provider", sortable: true },
  { id: "sequence", label: "Sequence", sortable: true },
  { id: "gameCategoryID", label: "Game Category", sortable: true },
  { id: "code", label: "Code", sortable: true },
  { id: "tierID", label: "Tier ID", sortable: true },
  { id: "isActive", label: "Status", sortable: true },
  { id: "isTop", label: "Top Game" },
  { id: "isGoldAllow", label: "Gold Enable" },
  { id: "enrollmentDate", label: "Created At", sortable: true },
  { id: "lastModifiedDate", label: "Updated At", sortable: true },
  { id: "  " },
];

export const TABLE_HEAD_PURCHASE = [
  { id: "userID", label: "User ID", alignRight: false, sortable: true },
  { id: "u.displayName", label: "Display Name", alignRight: false, sortable: true },
  { id: "purchaseItemName", label: "Item Name", alignRight: false, sortable: true },
  { id: "paymentTypeID", label: "Payment Type", alignRight: false, sortable: false },
  { id: "amount", label: "Amount", alignRight: false, sortable: true },
  { id: "status", label: "Status", alignRight: false, sortable: true },
  { id: "transactionDate", label: "Transaction Date", alignRight: false, sortable: true },
];

//
export const TABLE_HEAD_MONTHLY_PALMS_POINT = [
  { id: "year", label: "Year", alignRight: false, sortable: true },
  { id: "monthName", label: "Month", alignRight: false, sortable: true },
  { id: "totalAmount", label: "Total Palms Points", alignRight: false, sortable: true },
  { id: "actions", label: "", alignRight: false, sortable: true },
];

export const TABLE_HEAD_MONTHLY_PURCHASE = [
  { id: "year", label: "Year", alignRight: false, sortable: true },
  { id: "monthName", label: "Month", alignRight: false, sortable: true },
  { id: "totalAmount", label: "Total Amount", alignRight: false, sortable: true },
  { id: "actions", label: "", alignRight: false, sortable: true },
];

export const TABLE_HEAD_MOST_PLAYED = [
  { id: "provider", label: "Provider", alignRight: false, sortable: false },
  { id: "gameName", label: "Game", alignRight: false, sortable: true },
  { id: "id", label: "Game ID", alignRight: false, sortable: false },
  { id: "totalPlayers", label: "Total Players", alignRight: false, sortable: true },
  { id: "totalSilverBet", label: "Total Silver Bet", alignRight: false, sortable: true },
  { id: "totalGoldBet", label: "Total Gold Bet", alignRight: false, sortable: true },
  { id: "" },
];

export const TABLE_HEAD_GAME_HISTORY = [
  { id: "gameID", label: "Game ID", alignRight: false },
  { id: "gameName", label: "Game Name", alignRight: false },
  { id: "userId", label: "User ID", alignRight: false },
  { id: "roundID", label: "Round ID", alignRight: false },
  { id: "callbackActionType", label: "Action Type", alignRight: false },
  { id: "currency", label: "Currency", alignRight: false },
  { id: "totalBet", label: "Total Bet", alignRight: false },
  { id: "totalWin", label: "Total Win", alignRight: false },
  { id: "createdDate", label: "Date Played", alignRight: false },
];

export const TABLE_HEAD_COIN_HISTORY = [
  { id: "id", label: "ID", alignRight: false },
  { id: "coinTypeId", label: "Coin Type", alignRight: false },
  { id: "description", label: "Transaction", alignRight: false },
  { id: "amount", label: "Amount", alignRight: false },
  { id: "balanceBefore", label: "Balance Before", alignRight: false },
  { id: "balanceAfter", label: "Balance After", alignRight: false },
  { id: "enrollmentDate", label: "Date Created", alignRight: false },
];

export const TABLE_HEAD_REDEEM_TRANSACTION = [
  { id: "id", label: "ID", sortable: true },
  { id: "userID", label: "User ID", sortable: true },
  { id: "redeemTypeID", label: "Redeem Type", sortable: true },
  { id: "redeemStatusID", label: "Redeem Status", sortable: true },
  { id: "goldAmount", label: "Gold Amount", sortable: true },
  { id: "requestDate", label: "Request Date", sortable: true },
  { id: "" },
];

export const TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_REDEMPTION = [
  { id: "userID", label: "User ID", sortable: true },
  { id: "u.displayName", label: "User Name", sortable: true },
  { id: "goldAmount", label: "SC Amount", sortable: true },
  { id: "redeemTypeID", label: "Service Type", sortable: true },
  { id: "requestDate", label: "Request Date", sortable: true },
  { id: "id", label: "Transaction ID", align: "center", sortable: true },
  { id: "", label: "Status", sortable: false },
  { id: "" },
];

export const TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_PROCESSING_REDEMPTION = [
  { id: "userID", label: "User ID", sortable: true },
  { id: "u.displayName", label: "User Name", sortable: true },
  { id: "goldAmount", label: "SC Amount", sortable: true },
  { id: "redeemTypeID", label: "Service Type", sortable: true },
  { id: "requestDate", label: "Request Date", sortable: true },
  { id: "id", label: "Transaction ID", align: "center", sortable: true },
  { id: "lastUpdatedTime", label: "Last Updated", sortable: true },
  { id: "", label: "Status", sortable: false },
  { id: "" },
];

export const TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_PENDING_REDEMPTION = [
  { id: "userID", label: "User ID", sortable: true },
  { id: "u.displayName", label: "User Name", sortable: true },
  { id: "goldAmount", label: "SC Amount", sortable: true },
  { id: "redeemTypeID", label: "Service Type", sortable: true },
  { id: "requestDate", label: "Request Date", sortable: true },
  { id: "id", label: "Transaction ID", align: "center", sortable: true },
  { id: "", label: "Actions", sortable: false },
  { id: "" },
];

export const TABLE_HEAD_REDEEM_TRANSACTION_GAMBLY_EXCHANGE = [
  { id: "userID", label: "User ID", sortable: true },
  { id: "u.displayName", label: "User Name", sortable: true },
  { id: "goldAmount", label: "SC Amount", sortable: true },
  { id: "redeemTypeID", label: "Transaction Type", sortable: true },
  { id: "creditAmount", label: "Silver Coin", sortable: true },
  { id: "requestDate", label: "Request Date", sortable: true },
  { id: "redeemStatusID", label: "Status", sortable: true },
];

export const TABLE_HEAD_IN_MAIL_PORTAL = [
  { id: "subject", label: "Mail List", align: "left" },
  { id: "isActive", label: "Status", align: "center" },
  { id: "readCount", label: "Open Rate", align: "center" },
  { id: "purchaseCount", label: "Purchases", align: "center" },
];

export const TABLE_HEAD_IN_MAIL_PORTAL_GAMBLY = [
  { id: "subject", label: "Mail List", align: "left" },
  { id: "isActive", label: "Status", align: "center" },
  { id: "ctaClickCount", label: "Click Rate", align: "center" },
  { id: "purchaseCount", label: "Purchases", align: "center" },
];

export const TABLE_HEAD_MISSIONS_PORTAL = [
  { id: "name", label: "Missions List", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "settings", label: "Settings", align: "center" },
];

export const TABLE_HEAD_REDEEM_TRANSACTION_PALMSPLAY = [
  { id: "userID", label: "User ID", sortable: true },
  { id: "u.displayName", label: "User Name", sortable: true },
  { id: "goldAmount", label: "Amount PG", align: "center", sortable: true },
  { id: "requestDate", label: "Transaction Date", align: "center", sortable: true },
];

export const TABLE_HEAD_CODE_GENERATOR = [
  { id: "name", label: "Promo Name", sortable: true },
  { id: "type", label: "Type", sortable: true },
  { id: "startAt", label: "Date Active", sortable: true },
  { id: "claimCount", label: "User Engagement", sortable: true },
  { id: "accessCount", label: "Clicks", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "" },
  { id: "" },
];

export const TABLE_HEAD_REVENUE_PROGRAM = [
  { id: "providerName", label: "Provider Name", alignRight: false, tableCellSx: { textAlign: "left" } },
  { id: "revenueSharePercent", label: "Current % Share", alignRight: false },
  { id: "updatedRevenueSharePercent", label: "Update % Share", alignRight: false },
  { id: "" },
]

export const TABLE_HEAD_USER_CLIAM_PROMO = [
  { id: "u.id", label: "User ID", alignRight: false, sortable: false },
  { id: "u.emailAddress", label: "Email Address", alignRight: false, sortable: false },
  { id: "claimedAt", label: "Date Claimed", alignRight: false, sortable: false },
];

// MISSION DATA
export const TABLE_HEAD_MISSION_ACTIVITY_TRACKER = [
  { id: "name", label: "Mission List", sortable: true },
  { id: "completionCount", label: "Completions", align: "center", sortable: false },
];

export const TABLE_HEAD_MISSION_ACTIVITY = [
  { id: "userId", label: "User ID", alignRight: false, sortable: true },
  { id: "displayName", label: "Display Name", alignRight: false, sortable: false },
  { id: "lastRewardClaimedAt", label: "Date Completed", align: "center", sortable: true },
  { id: "rewardClaimedCount", label: "Total Missions Completed", align: "center", sortable: true },
];


// GOLD SHOP DATA
export const TABLE_HEAD_GOLD_SHOP_DATA = [
  { id: "name", label: "Package Name", sortable: true },
  { id: "description", label: "Description", align: "center", sortable: true },
  { id: "purchaseCount", label: "Total Purchased", align: "center", sortable: true },
];

export const TABLE_HEAD_PURCHASING_USER = [
  { id: "userId", label: "User ID", alignRight: false, sortable: true },
  { id: "displayName", label: "Display Name", alignRight: false, sortable: false },
  { id: "transactionDate", label: "Date", align: "center", sortable: true },
  { id: "name", label: "Package Name", align: "center", sortable: false },
];

export const TABLE_HEAD_SHOP_DATA_PURCHASING_USER = [
  { id: "userID", label: "User ID", alignRight: false, sortable: true },
  { id: "displayName", label: "Display Name", alignRight: false, sortable: false },
  { id: "transactionDate", label: "Date", align: "center", sortable: true },
  { id: "purchasedItemDescription", label: "Package Name", align: "center", sortable: false },
];

// GOLD PROMOTIONS DATA
export const TABLE_HEAD_PROMOTIONS_DATA = [
  { id: "description", label: "Package Name", sortable: true },
  { id: "name", label: "Package Code", align: "center", sortable: true },
  { id: "purchaseCount", label: "Total Purchases", align: "center", sortable: true },
  { id: "", label: "", alignRight: false,align: "center", sortable: true },
];

export const TABLE_HEAD_PROMOTION_PURCHASE_RECORDS = [
  { id: "userId", label: "User ID", alignRight: false, sortable: true },
  { id: "displayName", label: "User Name", alignRight: false, sortable: false },
  { id: "emailAddress", label: "Email", align: "center", sortable: false },
  { id: "transactionDate", label: "Date of Purchase", align: "center", sortable: false },
];

// WEEKLY LEADERBOARD RANKING
export const TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_SILVER = [
  { id: "u.id", label: "USER ID", sortable: false },
  { id: "u.displayName", label: "DISPLAY NAME", sortable: false },
  { id: "rank", label: "RANK", sortable: true },
  { id: "totalScore", label: "SILVER SCORE", sortable: false },
  { id: "lastModifiedDate", label: "END DATE", sortable: false },
];

export const TABLE_HEAD_WEEKLY_LEADERBOARD_RANKING_GOLD = [
  { id: "u.id", label: "USER ID", sortable: false },
  { id: "u.displayName", label: "DISPLAY NAME", sortable: false },
  { id: "rank", label: "RANK", sortable: true },
  { id: "totalScore", label: "GOLD SCORE", sortable: false },
  { id: "lastModifiedDate", label: "END DATE", sortable: false },
];