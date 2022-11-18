export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...'
  }
  return str
}

export const discountCalc = (price, discount, count) => {
  return Number(discount) && Number(discount) !== 0
    ? Number(count) > 2
      ? (Number(price) - Number(discount)) * Number(count) * 0.9
      : (Number(price) - Number(discount)) * Number(count)
    : Number(count) > 2
    ? Number(price) * Number(count) * 0.9
    : Number(price) * Number(count)
}
