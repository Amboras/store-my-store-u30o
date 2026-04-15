'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, Package, Sparkles, Heart, Star, Lock } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { useProducts } from '@/hooks/use-products'
import ProductCard from '@/components/product/product-card'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80'
const EDITORIAL_IMAGE = 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=1200&q=80'

export default function HomePage() {
  const { data: collections, isLoading: collectionsLoading } = useCollections()
  const { data: productsData } = useProducts({ limit: 4 })
  const products = productsData?.products || []
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #2d1a2e 0%, #5a2d5c 60%, #8b4a6e 100%)' }}>
        <div className="container-custom grid lg:grid-cols-2 gap-8 items-center py-20 lg:py-28">
          {/* Text */}
          <div className="space-y-7 animate-fade-in-up relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{ background: 'rgba(201,127,165,0.2)', color: '#e8a8c8', border: '1px solid rgba(201,127,165,0.3)' }}>
              <Sparkles className="h-3.5 w-3.5" />
              Premium Intimacy Wellness
            </div>
            <h1 className="text-display font-heading font-semibold text-balance leading-tight" style={{ color: '#f9f0f5', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              Designed for Your
              <br />
              <span style={{ color: '#e8a8c8' }}>Pleasure & Confidence</span>
            </h1>
            <p className="text-lg max-w-md leading-relaxed" style={{ color: 'rgba(249,240,245,0.75)' }}>
              Luxury-grade intimacy products crafted from body-safe materials. Because you deserve the very best — delivered discreetly to your door.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all hover:opacity-90 rounded-sm"
                style={{ background: '#c97fa5', color: '#fff' }}
                prefetch={true}
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border px-8 py-3.5 text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors rounded-sm"
                style={{ borderColor: 'rgba(249,240,245,0.35)', color: '#f9f0f5' }}
                prefetch={true}
              >
                Our Philosophy
              </Link>
            </div>
            {/* Quick trust signals */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: Package, label: 'Discreet Shipping' },
                { icon: Shield, label: 'Body-Safe Certified' },
                { icon: Lock, label: 'Private Billing' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: '#e8a8c8' }} strokeWidth={1.5} />
                  <span className="text-xs" style={{ color: 'rgba(249,240,245,0.65)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(201,127,165,0.2)' }}>
              <Image
                src={HERO_IMAGE}
                alt="Velour premium intimacy wellness collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,26,46,0.4) 0%, transparent 60%)' }} />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-xl flex items-center gap-3">
              <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">4.9 / 5 Rating</p>
                <p className="text-[10px] text-muted-foreground">from 2,400+ customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle decorative orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(201,127,165,0.08)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(90,45,92,0.4)' }} />
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────── */}
      <section className="py-5 border-y" style={{ background: 'var(--brand-blush)', borderColor: 'hsl(var(--border))' }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { icon: Truck, title: 'Free Shipping', sub: 'On orders over $60' },
              { icon: Package, title: 'Discreet Packaging', sub: 'Plain boxes, no labels' },
              { icon: Shield, title: 'Body-Safe Only', sub: 'Medical-grade materials' },
              { icon: Lock, title: 'Private Billing', sub: '"Velour" on statements' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,127,165,0.15)' }}>
                  <Icon className="h-4 w-4" style={{ color: 'var(--brand-secondary)' }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{title}</p>
                  <p className="text-[11px] text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────── */}
      {products.length > 0 && (
        <section className="py-section">
          <div className="container-custom">
            <div className="text-center mb-12 space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: 'var(--brand-secondary)' }}>
                Bestsellers
              </p>
              <h2 className="text-h2 font-heading font-semibold">Our Most-Loved Products</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm">
                Thoughtfully designed for every body. Explore our top-rated collection.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide border transition-all hover:opacity-80 rounded-sm"
                style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
              >
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Collections */}
      {!collectionsLoading && collections && collections.length > 0 && (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      )}

      {/* ── BRAND STORY / EDITORIAL ─────────────────────────── */}
      <section className="py-section" style={{ background: 'var(--brand-blush)' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: 'var(--brand-secondary)' }}>
                The Velour Promise
              </p>
              <h2 className="text-h2 font-heading font-semibold">
                Pleasure is Personal — We Take it Seriously
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every Velour product is crafted from body-safe, medical-grade silicone — free from phthalates, BPA, and harmful chemicals. We believe intimacy products should meet the same standards as anything else you put near your body.
              </p>
              <ul className="space-y-3">
                {[
                  'Certified body-safe, phthalate-free materials',
                  'Whisper-quiet motors for complete privacy',
                  'Rechargeable — no batteries, no interruptions',
                  'IPX7 waterproof — adventure-ready',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-secondary)' }} strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide pb-0.5 link-underline"
                style={{ color: 'var(--brand-primary)' }}
                prefetch={true}
              >
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/5] rounded-xl overflow-hidden relative shadow-xl">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Velour brand philosophy — clean, luxurious intimacy wellness"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL SECOND ────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] rounded-xl overflow-hidden relative shadow-xl">
              <Image
                src={EDITORIAL_IMAGE}
                alt="Velour — intimate wellness for modern adults"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: 'var(--brand-secondary)' }}>
                For Every Body
              </p>
              <h2 className="text-h2 font-heading font-semibold">
                Inclusive Pleasure, Uncompromising Quality
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Velour products are designed without assumptions — body-inclusive, gender-neutral, and made to complement every lifestyle. From solo exploration to partnered intimacy, our collection grows with you.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all hover:opacity-90 rounded-sm"
                style={{ background: 'var(--brand-primary)', color: '#fff' }}
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────── */}
      <section className="py-section" style={{ background: 'linear-gradient(135deg, #2d1a2e 0%, #5a2d5c 100%)' }}>
        <div className="container-custom max-w-xl text-center">
          {newsletterSubmitted ? (
            <div className="space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ background: 'rgba(201,127,165,0.2)' }}>
                <Heart className="h-6 w-6" style={{ color: '#e8a8c8' }} />
              </div>
              <h2 className="text-h3 font-heading font-semibold" style={{ color: '#f9f0f5' }}>You&apos;re on the list</h2>
              <p style={{ color: 'rgba(249,240,245,0.65)' }} className="text-sm">Exclusive offers and new arrivals coming your way.</p>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-[0.25em] font-medium mb-3" style={{ color: '#e8a8c8' }}>
                The Inner Circle
              </p>
              <h2 className="text-h2 font-heading font-semibold" style={{ color: '#f9f0f5' }}>
                15% Off Your First Order
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(249,240,245,0.65)' }}>
                Join our private newsletter for exclusive offers, launch previews, and intimate wellness tips. Discreet, always.
              </p>
              <form className="mt-8 flex gap-2 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors rounded-sm"
                  style={{ color: '#f9f0f5' }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap rounded-sm"
                  style={{ background: '#c97fa5', color: '#fff' }}
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-[11px]" style={{ color: 'rgba(249,240,245,0.35)' }}>
                No spam. Unsubscribe anytime. Your data stays private.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
