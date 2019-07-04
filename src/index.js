module.exports = function check(str, bracketsConfig) {
  //Function for returning index of appropriate closing bracket for given opening bracket
  function closeBracketIndex(openBracket, closeBracket, openInd) {
    let initOpenInd = str.indexOf(openBracket, openInd);
    let initCloseInd = str.indexOf(closeBracket, initOpenInd + 1);
    let nextOpenInd = str.indexOf(openBracket, initOpenInd + 1);

    // Checks if there is nested opening brackets
    // and function works recursively until reaches the last nested opening bracket
    if (nextOpenInd < initCloseInd && nextOpenInd > 0) {
      return str.indexOf(
        closeBracket,
        closeBracketIndex(openBracket, closeBracket, nextOpenInd) + 1
      );
    } else {
      return initCloseInd;
    }
  }

  for (i = 0; i < bracketsConfig.length; i++) {
    // Count of opening brackets that str contains
    let openCount = str.split(bracketsConfig[i][0]).length - 1;
    // Count of closing brackets that str contains
    let closeCount = str.split(bracketsConfig[i][1]).length - 1;

    // If number of opening brackets is not equal to number of closing brackets
    // the sequence already broke
    if (openCount !== closeCount) return false;

    let indenticalBrackets = bracketsConfig[i][0] === bracketsConfig[i][1];
    let openIndex = 0;

    // index === -1 means not found
    while (openIndex >= 0) {
      openIndex = str.indexOf(bracketsConfig[i][0], openIndex);
      let closeInd = closeBracketIndex(
        bracketsConfig[i][0],
        bracketsConfig[i][1],
        openIndex
      );

      // Correct sequence requires
      // if there is opening index on A index, then there must be closing bracket on index B where B > A
      // and B - A must be odd number
      if (openIndex === -1) {
        break;
      } else if (openIndex >= 0 && (closeInd < 0 || closeInd < openIndex)) {
        return false;
      } else if (openIndex >= 0 && closeInd >= 0) {
        if ((closeInd - openIndex) % 2 === 0) {
          return false;
        }
      }

      // if opening and closing brackets are same,
      // then loop should continue searching for opening bracket from closing bracket's index + 1
      // in order to correctly use the indexes of openig and closing brackets
      openIndex = indenticalBrackets ? ++closeInd : ++openIndex;
    }
  }

  return true;
};
