'use strict';
const utils = require('../../utils');

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
    // Get all valid quotes.
    const quotes = await utils.filterBrandsAndCompanies(await Quote.find());

    // Filter quotes which year range cover the requested year.
    const quotesInYear = quotes.filter(quote => {
      const initialYear = quote.yearRange[0];
      const endYear = quote.yearRange[1];

      return initialYear <= year && endYear >= year;
    });

    // Create the result array which contains the best quotes found for each coverage type
    const bestQuotes = Quote.bestQuotes(quotesInYear, false);

    return bestQuotes;
  }

  // Get the best quote options per year for each coverage.
  Quote.quoteCar = async function (brand, year, hasAC) {
    // Get all valid quotes for a car brand.
    const quotes = await utils.filterBrandsAndCompanies(await Quote.find({where: {brand: brand}}));

    // Filter quotes which year range cover the requested year.
    const quotesInYearAndBrand = quotes.filter(quote => {
      const initialYear = quote.yearRange[0];
      const endYear = quote.yearRange[1];

      return initialYear <= year && endYear >= year;
    });

    const bestQuotes = Quote.bestQuotes(quotesInYearAndBrand, hasAC);

    return bestQuotes;
  }

  Quote.bestQuotes = function (quotes, hasAC) {
    let bestRCQuote;
    let bestLowQuote;
    let bestMidQuote;
    let bestHighQuote;

    // Find best quotes per coverage, the best is the one with the lowest price
    quotes.forEach(quote => {
      const price = +quote.price.replace(',', '');
      const extraPrice = hasAC ? +quote.extraCoveragePrice.replace(',', '') : 0;
      
      if (quote.coverageType === coverageTypes.RC) { // Checks coverage type
        if (!bestRCQuote) { // If there's no bestRCQuote, asign this quote
          bestRCQuote = quote;
        // If there's a best quote, reasign to this quote if it has lower price
        // Considers the extraCoveragePrice property if hasAC
        } else {
          const bestPrice = +bestRCQuote.price.replace(',', '');
          const bestExtraPrice = hasAC ? +bestRCQuote.extraCoveragePrice.replace(',', '') : 0;

          if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
            bestRCQuote = quote;
          }
        }
      } else if (quote.coverageType === coverageTypes.LOW) {
        if (!bestLowQuote) {
          bestLowQuote = quote;
        } else {
          const bestPrice = +bestLowQuote.price.replace(',', '');
          const bestExtraPrice = hasAC ? +bestLowQuote.extraCoveragePrice.replace(',', '') : 0;

          if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
            bestLowQuote = quote;
          }
        }
      } else if (quote.coverageType === coverageTypes.MID) {
        if (!bestMidQuote) {
          bestMidQuote = quote;
        } else {
          const bestPrice = +bestMidQuote.price.replace(',', '');
          const bestExtraPrice = hasAC ? +bestMidQuote.extraCoveragePrice.replace(',', '') : 0;

          if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
            bestMidQuote = quote;
          }
        }
      } else if (quote.coverageType === coverageTypes.HIGH) {
        if (!bestHighQuote) {
          bestHighQuote = quote;
        } else {
          const bestPrice = +bestHighQuote.price.replace(',', '');
          const bestExtraPrice = hasAC ? +bestHighQuote.extraCoveragePrice.replace(',', '') : 0;

          if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
            bestHighQuote = quote;
          }
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
