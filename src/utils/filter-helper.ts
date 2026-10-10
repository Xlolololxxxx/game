import _, { filter } from "lodash";
import moment from "moment";
import {
  ACCOUNT_TYPE,
  COUNTRIES,
  GENDER,
  STATUS,
} from "./mockdata/menu-options";

const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order: any, orderBy: string) => {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

// ARRAY FILTER BY SEARCH AND ORDERBY
export const applySortFilter = (array: any, comparator: any, query: string = "", properties: string = "", properties2: string = "") => {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  if (query) {
    return _.filter(array, (_user) =>
      `${_user[properties] || ""}`.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      `${_user[properties2] || ""}`.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el: any) => el[0]);
};

export const applyFilterByGameTypeId = (array: any[], gameTypeID: number) => {
  return filter(array, (item: any) => {
    if (gameTypeID === 0) {
      return item;
    } else if (gameTypeID === 1 && [1, 2, 3].includes(item.gameTypeID)) {
      return item;
    } else if (item.gameTypeID === gameTypeID) {
      return item;
    }
  });
};

export const OptionValue: any = {
  1: "Paypal Web",
  2: "CreditCard web",
  3: "Bitpace Web",
  4: "Bitpace App",
  5: "Google Pay",
  6: "Braintree Paypal",
  7: "Braintree CreditCard",
  8: "Apcopay CreditCard",
  9: "Tierlock",
  10: "Inovio",
};

export const paymentOption = (id: number) => {
  return OptionValue[id] || "Bitpace Web";
};

export const getCountryGender = (userDetail: any = {}) => {
  return {
    country: userDetail?.country?.name ?? "",
    countryId: userDetail?.country?.id ?? 0,
    gender: userDetail?.gender?.name ?? "",
    street: userDetail?.street ?? "",
  };
};

export const getCountryValue = (id: number) => {
  const result = COUNTRIES.find((item: any) => item.value === id);

  return result || COUNTRIES[0];
};

export const getGenderValue = (genderName: string = "") => {
  const result = GENDER.find(
    (item: any) => item.label.toLowerCase() === genderName?.toLowerCase()
  );

  return result || GENDER[0];
};

export const getStatusValue = (statusName: string = "") => {
  const result = STATUS.find(
    (item: any) => item.label.toLowerCase() === statusName.toLowerCase()
  );

  return result || STATUS[0];
};

export const getAccountTypeValue = (acctType: number = 1) => {
  const result = ACCOUNT_TYPE.find((item: any) => item.value === acctType);

  return result || ACCOUNT_TYPE[0];
};

export const getAmountBalanceByCoinType = (array: any) => {
  const coinTypes = ["SILVER", "GOLD", "GOLD BONUS"];
  const balanceByCoinType: any = {};

  // Initialize balance for each coin type to 0
  coinTypes.forEach((coinType) => {
    balanceByCoinType[coinType] = 0;
  });

  // Calculate the balance for each coin type
  array.forEach((item: any) => {
    const coinTypeName = item.coinType.name;
    if (coinTypes.includes(coinTypeName)) {
      balanceByCoinType[coinTypeName] += item.amount;
    }
  });

  return balanceByCoinType;
};

export const getProvider = (gameTypeID: number) => {
  switch (gameTypeID) {
    case 20:
      return "Spinoro";
    case 19:
      return "Intelligence Games";
    case 16:
      return "KA Games";
    case 15:
      return "PDX";
    case 10:
      return "MACAW";
    case 9:
      return "JDB";
    case 8:
      return "YGT";
    case 7:
      return "RGS";
    case 6:
      return "CT";
    case 5:
      return "LIONWIN";
    case 1:
    case 2:
    case 3:
      return "EVO";
    default:
      return "N/A";
  }
};

export const transformUsersWithBalance = async (array: any[]) => {
  const userPromises = array.map(async (item: any) => {
    const result = await getAmountBalanceByCoinType(item.userBalanceList || []);
    return {
      ...item,
      ...result,
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      userTypeID: item.userTypeID,
      emailAddress: item.emailAddress,
      enrollmentDate: item.enrollmentDate,
      lastModifiedDate: item.lastModifiedDate,
      dateOfBirth: item.dateOfBirth,
      phoneNumber: item.phoneNumber,
      displayName: item.displayName,
      userDetail: item.userDetail,
      userBalanceList: item.userBalanceList,
      isDeleted: item.isDeleted,
    };
  });

  const usersWithBalance = await Promise.all(userPromises);
  return usersWithBalance;
};

export const redeemTypeName = (idType: number) => {
  switch (idType) {
    case 1:
      return "Bank Transfer";
    case 2:
      return "Paypal";
    case 3:
      return "Gift Card";
    case 4:
      return "Promotion Product";
    case 6:
      return "Exchange Gold for Silver";
    case 7:
      return "ACH";
    case 8:
      return "BTC";
    case 9:
      return "Instant Pay";
  }
};

export const redeemStatus = (status: number) => {
  switch (status) {
    case 2:
      return "Pending";
    case 1:
    case 3:
    case 4:
    case 7:
    case 9:
    case 13:
      return "In Progress";
    case 5:
    case 12:
      return "Completed";
    case 6:
    case 8:
      return "Rejected";
    case 10:
    case 11:
      return "Cancelled";
  }
};

export const redeemExchangeStatus = (status: number) => {
  switch (status) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 7:
    case 9:
    case 13:
      return "Pending";
    case 5:
    case 12:
      return "Completed";
    case 6:
    case 8:
    case 10:
    case 11:
      return "Declined";
  }
};

export const redeemStatusName = (status: number) => {
  switch (status) {
    case 1:
      return "Request Submitted";
    case 2:
      return "Email verified";
    case 3:
      return "Review in progress";
    case 4:
      return "Request approved";
    case 5:
      return "Funded to User";
    case 6:
      return "Request rejected";
    case 7:
      return "Hold For Redemption";
    case 8:
      return "Failed";
  }
};

export const tierLevelStatus = (idType: number) => {
  switch (idType) {
    case 1:
      return "Sapphire";
    case 2:
      return "Emerald";
    case 3:
      return "Ruby";
    case 4:
      return "Diamond";
  }
};

export const gameCategory = (gameCategoryID: number) => {
  switch (gameCategoryID) {
    case 1:
      return "Slot";
    case 2:
      return "Table";
    case 3:
      return "Instant";
    case 4:
      return "RPG";
    case 5:
      return "Crash";
    case 6:
      return "Fishing";
    case 7:
      return "Other";
    default:
      return gameCategoryID;
  }
};

// FILTER DOCUMENTS INCLUDING SUB FILES VIA SEARCH
export const searchByName = (arrays: any[], query: string, path: string = "name") => {
  const filteredData = arrays.filter(item => {
    const parentNameMatch = item[path]?.toLowerCase().includes(query.toLowerCase());

    return parentNameMatch;
  });

  return filteredData;
};

// FIND DEEPER AND RETURN TITLE
export const findTitleByPath = (array: any[], targetPath: string): string => {
  for (const item of array) {
    if (item.path === targetPath) {
      return item.title;
    }
    if (item.children) {
      const foundTitle = findTitleByPath(item.children, targetPath);
      if (foundTitle) {
        return foundTitle;
      }
    }
  }
  return ""; // Return null if no title is found
}

// FIND DEEPER AND RETURN PARENT INDEX
export const findIndexByPath = (array: any[], targetPath: string): number => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    // If the targetPath matches the current item, return its index
    if (item.path === targetPath) {
      return i;
    }

    // If the item has children, search in the children
    if (item.children) {
      for (const child of item.children) {
        if (child.path === targetPath) {
          return i; // Return parent index if targetPath is found in children
        }
      }
    }
  }
  return -1; // Return null if no matching path is found
}

// FIND ACCOUNT TYPE
export const getUserTypeValue = (userTypeID: number | string = 5) => {
  return ACCOUNT_TYPE.find((acct) => Number(acct.value) === Number(userTypeID))?.label;
}

export const hasPathIncluded = (routes: any[], pathToCheck: string) => {
  // return routes.some(route => route.path === pathToCheck);
  for (const route of routes) {
    if (route.path === pathToCheck) {
      return true;
    }

    if (route.children && Array.isArray(route.children)) {
      if (hasPathIncluded(route.children, pathToCheck)) {
        return true;
      }
    }
  }

  return false;
}

export const generateWeeklyOptions = () => {
  const currentDate = moment(); // today
  const sixMonthsAgo = moment().subtract(6, 'months').startOf('week');

  const weeks = [];
  let current = sixMonthsAgo.clone();

  while (current.isSameOrBefore(currentDate, 'week')) {
    // ❌ Skip before November 2025
    if (current.year() === 2025 && current.month() < 10) {
      current.add(1, 'week');
      continue;
    }

    const label = `${current.format('MMMM D')} – Week ${current.isoWeek()} / ${current.format('YYYY')}`;
    const value = current.format('YYYY-MM-DD');

    weeks.push({ label, value });
    current.add(1, 'week');
  }

  return weeks.reverse();
};

export const generateMonthlyOptions = () => {
  const currentDate = moment(); // today
  const sixYearsAgo = moment().subtract(5, 'years').startOf('month');

  const months = [];
  let current = sixYearsAgo.clone();

  while (current.isSameOrBefore(currentDate, 'month')) {
    const label = current.format('MMMM YYYY'); // e.g., "March 2020"
    const value = current.format('YYYY-MM');   // e.g., "2020-03"
    const month = current.format('MM');
    const year = current.format('YYYY');  

    months.push({ label, value, month, year });
    current.add(1, 'month');
  }

  return months.reverse(); // newest to oldest
};

export const StatusChange = (status: string) => {
  switch(status){
    case "PENDING":
      return "Incomplete";
    case "COMPLETED":
      return "Completed";
    case "FAILED":
      return "Failed";
    default:
      return status;
  }
}
