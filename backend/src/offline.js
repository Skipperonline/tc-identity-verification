function isValidTCKN(tckn) {
  if (typeof tckn !== "string") return false;

  if (!/^[0-9]{11}$/.test(tckn)) return false;

  if (tckn[0] === "0") return false;

  const digits = tckn.split("").map(Number);

  const d1 = digits[0];
  const d2 = digits[1];
  const d3 = digits[2];
  const d4 = digits[3];
  const d5 = digits[4];
  const d6 = digits[5];
  const d7 = digits[6];
  const d8 = digits[7];
  const d9 = digits[8];
  const d10 = digits[9];
  const d11 = digits[10];

  const sumOdd = d1 + d3 + d5 + d7 + d9;
  const sumEven = d2 + d4 + d6 + d8;

  const check10 = ((sumOdd * 7) - sumEven) % 10;
  if (check10 !== d10) return false;

  const sumFirst10 = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  const check11 = sumFirst10 % 10;
  if (check11 !== d11) return false;

  return true;
}

module.exports = { isValidTCKN };
