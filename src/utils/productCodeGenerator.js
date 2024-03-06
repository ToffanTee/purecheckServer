const { v4: uuidv4 } = require("uuid");

const productCodeGenerator = (productTotal, productCode) => {
  const productUniqueCode = Array.from(
    { length: productTotal },
    (_, i) => `${productCode}-${uuidv4()}`
  );
  return productUniqueCode;
};

module.exports = productCodeGenerator;
