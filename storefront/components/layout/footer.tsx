'use client'

import Link from 'next/link'
import { Heart, Lock, Package } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'New Arrivals', href: '/products?sort=newest' },
    { label: 'Collections', href: '/collections' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'About', href: '/about' },
  ]

  if (policies?.privacy_policy) {
    companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  }
  if (policies?.terms_of_service) {
    companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  }
  if (policies?.refund_policy) {
    companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  }
  if (policies?.cookie_policy) {
    companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })
  }

  return (
    <footer className="border-t" style={{ borderColor: 'hsl(var(--border))' }}>
      {/* Discreet Shipping Banner */}
      <div className="py-4 border-b" style={{ background: 'var(--brand-blush)' }}>
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" style={{ color: 'var(--brand-secondary)' }} strokeWidth={1.5} />
              <span className="text-foreground/70">Discreet Packaging — No labels, no hints</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" style={{ color: 'var(--brand-secondary)' }} strokeWidth={1.5} />
              <span className="text-foreground/70">Private Billing — &quot;Velour Wellness&quot; on statements</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" style={{ color: 'var(--brand-secondary)' }} strokeWidth={1.5} />
              <span className="text-foreground/70">Body-Safe Materials — Only the best for you</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-section-sm" style={{ background: 'hsl(var(--background))' }}>
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold" style={{ color: 'var(--brand-primary)' }}>
                Velour
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium intimacy wellness, crafted for pleasure and self-confidence. Delivered with complete discretion.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Velour. All rights reserved. For adults 18+.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Manage Cookies
            </button>
            <span className="text-xs text-muted-foreground">Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
