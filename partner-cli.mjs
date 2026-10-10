#!/usr/bin/env node
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const BASE_URL = process.env.API_BASE_URL || 'https://game-api.gambly.casino';
const AUTH_USER = process.env.AUTH_USERNAME || 'gwz-api';
const AUTH_PASS = process.env.AUTH_PASSWORD || 'gwzdevapi';
const PARTNER_ID = Number(process.env.PARTNER_ID || 5);

let authToken = null;
let rl = null;

// =============================================================================
// VERIFIED SERVICE ACCOUNT ENDPOINT MAP (WITH STRICT PARAMETER & BODY SCHEMAS)
// =============================================================================
export const ENDPOINT_MAP = {
  authentication: [
    {
      method: 'POST',
      path: '/authenticate',
      description: 'Authenticate M2M service account & acquire JWT token',
      params: [],
      bodySchema: {"username": "string (default: AUTH_USERNAME)", "password": "string (default: AUTH_PASSWORD)"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/portal/authenticate',
      description: 'Authenticate staff/admin user into portal',
      params: [],
      bodySchema: {"email": "string", "password": "string", "partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/authenticate',
      description: 'Standard player login authentication',
      params: [],
      bodySchema: {"username": "string", "password": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/adminlogin',
      description: 'Admin second-factor / elevated login',
      params: [],
      bodySchema: {"partnerId": "number", "username": "string", "password": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/portal/refresh-token',
      description: 'Refresh portal access token',
      params: [],
      bodySchema: {"refreshToken": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/refresh-token',
      description: 'Refresh player access token',
      params: [],
      bodySchema: {"refreshToken": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/sign-out',
      description: 'Revoke active session token',
      params: [],
      bodySchema: {}
    },
  ],
  passwordAndVerification: [
    {
      method: 'POST',
      path: '/api/v1/user/reset-password/send-email',
      description: 'Trigger/force password reset email for player account',
      params: [],
      bodySchema: {"email": "string", "partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/reset-password/send-email-portal',
      description: 'Trigger/force password reset email for portal admin account',
      params: [],
      bodySchema: {"email": "string", "partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/reset-password/validate',
      description: 'Validate password reset code for target user',
      params: [],
      bodySchema: {"userId": "number", "code": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/reset-password/update',
      description: 'Force/set new password with reset code',
      params: [],
      bodySchema: {"userId": "number", "code": "string", "newPassword": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/update-password',
      description: 'Direct password update (authenticated user)',
      params: [],
      bodySchema: {"currentPassword": "string", "newPassword": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/password',
      description: 'Change password (player account)',
      params: [],
      bodySchema: {"currentPassword": "string", "newPassword": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/verify',
      description: 'Verify player account with code',
      params: [],
      bodySchema: {"userId": "number", "verifyCode": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/verify-portal-user',
      description: 'Verify invited portal user account',
      params: [],
      bodySchema: {"userId": "number", "code": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/:userId/verification/resend-email',
      description: 'Resend account verification email to user',
      params: [":userId"],
      bodySchema: {}
    },
  ],
  userManagement: [
    {
      method: 'POST',
      path: '/api/v1/user/getAll?partnerId=:partnerId',
      description: 'List users/players with search, filters, pagination, and KYC statuses',
      params: [":partnerId"],
      bodySchema: {"page": "number (default: 1)", "size": "number (default: 10)", "partnerId": "number", "search": "string (optional)", "sort": "string (default: 'enrollmentDate,desc')"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/getAll/noPaging?partnerId=:partnerId',
      description: 'Export complete unpaged user list for partner',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "sort": "string (default: 'enrollmentDate,desc')", "search": "string (optional)"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/count?partnerId=:partnerId',
      description: 'Count total registered users for partner',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'GET',
      path: '/api/v1/user/details',
      description: 'Get detailed profile and KYC status of currently authenticated identity',
      params: [],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/user/updateUserDetails',
      description: 'Update user profile fields (name, email, phone, jobTitle)',
      params: [],
      bodySchema: {"id": "number", "firstName": "string (optional)", "lastName": "string (optional)", "emailAddress": "string (optional)", "contactNumber": "string (optional)"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/adjustBalance',
      description: 'Adjust user coin balance (1=SILVER, 2=GOLD, 3=GOLD BONUS)',
      params: [],
      bodySchema: {"userID": "number", "coinTypeID": "number (1=Silver, 2=Gold, 3=Bonus)", "amount": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/updateTier',
      description: 'Update user loyalty/VIP tier (1=Copper, 2=Bronze, 3=Silver, 4=Gold, 5=Platinum)',
      params: [],
      bodySchema: {"userID": "number", "tierID": "number"}
    },
    {
      method: 'GET',
      path: '/api/v1/user/:userId/wallet',
      description: 'Fetch current wallet balances for user',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/leaderboard/score/:userId',
      description: 'Fetch user leaderboard rank and points score',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user/:userId/tier-bonuses',
      description: 'Fetch tier bonuses available/claimed for user',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/user/:userId/tier-bonuses/claim',
      description: 'Claim pending tier upgrade bonus for user',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/user/me/deactivate',
      description: 'Deactivate user account',
      params: [],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user-accesses/users/count',
      description: 'Get active user count',
      params: [],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user-accesses/sessions/count',
      description: 'Get active user sessions count this month',
      params: [],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user-accesses/sessions',
      description: 'List active user sessions with pagination',
      params: [],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user/demographics/:category?partnerId=:partnerId',
      description: 'Fetch user demographic metrics by category (country, age, gender)',
      params: [":category", ":partnerId"],
      bodySchema: {}
    },
  ],
  kycAndVerification: [
    {
      method: 'GET',
      path: '/api/v1/redeem/userDocument/get?userid=:userId',
      description: 'Retrieve uploaded KYC verification and identity documents for user',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/redeem/userDocument/save',
      description: 'Save / upload verified user KYC identity document',
      params: [],
      bodySchema: {"userId": "number", "documentType": "string", "fileUrl": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/redeem/userDocument/delete',
      description: 'Delete user KYC identity document',
      params: [],
      bodySchema: {"userId": "number", "documentId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/kyc/verify',
      description: 'Submit KYC identity verification request',
      params: [],
      bodySchema: {"userId": "number", "idType": "string", "idNumber": "string"}
    },
    {
      method: 'POST',
      path: '/api/v1/kyc/id/link',
      description: 'Generate KYC verification session link',
      params: [],
      bodySchema: {"userId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/kyc/personal-info/validate',
      description: 'Validate player personal information for KYC compliance',
      params: [],
      bodySchema: {"firstName": "string", "lastName": "string", "dob": "string", "address": "string"}
    },
    {
      method: 'GET',
      path: '/api/v1/kyc/id/submitted',
      description: 'Check if user ID submission is pending/received',
      params: [],
      bodySchema: {}
    },
  ],
  rewardsAndMissions: [
    {
      method: 'GET',
      path: '/api/v1/rewards/:userId/isClaimed',
      description: 'Check if user has claimed today\'s daily login reward',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/rewards/:userId?rewardName=:rewardName',
      description: 'Claim daily reward for user by reward name',
      params: [":userId", ":rewardName"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/rewards/:userId/isClaimed?rewardID=12',
      description: 'Check if weekly mission reward is claimed',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/user/:userId/collect',
      description: 'Collect user 3-hour faucet/timer coin reward',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user/:userId/checkcollect',
      description: 'Check remaining countdown time for 3-hour reward',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user/:userId/jade',
      description: 'Check user jade stone accumulation balance',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/user/:userId/missions',
      description: 'Fetch active user weekly missions and completion progress',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/user/missions/:missionId/claim-reward',
      description: 'Claim reward for completed mission',
      params: [":missionId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/user/:userId/missions/claim-vault-reward',
      description: 'Claim weekly vault reward upon mission series completion',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/:userId/notifications',
      description: 'Fetch user notification inbox items',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/:userId/notifications/:notificationId/claim-coin-bonus',
      description: 'Claim promotional coin bonus attached to notification',
      params: [":userId", ":notificationId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/:userId/notifications?action=READ',
      description: 'Mark notification as read',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/:userId/notifications?action=DELETE',
      description: 'Delete user notification',
      params: [":userId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/notifications/delete-all?userId=:userId',
      description: 'Clear all notifications for user',
      params: [":userId"],
      bodySchema: {}
    },
  ],
  teamManagement: [
    {
      method: 'POST',
      path: '/api/v1/user/getAll?partnerId=:partnerId',
      description: 'List portal team/staff members (filter by userTypeIDs: [2,3,4,5,6])',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "userTypeIDs": "array (e.g. [2,3,4,5])", "page": "number", "size": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/invite-portal-user',
      description: 'Invite new portal administrator/staff member with role assignment',
      params: [],
      bodySchema: {"partnerId": "number", "email": "string", "name": "string", "userTypeId": "number (2=Dev, 3=Owner, 4=Admin, 5=General)"}
    },
    {
      method: 'POST',
      path: '/api/v1/user/create-portal-user',
      description: 'Create portal staff user account directly',
      params: [],
      bodySchema: {"partnerId": "number", "email": "string", "name": "string", "userTypeId": "number"}
    },
    {
      method: 'DELETE',
      path: '/api/v1/user/delete-portal-user?userId=:userId&partnerId=:partnerId',
      description: 'Remove portal user staff member',
      params: [":userId", ":partnerId"],
      bodySchema: {"userId": "number", "partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/partner/users/owner/update',
      description: 'Transfer partner account primary ownership',
      params: [],
      bodySchema: {"partnerId": "number", "userId": "number"}
    },
  ],
  gamesAndProviders: [
    {
      method: 'POST',
      path: '/api/v1/game/list?partnerId=:partnerId',
      description: 'List all games enabled for partner',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/game/paged?partnerId=:partnerId',
      description: 'List partner games with pagination and category filtering',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "page": "number", "size": "number", "categoryId": "number (optional)"}
    },
    {
      method: 'GET',
      path: '/api/v1/game/:gameId?partnerId=:partnerId',
      description: 'Get detailed game configuration and RTP settings',
      params: [":gameId", ":partnerId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/game/count?partnerId=:partnerId',
      description: 'Count total games available for partner',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/game/most-popular?partnerId=:partnerId',
      description: 'Fetch most popular games metrics',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/game/update',
      description: 'Update game status (enable/disable), order, or banner',
      params: [],
      bodySchema: {"gameId": "number", "isActive": "boolean"}
    },
    {
      method: 'GET',
      path: '/api/v1/provider/list',
      description: 'List all integrated third-party game providers',
      params: [],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/provider/update?partnerId=:partnerId',
      description: 'Update provider settings for partner',
      params: [":partnerId"],
      bodySchema: {"providerId": "number", "isActive": "boolean"}
    },
    {
      method: 'GET',
      path: '/api/v1/game-categories',
      description: 'List all game categories (Slots, Live Dealer, Table, etc.)',
      params: [],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/game/:gamecode/redirect?userId=:userId&gameTypeID=:gameTypeId&currency=:currency',
      description: 'Generate player game launch URL session',
      params: [":gamecode", ":userId", ":gameTypeId", ":currency"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/callback/report/getPlayResult?partnerId=:partnerId',
      description: 'Game round gameplay and win/loss audit results report',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "page": "number", "size": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/callback/report/getPlayResult/noPaging?partnerId=:partnerId',
      description: 'Export complete unpaged gameplay play result logs',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
  ],
  paymentsAndRedemptions: [
    {
      method: 'POST',
      path: '/api/v1/payment/stats/overview?partnerId=:partnerId',
      description: 'Overall payment, gross revenue, and redemption totals',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'GET',
      path: '/api/v1/payment/stats',
      description: 'Detailed payment transaction statistics',
      params: [],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/payment/count?partnerId=:partnerId',
      description: 'Count total payment transactions',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/payment/report/getPayment?partnerId=:partnerId',
      description: 'Player package purchases and deposit transaction records',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "page": "number", "size": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/payment/report/getPayment/noPaging?partnerId=:partnerId',
      description: 'Export complete unpaged purchase payment records',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/payment/report/getCoinTransaction?partnerId=:partnerId',
      description: 'Coin transaction and balance ledger audit trail',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "page": "number", "size": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/payment/report/getCoinTransaction/noPaging?partnerId=:partnerId',
      description: 'Export complete unpaged coin transaction ledger',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/redeem/get?partnerId=:partnerId',
      description: 'List player prize cashout / redemption requests',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "page": "number (optional)", "size": "number (optional)"}
    },
    {
      method: 'POST',
      path: '/api/v1/redeem/get/noPaging?partnerId=:partnerId',
      description: 'Export complete unpaged redemption requests',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/redeem/stats?partnerId=:partnerId',
      description: 'Redemption request totals and status counts',
      params: [":partnerId"],
      bodySchema: {"partnerID": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/redeem/update',
      description: 'Update redemption request status',
      params: [],
      bodySchema: {"redeemRequestId": "number", "status": "string"}
    },
    {
      method: 'PUT',
      path: '/api/v1/payment/masspay/cashback-redeem-requests/:redeemRequestId/approveRequest',
      description: 'Approve MassPay cash prize payout for redemption',
      params: [":redeemRequestId"],
      bodySchema: {"redeemRequestId": "number", "note": "string (optional)"}
    },
    {
      method: 'PUT',
      path: '/api/v1/payment/masspay/cashback-redeem-requests/:redeemRequestId/reject?reason=:reason',
      description: 'Reject MassPay cash prize payout with reason',
      params: [":redeemRequestId", ":reason"],
      bodySchema: {"redeemRequestId": "number", "reason": "string"}
    },
  ],
  promotionsAndMarketing: [
    {
      method: 'GET',
      path: '/api/v1/promotions?partnerId=:partnerId',
      description: 'List marketing promo codes and bonus deals',
      params: [":partnerId"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/promotions',
      description: 'Create new promotion / promo code',
      params: [],
      bodySchema: {"partnerId": "number", "code": "string", "description": "string", "rewardType": "string (SILVER/GOLD)", "rewardAmount": "number"}
    },
    {
      method: 'GET',
      path: '/api/v1/promotions/:id/claims',
      description: 'List users who claimed promotion code',
      params: [":id"],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/promotions/:id/status',
      description: 'Toggle promotion active/inactive status',
      params: [":id"],
      bodySchema: {"id": "number", "status": "boolean"}
    },
    {
      method: 'POST',
      path: '/api/v1/promotions/validate',
      description: 'Validate referral / promotion code',
      params: [],
      bodySchema: {"code": "string", "partnerId": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/mails?partnerId=:partnerId',
      description: 'List portal in-mails sent to players',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "page": "number", "size": "number"}
    },
    {
      method: 'POST',
      path: '/api/v1/mails/create?partnerId=:partnerId',
      description: 'Send portal in-mail announcement / targeted message',
      params: [":partnerId"],
      bodySchema: {"partnerId": "number", "title": "string", "content": "string", "userId": "number (optional)"}
    },
    {
      method: 'GET',
      path: '/api/v1/products/get?partnerId=:partnerId',
      description: 'List coin package products available in shop',
      params: [":partnerId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/gold-shop/items?itemType=Gold Package',
      description: 'List Gold Shop packages and rates',
      params: [],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/gold-shop/purchase-silver',
      description: 'Exchange Gold for Silver coins',
      params: [],
      bodySchema: {"itemName": "string", "userId": "number"}
    },
    {
      method: 'GET',
      path: '/api/v1/platform/deals',
      description: 'List active platform special deals',
      params: [],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/platform/deals/stats',
      description: 'Deal purchase statistics',
      params: [],
      bodySchema: {}
    },
  ],
  licensesAndPartner: [
    {
      method: 'GET',
      path: '/api/v1/partner-licenses',
      description: 'List software licenses owned by partner',
      params: [],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/partner-licenses/activate',
      description: 'Activate license key for partner',
      params: [],
      bodySchema: {"licenseKey": "string"}
    },
    {
      method: 'GET',
      path: '/api/v1/licenses/validity?partnerId=:partnerId',
      description: 'Check if partner software license is currently valid',
      params: [":partnerId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/partners/:partnerId',
      description: 'Get partner configuration details',
      params: [":partnerId"],
      bodySchema: {}
    },
    {
      method: 'GET',
      path: '/api/v1/company-profile',
      description: 'Get current partner company profile',
      params: [],
      bodySchema: {}
    },
    {
      method: 'POST',
      path: '/api/v1/company-profile/update',
      description: 'Update partner company profile',
      params: [],
      bodySchema: {"companyName": "string", "address": "string", "contactEmail": "string"}
    },
  ],
};


// Flattened list for quick searching
export const ALL_ENDPOINTS = Object.entries(ENDPOINT_MAP).flatMap(([category, list]) =>
  list.map(ep => ({ ...ep, category }))
);

// =============================================================================
// HTTP CLIENT CORE
// =============================================================================
async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (authToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(url, {
    ...options,
    headers
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    const errorMsg = data?.message || data?.error?.message || data?.error || res.statusText || 'Request failed';
    const err = new Error(`[${res.status}] ${typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function login() {
  console.log(`\nConnecting to ${BASE_URL}...`);
  try {
    const res = await request('/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username: AUTH_USER, password: AUTH_PASS })
    });
    if (!res?.token) {
      throw new Error('Authentication succeeded but no token returned');
    }
    authToken = res.token;
    console.log(`✓ Authenticated as M2M user "${AUTH_USER}" for Partner ID ${PARTNER_ID}\n`);
  } catch (err) {
    console.error(`✗ Authentication failed:`, err.message);
    process.exit(1);
  }
}

async function prompt(question, defaultValue = '') {
  const displayPrompt = defaultValue ? `${question} [${defaultValue}]: ` : `${question}: `;
  try {
    const answer = await rl.question(displayPrompt);
    return answer.trim() || defaultValue;
  } catch (err) {
    if (err.code === 'ERR_USE_AFTER_CLOSE' || err.name === 'AbortError') {
      return '0';
    }
    throw err;
  }
}

// =============================================================================
// [1] USER & PLAYER MANAGEMENT MODULES
// =============================================================================
async function listUsers() {
  const page = await prompt('Page number', '1');
  const size = await prompt('Page size', '10');
  const search = await prompt('Search query (User ID, Email, Name, or blank)', '');

  try {
    const payload = {
      page: Number(page),
      size: Number(size),
      partnerId: PARTNER_ID,
      sort: 'enrollmentDate,desc'
    };
    if (search) payload.search = search;

    const res = await request(`/api/v1/user/getAll?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const items = res?.data?.items || [];
    console.log(`\nFound ${res?.data?.totalRecords || items.length} total users (showing ${items.length}):`);
    console.table(items.map(u => ({
      ID: u.id,
      Email: u.emailAddress,
      Name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.displayName || 'N/A',
      KYC_Status: u.kycStatus || 'NOT_SUBMITTED',
      Tier: u.tier?.name || 'N/A',
      Silver: u.userBalanceList?.find(b => b.coinType?.name === 'SILVER')?.amount ?? 'N/A',
      Gold: u.userBalanceList?.find(b => b.coinType?.name === 'GOLD')?.amount ?? 'N/A'
    })));
  } catch (err) {
    console.error('✗ Error fetching users:', err.message);
  }
}

async function viewUserCounts() {
  try {
    const [totalUsers, activeUsers, sessions] = await Promise.allSettled([
      request(`/api/v1/user/count?partnerId=${PARTNER_ID}`, { method: 'POST', body: JSON.stringify({ partnerId: PARTNER_ID }) }),
      request('/api/v1/user-accesses/users/count', { method: 'GET' }),
      request('/api/v1/user-accesses/sessions/count', { method: 'GET' })
    ]);

    console.log('\n--- User & Session Counts ---');
    console.log(`Total Registered Users:   ${totalUsers.status === 'fulfilled' ? (totalUsers.value?.data?.count ?? totalUsers.value?.count ?? 'N/A') : totalUsers.reason?.message}`);
    console.log(`Active Users:             ${activeUsers.status === 'fulfilled' ? (activeUsers.value?.count ?? activeUsers.value?.data?.count ?? 'N/A') : activeUsers.reason?.message}`);
    console.log(`Monthly Active Sessions:  ${sessions.status === 'fulfilled' ? (sessions.value?.count ?? sessions.value?.data?.count ?? 'N/A') : sessions.reason?.message}`);
  } catch (err) {
    console.error('✗ Error fetching user counts:', err.message);
  }
}

async function adjustBalance() {
  console.log('\n--- Adjust User Balance ---');
  const userID = await prompt('Target User ID');
  if (!userID) return console.log('Operation cancelled: User ID is required.');

  console.log('Coin types: 1 = SILVER, 2 = GOLD, 3 = GOLD BONUS');
  const coinTypeID = await prompt('Coin Type ID (1/2/3)', '1');
  const amount = await prompt('Amount (positive to add, negative to deduct)');
  if (!amount) return console.log('Operation cancelled: Amount is required.');

  try {
    const res = await request('/api/v1/user/adjustBalance', {
      method: 'POST',
      body: JSON.stringify({
        userID: Number(userID),
        coinTypeID: Number(coinTypeID),
        amount: Number(amount)
      })
    });
    console.log('✓ Balance adjusted successfully:', res);
  } catch (err) {
    console.error('✗ Failed to adjust balance:', err.message, err.data || '');
  }
}

async function updateUserTier() {
  console.log('\n--- Update User Tier ---');
  const userID = await prompt('Target User ID');
  if (!userID) return console.log('Operation cancelled: User ID is required.');

  console.log('Tier IDs: 1 = Copper, 2 = Bronze, 3 = Silver, 4 = Gold, 5 = Platinum');
  const tierID = await prompt('New Tier ID', '1');

  try {
    const res = await request('/api/v1/user/updateTier', {
      method: 'POST',
      body: JSON.stringify({
        userID: Number(userID),
        tierID: Number(tierID)
      })
    });
    console.log('✓ User tier updated successfully:', res);
  } catch (err) {
    console.error('✗ Failed to update tier:', err.message, err.data || '');
  }
}

async function getUserWallet() {
  const userID = await prompt('Target User ID');
  if (!userID) return console.log('Operation cancelled.');

  try {
    const res = await request(`/api/v1/user/${userID}/wallet`, { method: 'GET' });
    console.log('\n--- User Wallet ---');
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('✗ Error fetching wallet:', err.message);
  }
}

async function updateUserDetails() {
  console.log('\n--- Update User Details ---');
  const userID = await prompt('Target User ID');
  if (!userID) return console.log('Operation cancelled: User ID required.');

  const firstName = await prompt('First Name');
  const lastName = await prompt('Last Name');
  const emailAddress = await prompt('Email Address');
  const phone = await prompt('Phone Number');

  const payload = { id: Number(userID) };
  if (firstName) payload.firstName = firstName;
  if (lastName) payload.lastName = lastName;
  if (emailAddress) payload.emailAddress = emailAddress;
  if (phone) payload.contactNumber = phone;

  try {
    const res = await request('/api/v1/user/updateUserDetails', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    console.log('✓ User details updated:', res);
  } catch (err) {
    console.error('✗ Failed to update user details:', err.message, err.data || '');
  }
}

// =============================================================================
// [2] PASSWORD & VERIFICATION CONTROL MODULES
// =============================================================================
async function triggerPasswordReset() {
  console.log('\n--- Trigger / Force Password Reset Email ---');
  console.log('Target types:');
  console.log('  [1] Player Account (/api/v1/user/reset-password/send-email)');
  console.log('  [2] Portal / Staff Account (/api/v1/user/reset-password/send-email-portal)');
  const targetType = await prompt('Select target type (1/2)', '1');
  const email = await prompt('Target user email address');
  if (!email) return console.log('Operation cancelled: Email is required.');

  const endpoint = targetType === '2'
    ? '/api/v1/user/reset-password/send-email-portal'
    : '/api/v1/user/reset-password/send-email';

  try {
    const res = await request(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        email,
        partnerId: PARTNER_ID
      })
    });
    console.log(`✓ Password reset email triggered for ${email}:`, res);
  } catch (err) {
    console.error('✗ Failed to trigger password reset:', err.message, err.data || '');
  }
}

async function validateResetCode() {
  console.log('\n--- Validate Password Reset Code ---');
  const userId = await prompt('Target User ID');
  const code = await prompt('Reset Code');
  if (!userId || !code) return console.log('Operation cancelled: Both User ID and Code are required.');

  try {
    const res = await request('/api/v1/user/reset-password/validate', {
      method: 'POST',
      body: JSON.stringify({ userId: Number(userId), code })
    });
    console.log('✓ Code validation response:', res);
  } catch (err) {
    console.error('✗ Code validation failed:', err.message, err.data || '');
  }
}

async function forceSetNewPassword() {
  console.log('\n--- Force / Set New Password with Reset Code ---');
  const userId = await prompt('Target User ID');
  const code = await prompt('Reset Code');
  const newPassword = await prompt('New Password');
  if (!userId || !code || !newPassword) {
    return console.log('Operation cancelled: User ID, Code, and New Password are required.');
  }

  try {
    const res = await request('/api/v1/user/reset-password/update', {
      method: 'POST',
      body: JSON.stringify({
        userId: Number(userId),
        code,
        newPassword
      })
    });
    console.log('✓ Password reset successful:', res);
  } catch (err) {
    console.error('✗ Failed to set new password:', err.message, err.data || '');
  }
}

async function verifyUserAccount() {
  console.log('\n--- Verify User Account ---');
  console.log('Verification types:');
  console.log('  [1] Player Account (/api/v1/user/verify)');
  console.log('  [2] Portal User (/api/v1/user/verify-portal-user)');
  const type = await prompt('Select type (1/2)', '1');
  const userId = await prompt('User ID');
  const code = await prompt('Verification Code');
  if (!userId || !code) return console.log('Operation cancelled: User ID and code required.');

  const endpoint = type === '2' ? '/api/v1/user/verify-portal-user' : '/api/v1/user/verify';
  const body = type === '2' ? { userId: Number(userId), code } : { userId: Number(userId), verifyCode: code };

  try {
    const res = await request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
    console.log('✓ Account verified successfully:', res);
  } catch (err) {
    console.error('✗ Account verification failed:', err.message, err.data || '');
  }
}

async function resendVerificationEmail() {
  console.log('\n--- Resend Account Verification Email ---');
  const userId = await prompt('Target User ID');
  if (!userId) return console.log('Operation cancelled: User ID required.');

  try {
    const res = await request(`/api/v1/user/${userId}/verification/resend-email`, {
      method: 'POST'
    });
    console.log(`✓ Verification email resent for user ${userId}:`, res);
  } catch (err) {
    console.error('✗ Failed to resend verification email:', err.message, err.data || '');
  }
}

// =============================================================================
// [3] KYC & USER VERIFICATION INSPECTION (GENUINE ENDPOINTS)
// =============================================================================
async function inspectUserKyc() {
  console.log('\n--- Inspect User Profile & KYC Verification Status ---');
  const targetId = await prompt('Target User ID (or Email)');
  if (!targetId) return console.log('Operation cancelled: User ID required.');

  try {
    console.log(`\nLooking up user profile & KYC status for "${targetId}"...`);
    // 1. Fetch user record from database via getAll
    const userRes = await request(`/api/v1/user/getAll?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify({
        partnerId: PARTNER_ID,
        search: targetId,
        page: 1,
        size: 5
      })
    });

    const users = userRes?.data?.items || [];
    const matchedUser = users.find(u => String(u.id) === String(targetId) || u.emailAddress?.toLowerCase() === targetId.toLowerCase()) || users[0];

    if (!matchedUser) {
      console.log(`✗ No user found matching "${targetId}" in Partner ${PARTNER_ID}.`);
    } else {
      console.log('\n✓ User Found:');
      console.table([{
        ID: matchedUser.id,
        Email: matchedUser.emailAddress,
        Name: `${matchedUser.firstName || ''} ${matchedUser.lastName || ''}`.trim() || 'N/A',
        KYC_Status: matchedUser.kycStatus || 'NOT_SUBMITTED',
        Tier: matchedUser.tier?.name || 'N/A',
        Silver: matchedUser.userBalanceList?.find(b => b.coinType?.name === 'SILVER')?.amount ?? 0,
        Gold: matchedUser.userBalanceList?.find(b => b.coinType?.name === 'GOLD')?.amount ?? 0,
        Enrolled: matchedUser.enrollmentDate
      }]);
    }

    // 2. Fetch User KYC Documents from /api/v1/redeem/userDocument/get?userid=...
    console.log(`\nChecking uploaded KYC/ID verification documents for User ID ${matchedUser?.id || targetId}...`);
    try {
      const docRes = await request(`/api/v1/redeem/userDocument/get?userid=${matchedUser?.id || targetId}`, {
        method: 'GET'
      });
      console.log('✓ KYC Documents Response:');
      console.log(JSON.stringify(docRes?.data || docRes, null, 2));
    } catch (docErr) {
      console.log(`- Document lookup notice: ${docErr.message}`);
    }

  } catch (err) {
    console.error('✗ Failed to lookup KYC status:', err.message, err.data || '');
  }
}

// =============================================================================
// [4] REWARDS, MISSIONS & BONUSES MODULES
// =============================================================================
async function checkUserRewards() {
  const userId = await prompt('Target User ID');
  if (!userId) return console.log('Operation cancelled: User ID required.');

  try {
    const [daily, weekly, jade] = await Promise.allSettled([
      request(`/api/v1/rewards/${userId}/isClaimed`, { method: 'GET' }),
      request(`/api/v1/rewards/${userId}/isClaimed?rewardID=12`, { method: 'GET' }),
      request(`/api/v1/user/${userId}/jade`, { method: 'GET' })
    ]);

    console.log(`\n--- Rewards & Missions for User ${userId} ---`);
    console.log(`Daily Reward Claimed:  ${daily.status === 'fulfilled' ? JSON.stringify(daily.value) : daily.reason?.message}`);
    console.log(`Weekly Mission Status: ${weekly.status === 'fulfilled' ? JSON.stringify(weekly.value) : weekly.reason?.message}`);
    console.log(`Jade Accumulation:     ${jade.status === 'fulfilled' ? JSON.stringify(jade.value) : jade.reason?.message}`);
  } catch (err) {
    console.error('✗ Error fetching reward status:', err.message);
  }
}

async function triggerCollectReward() {
  const userId = await prompt('Target User ID');
  if (!userId) return console.log('Operation cancelled.');

  try {
    const res = await request(`/api/v1/user/${userId}/collect`, { method: 'POST' });
    console.log('✓ Collect reward response:', res);
  } catch (err) {
    console.error('✗ Error collecting reward:', err.message, err.data || '');
  }
}

// =============================================================================
// [5] TEAM & STAFF (PORTAL USERS) MODULES
// =============================================================================
async function listTeamMembers() {
  try {
    const res = await request(`/api/v1/user/getAll?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify({
        userTypeIDs: [2, 3, 4, 5, 6],
        partnerId: PARTNER_ID,
        page: 1,
        size: 50
      })
    });

    const items = res?.data?.items || [];
    console.log(`\nFound ${items.length} team members:`);
    console.table(items.map(m => ({
      ID: m.id,
      Email: m.emailAddress,
      Name: m.displayName || `${m.firstName || ''} ${m.lastName || ''}`.trim(),
      RoleID: m.userTypeID,
      Role: { 2: 'DEVELOPER', 3: 'OWNER', 4: 'ADMINISTRATOR', 5: 'GENERAL' }[m.userTypeID] || m.userTypeID
    })));
  } catch (err) {
    console.error('✗ Error fetching team members:', err.message);
  }
}

async function inviteTeamMember() {
  console.log('\n--- Invite Portal Team Member ---');
  const email = await prompt('Email address');
  if (!email) return console.log('Operation cancelled: Email is required.');

  const name = await prompt('Full Name');
  if (!name) return console.log('Operation cancelled: Name is required.');

  console.log('Role IDs: 2 = Developer, 3 = Owner, 4 = Administrator, 5 = General');
  const userTypeId = await prompt('Role Type ID', '4');

  try {
    const res = await request('/api/v1/user/invite-portal-user', {
      method: 'POST',
      body: JSON.stringify({
        partnerId: PARTNER_ID,
        email,
        name,
        userTypeId: Number(userTypeId)
      })
    });
    console.log('✓ Invitation sent successfully. Check user email for verification link:', res);
  } catch (err) {
    console.error('✗ Failed to invite member:', err.message, err.data || '');
  }
}

async function deleteTeamMember() {
  console.log('\n--- Delete Portal Team Member ---');
  const userId = await prompt('User ID to remove');
  if (!userId) return console.log('Operation cancelled: User ID is required.');
  const partnerId = await prompt('Partner ID', String(PARTNER_ID));

  const payload = {
    userId: Number(userId),
    id: Number(userId),
    partnerId: Number(partnerId)
  };

  try {
    const res = await request(`/api/v1/user/delete-portal-user?userId=${encodeURIComponent(userId)}&partnerId=${encodeURIComponent(partnerId)}`, {
      method: 'DELETE',
      body: JSON.stringify(payload)
    });
    console.log('✓ Team member removed successfully:', res);
  } catch (err) {
    console.error('✗ Failed to delete member:', err.message, err.data || '');
  }
}

// =============================================================================
// [6] GAMES & PROVIDERS MODULES
// =============================================================================
async function listGames() {
  try {
    const res = await request(`/api/v1/game/list?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify({ partnerId: PARTNER_ID })
    });
    const items = res?.data || res?.items || [];
    console.log(`\nFound ${items.length} games for Partner ${PARTNER_ID}:`);
    console.table(items.slice(0, 25).map(g => ({
      ID: g.id || g.gameId,
      Name: g.name || g.gameName,
      Category: g.category?.name || g.categoryId || 'N/A',
      Active: g.isActive ?? 'N/A'
    })));
    if (items.length > 25) console.log(`... and ${items.length - 25} more games.`);
  } catch (err) {
    console.error('✗ Error fetching games:', err.message);
  }
}

async function listGameProviders() {
  try {
    const res = await request('/api/v1/provider/list', { method: 'GET' });
    const providers = res?.data || res || [];
    console.log(`\n--- Connected Game Providers (${providers.length}) ---`);
    console.table(providers.map(p => ({
      ID: p.id || p.providerId,
      Name: p.name || p.providerName,
      Active: p.isActive ?? 'N/A'
    })));
  } catch (err) {
    console.error('✗ Error fetching providers:', err.message);
  }
}

async function listGameCategories() {
  try {
    const res = await request('/api/v1/game-categories', { method: 'GET' });
    console.log('\n--- Game Categories ---');
    console.table(res?.data || res);
  } catch (err) {
    console.error('✗ Error fetching game categories:', err.message);
  }
}

async function generateGameLaunchUrl() {
  console.log('\n--- Generate Game Launch URL ---');
  const gamecode = await prompt('Game Code / Slug');
  const userId = await prompt('Player User ID');
  const gameTypeId = await prompt('Game Type ID', '1');
  const currency = await prompt('Currency (SILVER/GOLD)', 'GOLD');
  if (!gamecode || !userId) return console.log('Operation cancelled: Game code and User ID required.');

  try {
    const path = `/api/v1/game/${gamecode}/redirect?userId=${userId}&gameTypeID=${gameTypeId}&currency=${currency}`;
    const res = await request(path, { method: 'GET' });
    console.log('✓ Launch Session URL / Response:');
    console.log(res);
  } catch (err) {
    console.error('✗ Error generating game launch URL:', err.message);
  }
}

// =============================================================================
// [7] PAYMENTS, PURCHASES & REDEMPTIONS MODULES
// =============================================================================
async function viewPaymentOverview() {
  try {
    const res = await request(`/api/v1/payment/stats/overview?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify({ partnerId: PARTNER_ID })
    });
    console.log('\n--- Payment Stats Overview ---');
    console.log(JSON.stringify(res?.data || res, null, 2));
  } catch (err) {
    console.error('✗ Error fetching payment overview:', err.message);
  }
}

async function viewRedemptions() {
  try {
    const res = await request(`/api/v1/redeem/get?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify({ partnerId: PARTNER_ID })
    });
    const items = res?.data?.items || res?.data || [];
    console.log(`\nFound ${Array.isArray(items) ? items.length : 0} redemption requests:`);
    if (Array.isArray(items) && items.length > 0) {
      console.table(items.map(r => ({
        ID: r.id || r.redeemRequestId,
        User: r.userId || r.userID,
        Amount: r.amount,
        Status: r.status,
        Created: r.createdDate || r.createdAt
      })));
    } else {
      console.log(JSON.stringify(res, null, 2));
    }
  } catch (err) {
    console.error('✗ Error fetching redemptions:', err.message);
  }
}

async function approveRedemption() {
  console.log('\n--- Approve MassPay Redemption Request ---');
  const redeemRequestId = await prompt('Redemption Request ID');
  const note = await prompt('Note / Approval remarks', 'Approved via Partner CLI');
  if (!redeemRequestId) return console.log('Operation cancelled: Request ID required.');

  try {
    const res = await request(`/api/v1/payment/masspay/cashback-redeem-requests/${redeemRequestId}/approveRequest`, {
      method: 'PUT',
      body: JSON.stringify({ redeemRequestId: Number(redeemRequestId), note })
    });
    console.log('✓ Redemption approved:', res);
  } catch (err) {
    console.error('✗ Failed to approve redemption:', err.message, err.data || '');
  }
}

async function rejectRedemption() {
  console.log('\n--- Reject MassPay Redemption Request ---');
  const redeemRequestId = await prompt('Redemption Request ID');
  const reason = await prompt('Reason for rejection');
  if (!redeemRequestId || !reason) return console.log('Operation cancelled: Request ID and Reason required.');

  try {
    const res = await request(`/api/v1/payment/masspay/cashback-redeem-requests/${redeemRequestId}/reject?reason=${encodeURIComponent(reason)}`, {
      method: 'PUT',
      body: JSON.stringify({ redeemRequestId: Number(redeemRequestId), reason })
    });
    console.log('✓ Redemption rejected:', res);
  } catch (err) {
    console.error('✗ Failed to reject redemption:', err.message, err.data || '');
  }
}

// =============================================================================
// [8] PROMOTIONS, MARKETING & IN-MAIL MODULES
// =============================================================================
async function listPromotions() {
  try {
    const res = await request(`/api/v1/promotions?partnerId=${PARTNER_ID}`, { method: 'GET' });
    const promos = res?.data || res || [];
    console.log(`\n--- Active Promotions & Promo Codes (${promos.length}) ---`);
    console.table(Array.isArray(promos) ? promos : [promos]);
  } catch (err) {
    console.error('✗ Error fetching promotions:', err.message);
  }
}

async function createPromotionCode() {
  console.log('\n--- Create Promo / Referral Code ---');
  const code = await prompt('Promo Code');
  const description = await prompt('Description');
  const rewardType = await prompt('Reward Type (e.g., SILVER/GOLD)', 'GOLD');
  const rewardAmount = await prompt('Reward Coin Amount', '100');
  if (!code) return console.log('Operation cancelled: Code is required.');

  try {
    const res = await request('/api/v1/promotions', {
      method: 'POST',
      body: JSON.stringify({
        partnerId: PARTNER_ID,
        code,
        description,
        rewardType,
        rewardAmount: Number(rewardAmount)
      })
    });
    console.log('✓ Promotion created:', res);
  } catch (err) {
    console.error('✗ Failed to create promotion:', err.message, err.data || '');
  }
}

async function sendInMail() {
  console.log('\n--- Send Portal In-Mail Announcement ---');
  const title = await prompt('Mail Subject / Title');
  const message = await prompt('Mail Message Body');
  const recipientType = await prompt('Recipient Type: 1 = All Users, 2 = Specific User', '1');
  let targetUserId = null;
  if (recipientType === '2') {
    targetUserId = await prompt('Target User ID');
  }

  try {
    const payload = {
      partnerId: PARTNER_ID,
      title,
      content: message,
      ...(targetUserId ? { userId: Number(targetUserId) } : {})
    };
    const res = await request(`/api/v1/mails/create?partnerId=${PARTNER_ID}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    console.log('✓ In-Mail sent:', res);
  } catch (err) {
    console.error('✗ Failed to send in-mail:', err.message, err.data || '');
  }
}

// =============================================================================
// [9] PARAMETER-AWARE SEARCH & EXECUTE ANY MAPPED ENDPOINT
// =============================================================================
async function searchAndExecuteEndpoint() {
  console.log(`\n--- Search Any Endpoint (${ALL_ENDPOINTS.length} Mapped Endpoints) ---`);
  const query = (await prompt('Search keyword (e.g. password, kyc, masspay, wallet, user)')).toLowerCase();
  if (!query) return console.log('Operation cancelled.');

  const matches = ALL_ENDPOINTS.filter(ep =>
    ep.path.toLowerCase().includes(query) ||
    ep.description.toLowerCase().includes(query) ||
    ep.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    console.log(`No endpoints found matching "${query}".`);
    return;
  }

  console.log(`\nFound ${matches.length} matching endpoints:`);
  matches.forEach((m, idx) => {
    console.log(`  [${idx + 1}] ${m.method.padEnd(6)} ${m.path.padEnd(60)} (${m.category})`);
  });

  const selectIdx = await prompt(`Select endpoint to call [1-${matches.length}, 0 to cancel]`, '0');
  const num = parseInt(selectIdx, 10);
  if (isNaN(num) || num < 1 || num > matches.length) return;

  const target = matches[num - 1];
  console.log(`\n======================================================`);
  console.log(`Selected: ${target.method} ${target.path}`);
  console.log(`Purpose:  ${target.description}`);
  console.log(`Category: ${target.category}`);
  console.log(`======================================================`);
  
  // 1. Substitute Path / Query Parameters
  let finalPath = target.path;
  if (target.params && target.params.length > 0) {
    console.log('\n--- Required Parameters ---');
    for (const p of target.params) {
      let defaultVal = '';
      if (p === ':partnerId' || p === ':partnerID') defaultVal = String(PARTNER_ID);
      const val = await prompt(`Enter value for ${p}`, defaultVal);
      finalPath = finalPath.replace(p, encodeURIComponent(val));
    }
  }

  // 2. Construct Body Schema
  let body = undefined;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(target.method)) {
    const schema = target.bodySchema || {};
    const keys = Object.keys(schema);

    if (keys.length > 0) {
      console.log('\n--- Request Body Schema ---');
      for (const [k, typeDesc] of Object.entries(schema)) {
        console.log(`  * ${k}: ${typeDesc}`);
      }

      const fillMode = await prompt('Fill parameters interactively? (y = prompt each field, n = raw JSON)', 'y');
      if (fillMode.toLowerCase() === 'y') {
        const constructed = {};
        for (const [k, typeDesc] of Object.entries(schema)) {
          let defaultVal = '';
          if (k === 'partnerId' || k === 'partnerID') defaultVal = String(PARTNER_ID);
          const val = await prompt(`  ${k} (${typeDesc})`, defaultVal);
          if (val !== '') {
            if (typeDesc.startsWith('number') || val.match(/^\d+$/)) {
              constructed[k] = Number(val);
            } else if (typeDesc.startsWith('boolean')) {
              constructed[k] = val.toLowerCase() === 'true';
            } else {
              constructed[k] = val;
            }
          }
        }
        body = JSON.stringify(constructed);
      } else {
        const rawJson = await prompt('Raw JSON Body', '{}');
        if (rawJson && rawJson !== '{}') {
          try {
            JSON.parse(rawJson);
            body = rawJson;
          } catch (err) {
            return console.log('✗ Invalid JSON body:', err.message);
          }
        } else {
          body = '{}';
        }
      }
    } else {
      body = '{}';
    }
  }

  try {
    console.log(`\nSending ${target.method} ${finalPath}...`);
    if (body) console.log('Payload:', body);
    const res = await request(finalPath, {
      method: target.method,
      ...(body ? { body } : {})
    });
    console.log('\n--- Response ---');
    console.log(typeof res === 'object' ? JSON.stringify(res, null, 2) : res);
  } catch (err) {
    console.error(`✗ Request failed: [${err.status || 'ERROR'}]`, err.message, err.data || '');
  }
}

// =============================================================================
// [10] RAW / CUSTOM API REQUEST CONSOLE
// =============================================================================
async function rawApiConsole() {
  console.log('\n--- Raw / Custom API Request Console ---');
  console.log(`Current Active Auth: Bearer ${authToken ? authToken.slice(0, 15) + '...' : 'NONE'}`);
  const method = (await prompt('HTTP Method (GET/POST/PUT/DELETE)', 'GET')).toUpperCase();
  const path = await prompt('Endpoint Path (e.g. /api/v1/user/details or /api/v1/redeem/userDocument/get?userid=982)');
  if (!path) return console.log('Operation cancelled: Path is required.');

  let body = undefined;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const rawJson = await prompt('JSON Body (leave blank for none)', '');
    if (rawJson) {
      try {
        body = rawJson;
        JSON.parse(rawJson);
      } catch (err) {
        return console.log('✗ Invalid JSON body provided:', err.message);
      }
    }
  }

  try {
    console.log(`\nSending ${method} ${path}...`);
    const res = await request(path, {
      method,
      ...(body ? { body } : {})
    });
    console.log('\n--- Response ---');
    console.log(typeof res === 'object' ? JSON.stringify(res, null, 2) : res);
  } catch (err) {
    console.error(`✗ Request failed: [${err.status || 'ERROR'}]`, err.message, err.data || '');
  }
}

// =============================================================================
// [11] PRINT COMPLETE ENDPOINT REFERENCE MAP
// =============================================================================
function printEndpointMap() {
  console.log(`
================================================================================
     VERIFIED SERVICE ACCOUNT ENDPOINT REFERENCE DIRECTORY (${ALL_ENDPOINTS.length} TOTAL)
================================================================================`);
  for (const [category, endpoints] of Object.entries(ENDPOINT_MAP)) {
    console.log(`\n▶ [${category.toUpperCase()}] (${endpoints.length} Endpoints)`);
    for (const ep of endpoints) {
      console.log(`  ${ep.method.padEnd(6)} ${ep.path.padEnd(60)} # ${ep.description}`);
    }
  }
  console.log(`\n================================================================================\n`);
}

// =============================================================================
// MENUS & MAIN LOOP
// =============================================================================
async function userSubmenu() {
  while (true) {
    console.log(`
--- USER & PLAYER MANAGEMENT ---
  [1] List Players / Users (with KYC Statuses)
  [2] View User & Session Counts
  [3] Adjust Player Balance (Silver / Gold / Bonus)
  [4] Update Player VIP / Loyalty Tier
  [5] Get User Wallet Balances
  [6] Update User Details (Name / Phone / Email)
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await listUsers(); break;
      case '2': await viewUserCounts(); break;
      case '3': await adjustBalance(); break;
      case '4': await updateUserTier(); break;
      case '5': await getUserWallet(); break;
      case '6': await updateUserDetails(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function passwordSubmenu() {
  while (true) {
    console.log(`
--- PASSWORD & ACCOUNT VERIFICATION ---
  [1] Trigger / Force Password Reset Email (Player or Portal)
  [2] Validate Password Reset Code
  [3] Force / Set New Password (with Code)
  [4] Verify User Account (Player or Portal)
  [5] Resend Account Verification Email
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await triggerPasswordReset(); break;
      case '2': await validateResetCode(); break;
      case '3': await forceSetNewPassword(); break;
      case '4': await verifyUserAccount(); break;
      case '5': await resendVerificationEmail(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function rewardsSubmenu() {
  while (true) {
    console.log(`
--- REWARDS, MISSIONS & BONUSES ---
  [1] Check User Reward Status (Daily, Weekly, Jade)
  [2] Trigger Collect 3-Hour Reward
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await checkUserRewards(); break;
      case '2': await triggerCollectReward(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function teamSubmenu() {
  while (true) {
    console.log(`
--- TEAM & PORTAL STAFF ---
  [1] List Portal Team Members
  [2] Invite New Portal Team Member / Admin
  [3] Delete Portal Team Member
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await listTeamMembers(); break;
      case '2': await inviteTeamMember(); break;
      case '3': await deleteTeamMember(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function gamesSubmenu() {
  while (true) {
    console.log(`
--- GAMES & PROVIDERS ---
  [1] List Games Catalog
  [2] List Game Software Providers
  [3] List Game Categories
  [4] Generate Player Game Launch / Session URL
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await listGames(); break;
      case '2': await listGameProviders(); break;
      case '3': await listGameCategories(); break;
      case '4': await generateGameLaunchUrl(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function paymentsSubmenu() {
  while (true) {
    console.log(`
--- PAYMENTS & REDEMPTIONS ---
  [1] View Payment & Revenue Overview
  [2] View Player Redemption Requests
  [3] Approve MassPay Redemption Request
  [4] Reject MassPay Redemption Request
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await viewPaymentOverview(); break;
      case '2': await viewRedemptions(); break;
      case '3': await approveRedemption(); break;
      case '4': await rejectRedemption(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function marketingSubmenu() {
  while (true) {
    console.log(`
--- PROMOTIONS, MARKETING & IN-MAIL ---
  [1] List Promotions / Promo Codes
  [2] Create New Promotion / Referral Code
  [3] Send Portal In-Mail Announcement
  [0] Back to Main Menu`);
    const choice = await prompt('Select an option', '1');
    switch (choice) {
      case '1': await listPromotions(); break;
      case '2': await createPromotionCode(); break;
      case '3': await sendInMail(); break;
      case '0': return;
      default: console.log('Invalid option.'); break;
    }
  }
}

async function mainMenu() {
  while (true) {
    console.log(`
================================================================================
  GAMBLY PARTNER CLI (Partner ID: ${PARTNER_ID} | Service: ${AUTH_USER} | ${ALL_ENDPOINTS.length} Verified Routes)
================================================================================
  [1] User & Player Management (Balances, Tiers, Details, Counts, Wallets)
  [2] Password, Auth & Account Verification (Force Reset, Verify, Resend)
  [3] Inspect User Profile & KYC Verification Documents (Real Endpoints)
  [4] Rewards, Missions & Bonuses (Daily, Weekly, Jade, Collect)
  [5] Team & Portal Administration (List, Invite, Delete Staff)
  [6] Games & Providers Catalog (List, Categories, Launch URLs)
  [7] Payments, Revenue & Redemptions (Stats, Approve, Reject, Logs)
  [8] Promotions, Marketing & In-Mail (Promo Codes, In-Mail)
  [9] Parameter-Aware Search & Execute (Fill exact params for ANY endpoint)
  [10] Raw / Custom API Request Console (Send any Method/Endpoint/Body)
  [11] Print Complete Endpoint Reference Map
  [0] Exit
================================================================================`);

    const choice = await prompt('Select a module [1-11, 0 to exit]', '1');

    switch (choice) {
      case '1': await userSubmenu(); break;
      case '2': await passwordSubmenu(); break;
      case '3': await inspectUserKyc(); break;
      case '4': await rewardsSubmenu(); break;
      case '5': await teamSubmenu(); break;
      case '6': await gamesSubmenu(); break;
      case '7': await paymentsSubmenu(); break;
      case '8': await marketingSubmenu(); break;
      case '9': await searchAndExecuteEndpoint(); break;
      case '10': await rawApiConsole(); break;
      case '11': printEndpointMap(); break;
      case '0':
        console.log('Exiting...');
        return;
      default:
        console.log('Invalid option, please choose between 0 and 11.');
        break;
    }
  }
}

async function run() {
  await login();
  rl = readline.createInterface({ input, output });
  try {
    await mainMenu();
  } finally {
    rl.close();
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
