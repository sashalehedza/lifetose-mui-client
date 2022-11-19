export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...'
  }
  return str
}

export const wholesale = [
  { title: 'Macbook', saleCount: 3, saleDiscount: 10 },
  { title: 'Iphone', saleCount: 5, saleDiscount: 15 },
]

export const discountCalc = (title, price, discount, count) => {
  let findItem = wholesale.find((item) => item.title === title)
  return findItem
    ? Number(discount) && Number(discount) !== 0
      ? Number(count) >= Number(findItem.saleCount)
        ? (Number(price) - Number(discount)) *
          Number(count) *
          ((100 - findItem.saleDiscount) / 100)
        : (Number(price) - Number(discount)) * Number(count)
      : Number(count) >= Number(findItem.saleCount)
      ? Number(price) * Number(count) * ((100 - findItem.saleDiscount) / 100)
      : Number(price) * Number(count)
    : Number(discount) && Number(discount) !== 0
    ? (Number(price) - Number(discount)) * Number(count)
    : Number(price) * Number(count)
}

export const subtotalCalc = (couponname, couponpercent, carts) => {
  return couponname
    ? carts.reduce((accumulator, product) => {
        return (
          accumulator +
          discountCalc(
            product.title,
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
            product.title,
            product.price,
            product.discount,
            product.count
          )
        )
      }, 0)
}
