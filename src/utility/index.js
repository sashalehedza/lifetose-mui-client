export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...'
  }
  return str
}

// export const discountCalc = (
//   saleCount,
//   saleDiscount,
//   price,
//   discount,
//   count
// ) => {
//   return Number(saleCount) > 0 && Number(saleDiscount) > 0
//     ? Number(discount) && Number(discount) !== 0
//       ? Number(count) >= Number(saleCount)
//         ? (Number(price) - Number(discount)) *
//           Number(count) *
//           ((100 - Number(saleDiscount)) / 100)
//         : (Number(price) - Number(discount)) * Number(count)
//       : Number(count) >= Number(saleCount)
//       ? Number(price) * Number(count) * ((100 - Number(saleDiscount)) / 100)
//       : Number(price) * Number(count)
//     : Number(discount) && Number(discount) !== 0
//     ? (Number(price) - Number(discount)) * Number(count)
//     : Number(price) * Number(count)
// }

export const discountCalc = (
  saleCount,
  saleDiscount,
  price,
  discount,
  count
) => {
  return Number(discount) && Number(discount) !== 0
    ? (Number(price) - Number(discount)) * Number(count)
    : Number(price) * Number(count)
}

export const subtotalCalc = (couponname, couponpercent, carts) => {
  return couponname
    ? carts.reduce((accumulator, product) => {
        return (
          accumulator +
          discountCalc(
            product.saleCount,
            product.saleDiscount,
            product.price,
            product.discount,
            product.count
          )
        )
      }, 0) *
        ((100 - couponpercent) / 100)
    : carts.reduce((accumulator, product) => {
        return (
          accumulator +
          discountCalc(
            product.saleCount,
            product.saleDiscount,
            product.price,
            product.discount,
            product.count
          )
        )
      }, 0)
}
