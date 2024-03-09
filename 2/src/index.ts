type PositiveTemporal = {
  days?: string;
  weeks?: string;
  months?: string;
  years?: string;
  hours?: string;
  minutes?: string;
};

type PositiveTemporalService = (
  amount: string,
  unit: string,
  nonNegative?: boolean | string,
) => PositiveTemporal | string;

const toPositiveTemporal: PositiveTemporalService = (
  amount: string,
  unit: string,
  nonNegative?: boolean | string,
): PositiveTemporal | string => {
  const unitLowerCase = unit.toLowerCase();
  const amountNum = parseInt(amount);

  if (
    amountNum === 0 &&
    nonNegative !== true &&
    nonNegative !== "nonNegative"
  ) {
    return `amount zero in toPositiveTemporal is invalid, unit: ${unit}`;
  }

  if (
    (nonNegative === true || nonNegative === "nonNegative") &&
    amountNum < 0
  ) {
    return "Negative amount is not allowed for non-negative temporal.";
  }

  switch (unitLowerCase) {
    case "d":
    case "day":
      return { days: amount };
    case "w":
    case "week":
      return { weeks: amount };
    case "m":
    case "month":
      return { months: amount };
    case "y":
    case "year":
      return { years: amount };
    case "h":
    case "hour":
      return { hours: amount };
    case "min":
    case "minute":
      return { minutes: amount };
    default:
      return "Invalid time unit.";
  }
};

export { toPositiveTemporal };
