export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...'
  }
  return str
}

export const wholesale = ['Macbook', 'Iphone']

export const discountCalc = (title, price, discount, count) => {
  return wholesale.includes(title)
    ? Number(discount) && Number(discount) !== 0
      ? Number(count) > 2
        ? (Number(price) - Number(discount)) *
          Number(count) *
          ((100 - 10) / 100)
        : (Number(price) - Number(discount)) * Number(count)
      : Number(count) > 2
      ? Number(price) * Number(count) * ((100 - 10) / 100)
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
          discountCalc(product.price, product.discount, product.count)
        )
      }, 0) *
        ((100 - couponpercent) / 100)
    : carts.reduce((accumulator, product) => {
        return (
          accumulator +
          discountCalc(product.price, product.discount, product.count)
        )
      }, 0)
}
