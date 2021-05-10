import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let prices = action.payload.map(p => p.price)
    const max = Math.max(...prices)
    return { ...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: { ...state.filters, max_price: max, price: max } }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let temp = [...filtered_products]
    if (sort === 'price-lowest') {
      temp = temp.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sort === 'price-highest') {
      temp = temp.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sort === 'name-a') {
      temp = temp.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sort === 'name-z') {
      temp = temp.sort((a, b) => b.name.localeCompare(a.name))
    }
    return { ...state, filtered_products: temp }

  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters

    let temp = [...all_products]

    if (text) {
      console.log(temp)
      temp = temp.filter(product => product.name.toLowerCase().startsWith(text))
    }
    if (company !== 'all') {
      console.log(temp)
      temp = temp.filter(product => product.company === company)
    }
    if (category !== 'all') {
      temp = temp.filter(product => product.category === category)
    }
    if (color !== 'all') {
      temp = temp.filter(product => product.colors.find(c => c === color))
    }
    if (shipping) {
      temp = temp.filter(product => product.shipping === true)
    }
    temp = temp.filter(product => product.price <= price)
    return { ...state, filtered_products: temp }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
