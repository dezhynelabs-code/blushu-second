import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductBySlug, products } from '../data/products';
import { ProductGallery } from '../components/ProductGallery';
import { QuantitySelector } from '../components/QuantitySelector';
import { ProductCard } from '../components/ProductCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  ShoppingBag,
  Zap,
  Heart,
  Shield,
  CheckCircle2,
  Truck,
  RotateCcw,
  Info,
  ChevronRight,
  Tag,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  // Variant states (Amazon style)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishVariants && product.finishVariants.length > 0 ? product.finishVariants[0] : null
  );

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Reset variant state when route changes
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    if (product.finishVariants && product.finishVariants.length > 0) {
      setSelectedFinish(product.finishVariants[0]);
    } else {
      setSelectedFinish(null);
    }
    setQuantity(1);
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block text-[#087F68] font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Calculate current active pricing & specs based on selected variant
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentSavings = selectedVariant ? selectedVariant.savingsText : null;
  const currentStock = selectedVariant ? selectedVariant.stockCount : product.stockCount;
  const currentSize = selectedVariant ? selectedVariant.size : product.size;
  const currentSku = selectedVariant ? selectedVariant.sku : 'BLU-001';

  const isFavorited = isInWishlist(product.id);

  // Build product item payload with variant details for Cart
  const getCartProductItem = () => {
    return {
      ...product,
      id: selectedVariant ? `${product.id}_${selectedVariant.id}` : product.id,
      name: selectedVariant
        ? `${product.name} - ${selectedVariant.name}${selectedFinish ? ` (${selectedFinish.name})` : ''}`
        : product.name,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      size: currentSize,
      stockCount: currentStock,
      selectedVariantName: selectedVariant?.name,
      selectedFinishName: selectedFinish?.name
    };
  };

  const handleAddToCart = () => {
    const cartItem = getCartProductItem();
    addToCart(cartItem, quantity, true);
  };

  const handleBuyNow = () => {
    const cartItem = getCartProductItem();
    addToCart(cartItem, quantity, false);
    navigate('/checkout');
  };

  // Related products from BLUSHU catalog (filter out current)
  const relatedProducts = products.filter(p => p.id !== product.id);

  return (
    <div className="pb-24">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <ol className="flex items-center space-x-2 text-xs text-[#69736E]">
          <li>
            <Link to="/" className="hover:text-[#087F68] transition-colors">Home</Link>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5" /></li>
          <li>
            <Link to="/shop" className="hover:text-[#087F68] transition-colors">Shop</Link>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5" /></li>
          <li className="font-semibold text-[#202A26] truncate max-w-xs">{product.name}</li>
        </ol>
      </nav>

      {/* Main 2-Column Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Amazon-style Gallery with Loupe Zoom */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <ProductGallery product={product} />

            {/* Packaging Note Flag */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Official Packaging Verification Note:</span> The physical tube printed label reads 
                <code className="mx-1 px-1.5 py-0.5 bg-amber-100 rounded font-semibold text-amber-950">
                  {product.labelDetails?.packBatchCode ? `BAS001 MRP 1299/-` : 'BLUSHU Pack'}
                </code> 
                with broad-spectrum UVA/UVB defense. Hover over the product image to inspect high-resolution cap and label details.
              </div>
            </div>
          </div>

          {/* Right Column: Details, Amazon Multi-Variants & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#087F68]">
                  {product.brand} • {product.category}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5F0] text-[#075E50] text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F68]" />
                  <span>{currentStock > 0 ? `In Stock (${currentStock} available)` : 'Out of Stock'}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202A26] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Size & Format Pill */}
              <div className="mt-2 flex flex-wrap items-center gap-2.5 text-xs text-[#69736E]">
                <span className="font-semibold text-[#202A26] bg-[#F8F8F3] px-2.5 py-1 rounded-md border border-[#E3ECE7]">
                  {currentSize}
                </span>
                <span>•</span>
                <span className="font-semibold text-[#202A26] bg-[#F8F8F3] px-2.5 py-1 rounded-md border border-[#E3ECE7]">
                  {product.format}
                </span>
                <span>•</span>
                <span className="font-bold text-[#087F68]">
                  {product.labelDetails?.spfRating} {product.labelDetails?.paRating}
                </span>
                <span className="text-[10px] text-[#69736E] font-mono ml-auto">
                  SKU: {currentSku}
                </span>
              </div>

              {/* Price & Amazon Savings */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#202A26]">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <span className="text-sm text-[#69736E] line-through">
                    ₹{currentOriginalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {currentSavings && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF5F0] text-[#075E50] border border-[#D1E7DC]">
                    {currentSavings}
                  </span>
                )}
                <span className="text-xs text-[#69736E] ml-auto">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Amazon-Style Multi-Variant Selector 1: Size & Pack Options */}
            {product.variants && product.variants.length > 0 && (
              <div className="p-4 bg-white rounded-2xl border border-[#D1E7DC] space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#202A26] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#087F68]" />
                    <span>Select Size / Package Bundle:</span>
                  </span>
                  <span className="text-[#087F68] font-semibold">
                    {selectedVariant?.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#087F68] bg-[#EAF5F0]/50 ring-2 ring-[#087F68]/30 shadow-xs'
                            : 'border-[#E3ECE7] hover:border-[#A3E5D0] bg-[#F8F8F3]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#202A26]">
                            {variant.name}
                          </span>
                          <span className="text-xs font-black text-[#087F68]">
                            ₹{variant.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#69736E] mt-1">
                          <span>{variant.size}</span>
                          {variant.savingsText && (
                            <span className="text-[10px] font-bold text-[#075E50] bg-white px-1.5 py-0.5 rounded border border-[#D1E7DC]">
                              {variant.savingsText}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Amazon-Style Multi-Variant Selector 2: Formula Finish */}
            {product.finishVariants && product.finishVariants.length > 1 && (
              <div className="p-4 bg-white rounded-2xl border border-[#D1E7DC] space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#202A26] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#087F68]" />
                    <span>Formula Finish:</span>
                  </span>
                  <span className="text-[#087F68] font-semibold">{selectedFinish?.name}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.finishVariants.map((finish) => {
                    const isSelected = selectedFinish?.id === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#087F68] text-white border-[#087F68] shadow-xs'
                            : 'bg-[#F8F8F3] text-[#202A26] border-[#E3ECE7] hover:bg-[#EAF5F0]'
                        }`}
                      >
                        {finish.name} • {finish.badge}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="text-sm text-[#69736E] leading-relaxed border-t border-[#E3ECE7] pt-4">
              {product.shortDescription}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#202A26]">Quantity:</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => Math.min(currentStock, q + 1))}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                  max={currentStock}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="sm:col-span-6 py-4 px-6 rounded-xl border-2 border-[#087F68] text-[#087F68] hover:bg-[#EAF5F0] text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="sm:col-span-5 py-4 px-6 rounded-xl bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`sm:col-span-1 p-4 rounded-xl border flex items-center justify-center transition-colors ${
                    isFavorited
                      ? 'border-[#087F68] bg-[#087F68] text-white'
                      : 'border-[#D1E7DC] bg-white text-[#69736E] hover:text-[#087F68]'
                  }`}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E3ECE7] text-xs text-[#69736E]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#087F68]" />
                <span>Express dispatch in 24-48 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#087F68]" />
                <span>7-Day unopened item returns</span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="pt-6 border-t border-[#E3ECE7]">
              <div className="flex border-b border-[#E3ECE7] overflow-x-auto gap-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'usage', label: 'How to Use' },
                  { id: 'ingredients', label: 'Ingredients' },
                  { id: 'shipping', label: 'Shipping & Returns' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-4 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? 'border-[#087F68] text-[#087F68]'
                        : 'border-transparent text-[#69736E] hover:text-[#202A26]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="py-6">
                {activeTab === 'overview' && (
                  <div className="space-y-5 animate-fade-in text-sm text-[#69736E] leading-relaxed">
                    <p>{product.fullDescription}</p>

                    <div className="border border-[#E3ECE7] rounded-xl overflow-hidden mt-4">
                      <table className="w-full text-xs">
                        <tbody className="divide-y divide-[#E3ECE7]">
                          {product.specifications.map((spec, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F8F3]'}>
                              <td className="py-2.5 px-4 font-semibold text-[#202A26] w-1/3">{spec.label}</td>
                              <td className="py-2.5 px-4 text-[#69736E]">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'usage' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-xs text-[#69736E]">
                      Follow recognized dermatological sunscreen usage guidance for full broad-spectrum defense:
                    </p>
                    <div className="space-y-3">
                      {product.usageGuide.steps.map((st) => (
                        <div key={st.step} className="p-3.5 bg-white rounded-xl border border-[#E3ECE7] text-left">
                          <span className="text-xs font-bold text-[#087F68]">{st.step}. {st.title}</span>
                          <p className="text-xs text-[#69736E] mt-1">{st.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-[#EAF5F0] text-[#075E50] rounded-xl text-xs">
                      <strong>Official Advisory:</strong> {product.usageGuide.officialNote}
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-4 animate-fade-in text-left">
                    <div className="p-4 bg-white rounded-xl border border-[#E3ECE7]">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-[#087F68]" />
                        <h4 className="text-sm font-bold text-[#202A26]">{product.ingredientsNote.status}</h4>
                      </div>
                      <p className="text-xs text-[#69736E] leading-relaxed">
                        {product.ingredientsNote.disclaimer}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F8F8F3] rounded-xl border border-[#E3ECE7]">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#202A26] mb-2">
                        Key Formulation Matrix
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-xs text-[#69736E]">
                        {product.ingredientsNote.keyComponents.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-4 animate-fade-in text-xs text-[#69736E] leading-relaxed text-left">
                    <div className="p-4 bg-white rounded-xl border border-[#E3ECE7]">
                      <h4 className="text-sm font-bold text-[#202A26] mb-1">Shipping Across India</h4>
                      <p>
                        Orders are dispatched in 24–48 business hours via premier courier partners (BlueDart, Delhivery). Delivery is expected within 3–5 business days.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-[#E3ECE7]">
                      <h4 className="text-sm font-bold text-[#202A26] mb-1">Hygiene & Return Standards</h4>
                      <p>
                        As a personal skincare cosmetic product, items can only be returned within 7 days of delivery if unopened, with outer seal intact.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3ECE7] p-3 px-4 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-[#69736E] block font-semibold">
            {selectedVariant ? selectedVariant.name : 'Total'}
          </span>
          <span className="text-base font-extrabold text-[#202A26]">
            ₹{(currentPrice * quantity).toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(q => Math.min(currentStock, q + 1))}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
            max={currentStock}
            size="sm"
          />
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-[#087F68] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Related Products Section (Amazon Style "Frequently Bought Together" & Catalog) */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-[#E3ECE7] text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
                Complete Your Sun Care Ritual
              </span>
              <h2 className="text-2xl font-extrabold text-[#202A26] mt-1">
                More from BLUSHU
              </h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-[#087F68] hover:underline">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Product FAQs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-[#E3ECE7]">
        <FAQAccordion
          title="Questions About Aqua Crystal Sunshield"
          subtitle="Everything you need to know about SPF 60 protection and daily usage."
        />
      </div>
    </div>
  );
};
