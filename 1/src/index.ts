interface TimePeriod {
  startDate: string;
  endDate: string;
}

interface Customer {
  ListOfPeriods?: string;
}

class TimePeriodService {
  static extractTimePeriod(period: string): TimePeriod | null {
    const dates = period.split("-").map((date) => date.trim());
    if (dates.length !== 2 || dates.some((date) => date.length !== 10)) {
      return null;
    }
    return {
      startDate: dates[0],
      endDate: dates[1],
    };
  }

  static extractTimePeriods(periods: string[]): TimePeriod[] {
    return periods.map((period) => {
      const timePeriod = TimePeriodService.extractTimePeriod(period);
      if (!timePeriod) {
        throw new Error("string length is invalid");
      }
      return timePeriod;
    });
  }
}

class ExtractDatesApplication {
  extractDates(customer: Customer): TimePeriod[] | string[] {
    if (!customer.ListOfPeriods) return [];

    if (customer.ListOfPeriods.toUpperCase() === "NULL") return [];

    const periods: string[] = customer.ListOfPeriods.split("|").map((period) =>
      period.trim(),
    );

    try {
      return TimePeriodService.extractTimePeriods(periods);
    } catch (error) {
      return [error.message];
    }
  }
}

const extractDates = new ExtractDatesApplication().extractDates;
export default extractDates;
