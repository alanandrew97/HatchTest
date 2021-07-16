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

    // Find best quotes per coverage, the lowest price
    quotesInYear.forEach(quote => {
      if (quote.coverageType === coverageTypes.RC) { // Checks coverage type
        if (!bestRCQuote) { // If there's no bestRCQuote, asign this quote
          bestRCQuote = quote;
        // If there's a best quote, reasign to this quote if it has lower price
        } else if (+bestRCQuote.price.replace(',', '') > +quote.price.replace(',', '')) {
          bestRCQuote = quote;
        }
      } else if (quote.coverageType === coverageTypes.LOW) {
        if (!bestLowQuote) {
          bestLowQuote = quote;
        } else if (+bestLowQuote.price.replace(',', '') > +quote.price.replace(',', '')) {
          bestLowQuote = quote;
        }
      } else if (quote.coverageType === coverageTypes.MID) {
        if (!bestMidQuote) {
          bestMidQuote = quote;
        } else if (+bestMidQuote.price.replace(',', '') > +quote.price.replace(',', '')) {
          bestMidQuote = quote;
        }
      } else if (quote.coverageType === coverageTypes.HIGH) {
        if (!bestHighQuote) {
          bestHighQuote = quote;
        } else if (+bestHighQuote.price.replace(',', '') > +quote.price.replace(',', '')) {
          bestHighQuote = quote;
        }
      }
    });

    // Create the result array which contains the best quotes found for each coverage type
    const bestQuotes = [];
    if (bestRCQuote) bestQuotes.push(bestRCQuote);
    if (bestLowQuote) bestQuotes.push(bestLowQuote);
    if (bestMidQuote) bestQuotes.push(bestMidQuote);
    if (bestHighQuote) bestQuotes.push(bestHighQuote);

    return bestQuotes;
  }
};
