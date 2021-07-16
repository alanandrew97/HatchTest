module.exports = {
    filterBrandsAndCompanies: async (data) => {
        const validBrands = [
            'Chevrolet',
            'Dodge',
            'Ford',
            'GMC',
            'Honda'
        ];

        const validCompanies = [
            'Seguros Atlas',
            'Qualitas',
            'MAPFRE'
        ];

        // Filter the given data to allows only the current valid brands and companies
        const validQuotes = data.filter(quote => {
            return validCompanies.includes(quote.company) && validBrands.includes(quote.brand)
        });

        return validQuotes;
    },
  };