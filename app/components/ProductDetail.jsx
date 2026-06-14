"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartButton, CartDrawer, currency, useCart } from "./CartDrawer";
import { featuredProduct, products, shoppingUrl } from "../data";

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const related = products.filter((product) => product.id !== featuredProduct.id);

  function addSelectedProduct() {
    cart.addItem(featuredProduct, selectedSize);
    setIsCartOpen(true);
  }

  return (
    <div className="site productRoute">
      <header className="siteNav">
        <Link className="brandLockup" href="/" aria-label="8:8 home">
          <span className="brandSigil" aria-hidden="true" />
          <span>8:8</span>
        </Link>
        <nav aria-label="Product navigation">
          <Link href="/">Home</Link>
          <a className="navShopLink" href={shoppingUrl}>Shop</a>
          <a href="#details">Details</a>
          <a href="#related">Related</a>
        </nav>
        <div className="navActions">
          <a className="mobileShopButton" href={shoppingUrl}>Shop</a>
          <CartButton count={cart.count} onClick={() => setIsCartOpen(true)} />
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} />

      <main>
        <section className="productHero" id="details">
          <div className="productGallery">
            <div className="galleryMain">
              <Image src={featuredProduct.image} alt={featuredProduct.name} width={1200} height={900} priority />
            </div>
            <div className="galleryRail" aria-label="Product detail previews">
              <div><Image src={featuredProduct.image} alt="" width={240} height={180} /></div>
              <div><Image src="/assets/campaign-88.png" alt="" width={240} height={180} /></div>
            </div>
          </div>

          <div className="productPanel">
            <p className="eyebrow">Product Detail Page</p>
            <h1>{featuredProduct.name}</h1>
            <div className="productPrice">{currency.format(featuredProduct.price)}</div>
            <p className="productDescription">
              {featuredProduct.concept} Built for night movement, private launches, and the calm precision
              of technical outerwear. Chrome details catch light like coordinates.
            </p>

            <div className="sizeSelector">
              <div className="selectorHead">
                <span>Size</span>
                <button type="button">Guide</button>
              </div>
              <div className="sizeGrid">
                {featuredProduct.sizes.map((size) => (
                  <button
                    className={selectedSize === size ? "isSelected" : ""}
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="primaryAction addToCartButton" type="button" onClick={addSelectedProduct}>
              Add to cart
            </button>

            <div className="productSpecs">
              <div>
                <span>Material</span>
                <strong>{featuredProduct.material}</strong>
              </div>
              <div>
                <span>Fit</span>
                <strong>Oversized technical silhouette</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>Ships in 3-5 business days</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="relatedSection" id="related">
          <div className="sectionHead">
            <p className="eyebrow">Related Products</p>
            <h2>Complete the signal.</h2>
          </div>
          <div className="relatedGrid">
            {related.map((product) => (
              <article className="relatedCard" key={product.id}>
                <Image src={product.image} alt={product.name} width={520} height={360} />
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.concept}</p>
                  <button type="button" onClick={() => {
                    cart.addItem(product, product.sizes[0]);
                    setIsCartOpen(true);
                  }}>
                    Add / {currency.format(product.price)}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
