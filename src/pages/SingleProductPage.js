import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'


const SingleProductPage = () => {
  const { id } = useParams()
  console.log(id)
  const history = useHistory();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct
  } = useProductsContext();

  useEffect(() => {

    fetchSingleProduct(`${url}${id}`)
    // eslint-diable-next-line
  }, [id])
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 3000);
    }
    // eslint-diable-next-line
  }, [])
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  const { name, price, description, stock, stars, reviews, id: di, company, images } = product

  return (
    <Wrapper>
      <PageHero title={name} product />

      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          Back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <Stars stars={stars} reviews={reviews} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Avalailable:</span>
              {stock > 0 ? 'In stock' : 'out stock'}
            </p>
            <p className='info'>
              <span>SKU:</span>
              {di}
            </p>
            <p className='info'>
              <span>Brnad:</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
