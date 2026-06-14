"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartButton, CartDrawer, currency, useCart } from "./CartDrawer";
import { featuredProduct, products } from "../data";

function Nav({ cart, onCartOpen }) {
  return (
    <header className="siteNav">
      <Link className="brandLockup" href="/" aria-label="8:8 home">
        <span className="brandSigil" aria-hidden="true" />
        <span>8:8</span>
      </Link>
      <nav aria-label="Primary navigation">
        <a href="#collection">Collection</a>
        <Link href="/product">Product</Link>
        <a href="#archive">Archive</a>
      </nav>
      <CartButton count={cart.count} onClick={onCartOpen} />
    </header>
  );
}

function ProductCard({ product, index, onAdd }) {
  return (
    <article className="luxuryCard" style={{ "--delay": `${index * 90}ms` }}>
      <Link className="productMedia" href="/product" aria-label={`View ${product.name}`}>
        <Image src={product.image} alt={product.name} width={900} height={600} />
      </Link>
      <div className="productCardMeta">
        <div>
          <p>Artifact 0{index + 8}</p>
          <h3>{product.name}</h3>
          <span>{product.concept}</span>
        </div>
        <div className="productCardActions">
          <strong>{currency.format(product.price)}</strong>
          <button type="button" onClick={() => onAdd(product)}>Add</button>
        </div>
      </div>
    </article>
  );
}

export default function Storefront() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();

  function addToCart(product) {
    cart.addItem(product, product.sizes[1] || product.sizes[0]);
    setIsCartOpen(true);
  }

  return (
    <div className="site">
      <Nav cart={cart} onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} />

      <main>
        <section className="homeHero">
          <div className="heroBackdrop" aria-hidden="true">
            <Image src="/assets/campaign-88.png" alt="" fill priority sizes="100vw" />
          </div>
          <div className="heroConstellation" aria-hidden="true" />
          <div className="heroInner">
            <p className="eyebrow">Signal 08.08 / Infinite Evolution</p>
            <div className="heroMark" aria-hidden="true">
              <span />
              <span />
            </div>
            <h1>Beyond Limits</h1>
            <p className="heroCopy">
              Luxury streetwear for the private interval between who you are and who you become.
            </p>
            <div className="heroActions">
              <a className="primaryAction" href="#collection">Shop Collection</a>
              <Link className="secondaryAction" href="/product">Explore Product</Link>
            </div>
          </div>
          <div className="heroIndex" aria-hidden="true">
            <span>Archive 08</span>
            <span>Coordinates N 08.08</span>
          </div>
        </section>

        <section className="editorialStrip" id="archive">
          <div>
            <p className="eyebrow">The Space Between</p>
            <h2>Built like a secret archive, worn like a future uniform.</h2>
          </div>
          <p>
            8:8 compresses celestial navigation, sacred geometry, and technical streetwear into
            pieces that feel discovered rather than released.
          </p>
        </section>

        <section className="collectionSection" id="collection">
          <div className="sectionHead">
            <p className="eyebrow">Featured Product Section</p>
            <h2>Objects for the next state.</h2>
            <Link href="/product">View detail page</Link>
          </div>
          <div className="productGrid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <section className="signatureSection">
          <div className="signatureImage">
            <Image src={featuredProduct.image} alt={featuredProduct.name} width={1100} height={820} />
          </div>
          <div className="signatureCopy">
            <p className="eyebrow">Signature System</p>
            <h2>{featuredProduct.name}</h2>
            <p>{featuredProduct.material}. A cinematic shell designed with quiet hardware and an infinity seam language.</p>
            <button className="primaryAction" type="button" onClick={() => addToCart(featuredProduct)}>
              Add to cart / {currency.format(featuredProduct.price)}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
