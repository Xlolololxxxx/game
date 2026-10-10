import _ from "lodash";

export const validation = (requiredFields: any, stateInput: any) => {
  const newError: any = {};
  const ArrayConvert = _.isArray(requiredFields)
    ? requiredFields
    : Object.keys(requiredFields);
  ArrayConvert.forEach((field: any) => {
    if (!stateInput[field]) {
      newError[field] = "This field is required";
    }
  });

  return newError;
}


// Helper function to extract amounts (ignoring "Play 1" scenarios)
function extractAmount(str: string = "") {
  const match = str.match(/(?<!Play\s1\s)\b\d{1,3}(?:,\d{3})*\b/);
  return match ? match[0] : null;
}

// Helper function to extract the game/category from the strings
function extractGameOrCategory(str: string = "") {
  if (str.includes("Slot")) return "Slot Games";
  if (str.includes("Slot Games")) return "Slot Games";
  if (str.includes("Table Games")) return "Table Games";
  if (str.includes("Instant Games")) return "Instant Games";
  if (str.includes("Silver Coins")) return "Silver Coins";
  if (str.includes("on")) return str.split("on ")[1]; // Extract game after "on"
  if (str.includes("from")) return str.split("from ")[1]; // Extract game after "from"
  if (str.includes("на")) return str.split("на ")[1]; // Extract game after "на"
  if (str.includes("от")) return str.split("от ")[1]; // Extract game after "from"
  return null;
}

// Helper function to extract the number of times
function extractTimes(str: string = "") {
 const match = str.match(/(?<=\s)\b\d{2,3}\b\s+times\b/);
  return match ? match[0] : null;
};

export function mapAndReplaceValues(
    str: string, 
    gameCategory: string, 
    requiredAmount: string | number, 
    requiredTimes: string | number, 
    gameName: string,
    type: string,
  ) {
  let newStr = str;
  
    const extractedAmount = extractAmount(str);
    const extractedGameOrCategory = extractGameOrCategory(str);
    const extractedTimes = extractTimes(str);

    // Replace amount with requiredAmount (ignoring "Play 1")
    if (extractedAmount && extractedAmount !== "1") {
      newStr = newStr.replace(extractedAmount, requiredAmount?.toString());
    }

    // Replace game/category with gameCategory or gameName
    if (extractedGameOrCategory) {
      if (newStr.includes("on") || newStr.includes("на")) {
        // If it's a specific game, replace with gameName
        newStr = newStr.replace(extractedGameOrCategory, gameName);
      }else if (newStr.includes("from") || newStr.includes("от")) {
        // If it's a specific game, replace with gameName
        newStr = newStr.replace(extractedGameOrCategory, gameName);
      } else {
        // Otherwise, replace with gameCategory
        newStr = newStr.replace(extractedGameOrCategory, gameCategory);
      }
    }

    // Replace number of times with requiredTimes
    if (extractedTimes) {
      newStr = newStr.replace(extractedTimes, requiredTimes?.toString() + " times");
    }

    return {
      original: str,
      replaced: newStr
    };
}