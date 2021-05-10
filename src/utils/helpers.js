export const formatPrice = (number) => {
    const nemNumber = Intl.NumberFormat({
        style: 'currency',
        currency: 'USD',

    }).format(number / 100)
    return nemNumber
}

export const getUniqueValues = (data, type) => {
    let unique = data.map(item => item[type])
    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}
