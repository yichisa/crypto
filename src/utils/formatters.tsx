// Helper function to format large numbers
export const formatLargeNumber = (num: number) => {
    if (Math.abs(num) >= 1.0e12) {
      return `$${(num / 1.0e12).toFixed(2)} T`;
    } else if (Math.abs(num) >= 1.0e9) {
      return `$${(num / 1.0e9).toFixed(2)} B`;
    } else if (Math.abs(num) >= 1.0e6) {
      return `$${(num / 1.0e6).toFixed(2)} M`;
    } else if (Math.abs(num) >= 1.0e3) {
      return `$${(num / 1.0e3).toFixed(2)} K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };
  