const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .slice(0, -3);
};

export default formatCurrency;
