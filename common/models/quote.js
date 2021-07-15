'use strict';

module.exports = function(Quote) {
  // Declare all coverage types
  const coverageTypes = {
    RC: 'RC',
    LOW: 'Low',
    MID: 'Mid',
    HIGH: 'High'
  };

  // Get the best quote options per year for each coverage.
  Quote.bestOptionsPerYear = async function (year) {
    // Get all quotes.
    const quotes = await Quote.find();

    // Filter quotes which year range cover the requested year.
    const quotesInYear = quotes.filter(quote => {
      const initialYear = quote.yearRange[0];
      const endYear = quote.yearRange[1];

      return initialYear <= year && endYear >= year;
    });

    let bestRCQuote;
    let bestLowQuote;
    let bestMidQuote;
    let bestHighQuote;

    quotesInYear.forEach(quote => {
      if (quote.coverageType === coverageTypes.RC) {
        if (!bestRCQuote) {
          bestRCQuote = quote;
        } else if (+bestRCQuote.price > +quote.price) {
          bestRCQuote = quote;
        }
      }
    });

    return quotesInYear;
  }
};
