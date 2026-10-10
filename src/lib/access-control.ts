import { Access } from "./types/access-control";

const developAccess: Access = {
    viewPartnerOption: {
        fortune8: true,
        gamezone: true,
        futurePlay: true,
    },
    dashboard: {
        allowViewPrograms: true,
        allowViewTotalGames: true,
        allowViewTotalUsers: true,
        allowViewTotalNewUsersMonthly: true,
        allowViewTotalNumberOfPurchases: true,
        allowViewMostPopularGame: true,
        allowViewEngagementGraph: true,
    },
    games: {
        allowDrawer: true,
        allowViewList: true,
        allowGameActivity: true,
        allowDataDisplay: true,
        allowViewGameInfo: true,
        allowUpdateGameInfo: true,
        allowUpdateGameThumbnail: true,
        allowExportGameData: true,
        allowUpdateTierLevel: true
    },
    users: {
        allowViewList: true,
        allowViewMore: true, // purchase, game, and coin histories
        allowUpdateUserDetails: true,
        allowUpdateUserBalance: true,
        allowUpdateTierLevel: true,
        allowDataDisplay: true, // widgets (total # of )
        allowDemoGraphs: true,
        allowExportUserData: true,
        allowCreateUser: true,
    },
    mostPlayed: {
        allowDrawer: false,
        allowViewList: true,
        allowEdit: true,
        allowGameActivity: true,
    },
    purchases: {
        allowViewList: true,
        allowExportPurchaseData: true
    },
    platformTools: {
        allowQuickViewData: true,
        allowMissions: true,
        allowMails: true,
    },
    marketingTools: {
        allowCodeGenerator: true,
    },
    controlPanel: {
        allowInviteUser: true,
        allowViewTeam: true,
        allowUpdateTeam: true,
        allowCreatePartner: true,
        allowGenerateLicenseKey: true,
        allowViewPartnersList: true,
        allowViewLicenseKeys: true,
    },
    settings: {
        allowViewDetails: true,
        allowUpdateBusinessDetails: true,
        allowUpdateLicenseKey: true,
        allowViewTermsAndConditions: true,
        allowViewPortalGuide: true,
        allowViewContactSupport: true,
    },
    portalUserProfile: {
        allowUpdateDetails: true,
    },
    revenueShare: {
        allowView: true,
        allowUpdate: false,
        allowGPR: false,
        allowPR: true,
        allowProviderSelection: true,
    },
    redeemTransactions: {
        allowView: true,
    },
};

const ownerPartnerAccess: Access = {
    viewPartnerOption: {
        fortune8: false,
        gamezone: false,
        futurePlay: false,
    },
    dashboard: {
        allowViewPrograms: true,
        allowViewTotalGames: true,
        allowViewTotalUsers: true,
        allowViewTotalNewUsersMonthly: true,
        allowViewTotalNumberOfPurchases: true,
        allowViewMostPopularGame: true,
        allowViewEngagementGraph: true,
    },
    games: {
        allowDrawer: true,
        allowViewList: true,
        allowGameActivity: true,
        allowDataDisplay: true,
        allowViewGameInfo: true,
        allowUpdateGameInfo: true,
        allowUpdateGameThumbnail: false,
        allowExportGameData: true,
        allowUpdateTierLevel: true
    },
    users: {
        allowViewList: true,
        allowViewMore: true, // purchase, game, and coin histories
        allowUpdateUserDetails: true,
        allowUpdateUserBalance: true,
        allowUpdateTierLevel: true,
        allowDataDisplay: true, // widgets (total # of )
        allowDemoGraphs: true,
        allowExportUserData: true,
        allowCreateUser: false,
    },
    mostPlayed: {
        allowDrawer: false,
        allowViewList: true,
        allowEdit: true,
        allowGameActivity: true,
    },
    purchases: {
        allowViewList: true,
        allowExportPurchaseData: true
    },
    platformTools: {
        allowQuickViewData: true,
        allowMissions: true,
        allowMails: true,
    },
    marketingTools: {
        allowCodeGenerator: true,
    },
    controlPanel: {
        allowInviteUser: true,
        allowViewTeam: true,
        allowUpdateTeam: true,
        allowCreatePartner: false,
        allowGenerateLicenseKey: false,
        allowViewPartnersList: false,
        allowViewLicenseKeys: false,
    },
    settings: {
        allowViewDetails: true,
        allowUpdateBusinessDetails: true,
        allowUpdateLicenseKey: true,
        allowViewTermsAndConditions: false,
        allowViewPortalGuide: true,
        allowViewContactSupport: true,
    },
    portalUserProfile: {
        allowUpdateDetails: true,
    },
    revenueShare: {
        allowView: true,
        allowUpdate: false,
        allowGPR: false,
        allowPR: true,
        allowProviderSelection: true,
    },
    redeemTransactions: {
        allowView: true,
    },
};

const adminAccess: Access = {
    viewPartnerOption: {
        fortune8: false,
        gamezone: false,
        futurePlay: false,
    },
    dashboard: {
        allowViewPrograms: true,
        allowViewTotalGames: true,
        allowViewTotalUsers: true,
        allowViewTotalNewUsersMonthly: true,
        allowViewTotalNumberOfPurchases: true,
        allowViewMostPopularGame: true,
        allowViewEngagementGraph: true,
    },
    games: {
        allowDrawer: true,
        allowViewList: true,
        allowGameActivity: true,
        allowDataDisplay: true,
        allowViewGameInfo: true,
        allowUpdateGameInfo: true,
        allowUpdateGameThumbnail: false,
        allowExportGameData: true,
        allowUpdateTierLevel: true
    },
    users: {
        allowViewList: true,
        allowViewMore: true, // purchase, game, and coin histories
        allowUpdateUserDetails: true,
        allowUpdateUserBalance: true,
        allowUpdateTierLevel: true,
        allowDataDisplay: true, // widgets (total # of )
        allowDemoGraphs: true,
        allowExportUserData: true,
        allowCreateUser: false,
    },
    mostPlayed: {
        allowDrawer: false,
        allowViewList: true,
        allowEdit: true,
        allowGameActivity: true,
    },
    purchases: {
        allowViewList: true,
        allowExportPurchaseData: true
    },
    platformTools: {
        allowQuickViewData: true,
        allowMissions: true,
        allowMails: true,
    },
    marketingTools: {
        allowCodeGenerator: true,
    },
    controlPanel: {
        allowInviteUser: true,
        allowViewTeam: true,
        allowUpdateTeam: true,
        allowCreatePartner: false,
        allowGenerateLicenseKey: false,
        allowViewPartnersList: false,
        allowViewLicenseKeys: false,
    },
    settings: {
        allowViewDetails: true,
        allowUpdateBusinessDetails: false,
        allowUpdateLicenseKey: false,
        allowViewTermsAndConditions: false,
        allowViewPortalGuide: true,
        allowViewContactSupport: true,
    },
    portalUserProfile: {
        allowUpdateDetails: true,
    },
    revenueShare: {
        allowView: true,
        allowUpdate: false,
        allowGPR: false,
        allowPR: true,
        allowProviderSelection: true,
    },
    redeemTransactions: {
        allowView: true,
    },
};

const generalAccess: Access = {
    viewPartnerOption: {
        fortune8: false,
        gamezone: false,
        futurePlay: false,
    },
    dashboard: {
        allowViewPrograms: true,
        allowViewTotalGames: true,
        allowViewTotalUsers: true,
        allowViewTotalNewUsersMonthly: true,
        allowViewTotalNumberOfPurchases: true,
        allowViewMostPopularGame: true,
        allowViewEngagementGraph: true,
    },
    games: {
        allowDrawer: true,
        allowViewList: true,
        allowGameActivity: true,
        allowDataDisplay: true,
        allowViewGameInfo: false,
        allowUpdateGameInfo: false,
        allowUpdateGameThumbnail: false,
        allowExportGameData: true,
        allowUpdateTierLevel: false
    },
    users: {
        allowViewList: true,
        allowViewMore: true, // purchase, game, and coin histories
        allowUpdateUserDetails: false,
        allowUpdateUserBalance: false,
        allowUpdateTierLevel: false,
        allowDataDisplay: true, // widgets (total # of )
        allowDemoGraphs: true,
        allowExportUserData: true,
        allowCreateUser: false,
    },
    mostPlayed: {
        allowDrawer: false,
        allowViewList: true,
        allowEdit: false,
        allowGameActivity: true,
    },
    purchases: {
        allowViewList: true,
        allowExportPurchaseData: true
    },
    platformTools: {
        allowQuickViewData: true,
        allowMissions: false,
        allowMails: false,
    },
    marketingTools: {
        allowCodeGenerator: true,
    },
    controlPanel: {
        allowInviteUser: false,
        allowViewTeam: false,
        allowUpdateTeam: false,
        allowCreatePartner: false,
        allowGenerateLicenseKey: false,
        allowViewPartnersList: false,
        allowViewLicenseKeys: false,
    },
    settings: {
        allowViewDetails: true,
        allowUpdateBusinessDetails: false,
        allowUpdateLicenseKey: false,
        allowViewTermsAndConditions: false,
        allowViewPortalGuide: true,
        allowViewContactSupport: true,
    },
    portalUserProfile: {
        allowUpdateDetails: true,
    },
    revenueShare: {
        allowView: true,
        allowUpdate: false,
        allowGPR: false,
        allowPR: true,
        allowProviderSelection: true,
    },
    redeemTransactions: {
        allowView: true,
    },
};

const gameProviderAccess: Access = {
    viewPartnerOption: {
        fortune8: false,
        gamezone: false,
        futurePlay: false,
    },
    dashboard: {
        allowViewPrograms: false,
        allowViewTotalGames: false,
        allowViewTotalUsers: false,
        allowViewTotalNewUsersMonthly: false,
        allowViewTotalNumberOfPurchases: false,
        allowViewMostPopularGame: false,
        allowViewEngagementGraph: false,
    },
    games: {
        allowDrawer: false,
        allowViewList: false,
        allowGameActivity: true,
        allowDataDisplay: false,
        allowViewGameInfo: false,
        allowUpdateGameInfo: false,
        allowUpdateGameThumbnail: false,
        allowExportGameData: false,
        allowUpdateTierLevel: false
    },
    users: {
        allowViewList: false,
        allowViewMore: false, // purchase, game, and coin histories
        allowUpdateUserDetails: false,
        allowUpdateUserBalance: false,
        allowUpdateTierLevel: false,
        allowDataDisplay: false, // widgets (total # of )
        allowDemoGraphs: false,
        allowExportUserData: false,
        allowCreateUser: false,
    },
    mostPlayed: {
        allowDrawer: true,
        allowViewList: true,
        allowEdit: false,
        allowGameActivity: true,
    },
    purchases: {
        allowViewList: false,
        allowExportPurchaseData: false
    },
    platformTools: {
        allowQuickViewData: false,
        allowMissions: false,
        allowMails: false,
    },
    marketingTools: {
        allowCodeGenerator: false,
    },
    controlPanel: {
        allowInviteUser: false,
        allowViewTeam: false,
        allowUpdateTeam: false,
        allowCreatePartner: false,
        allowGenerateLicenseKey: false,
        allowViewPartnersList: false,
        allowViewLicenseKeys: false,
    },
    settings: {
        allowViewDetails: false,
        allowUpdateBusinessDetails: false,
        allowUpdateLicenseKey: false,
        allowViewTermsAndConditions: false,
        allowViewPortalGuide: false,
        allowViewContactSupport: true,
    },
    portalUserProfile: {
        allowUpdateDetails: false,
    },
    revenueShare: {
        allowView: true,
        allowUpdate: false,
        allowGPR: false,
        allowPR: false,
        allowProviderSelection: false,
    },
    redeemTransactions: {
        allowView: true,
    },
};

const accessControl: { [key: number]: Access } = {
    2: developAccess,
    3: ownerPartnerAccess,
    4: adminAccess,
    5: generalAccess,
    6: gameProviderAccess
};

export default accessControl;