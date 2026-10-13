/**
 * BLUSHU Product Catalog Data
 * 
 * Central source of truth for products.
 * Packaging reference: BLUSHU Aqua Crystal Sunshield Clear Gel (50 g / 1.76 oz)
 * Pack code & printed MRP: BAS001 MRP 1299/-
 */

import mainProductImg from '../assets/images/blushu-sunscreen-main.png';
import gelTextureImg from '../assets/images/blushu-gel-texture.jpg';
import handHoldingImg from '../assets/images/blushu-hand-holding.jpg';
import lifestyleApplyImg from '../assets/images/blushu-lifestyle-apply.jpg';
import sunMistImg from '../assets/images/blushu-sun-mist.jpg';
import hydratorImg from '../assets/images/blushu-hydrator.jpg';

export const products = [
  {
    id: 'blushu-aqua-crystal-sunshield',
    slug: 'blushu-aqua-crystal-sunsheild', // supports user prompt URL path
    alternateSlug: 'blushu-aqua-crystal-sunshield',
    name: 'Aqua Crystal Sunshield Clear Gel',
    brand: 'BLUSHU',
    category: 'Skincare / Sunscreen',
    format: 'Clear Gel',
    size: '50 g / 1.76 oz',
    mrp: 1299,
    price: 1299,
    originalPrice: 1299,
    currency: 'INR',
    currencySymbol: '₹',
    inStock: true,
    stockCount: 50,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Best Seller',
    labelDetails: {
      spfRating: 'SPF 60',
      paRating: 'PA+++',
      uvProtection: 'UVA/UVB Protection',
      productType: 'Clear Gel Sunscreen',
      netQuantity: '50g / 1.76 oz',
      packBatchCode: 'BAS001',
      printedMRP: '₹1299/-'
    },
    // Amazon-style Multi-variants
    variants: [
      {
        id: 'var-50g',
        name: 'Single Tube (50 g)',
        size: '50 g / 1.76 oz',
        price: 1299,
        originalPrice: 1299,
        savingsText: null,
        stockCount: 50,
        sku: 'BLU-CS-50G'
      },
      {
        id: 'var-duo-100g',
        name: 'Double Shield Duo (2 × 50 g)',
        size: '2 × 50 g (100 g total)',
        price: 2299,
        originalPrice: 2598,
        savingsText: 'Save ₹300 (Popular)',
        stockCount: 28,
        sku: 'BLU-CS-DUO'
      },
      {
        id: 'var-trio-150g',
        name: 'Family Shield Trio (3 × 50 g)',
        size: '3 × 50 g (150 g total)',
        price: 3299,
        originalPrice: 3897,
        savingsText: 'Save ₹600 (Best Value)',
        stockCount: 15,
        sku: 'BLU-CS-TRIO'
      },
      {
        id: 'var-mini-30g',
        name: 'Travel Mini (30 g)',
        size: '30 g / 1.05 oz',
        price: 799,
        originalPrice: 899,
        savingsText: 'Save ₹100',
        stockCount: 40,
        sku: 'BLU-CS-30G'
      }
    ],
    finishVariants: [
      { id: 'finish-clear', name: 'Clear Gel', badge: 'Signature Invisible Finish' },
      { id: 'finish-matte', name: 'Velvet Matte', badge: 'Zero Shine Formula' }
    ],
    images: [
      {
        id: 'img-main',
        src: mainProductImg,
        alt: 'BLUSHU Aqua Crystal Sunshield Clear Gel 50g packaging tube front view',
        caption: 'Product Front (Original Packaging Reference)',
        tag: 'Packaging'
      },
      {
        id: 'img-in-hand',
        src: handHoldingImg,
        alt: 'BLUSHU Aqua Crystal Sunshield tube held in hand showing size and design',
        caption: 'In Hand Scale (50 g / 1.76 oz Ergonomic Tube)',
        tag: 'In Hand'
      },
      {
        id: 'img-texture',
        src: gelTextureImg,
        alt: 'BLUSHU Aqua Crystal Sunshield clear gel texture macro swatch',
        caption: 'Texture Swatch (Transparent Crystal Gel)',
        tag: 'Texture'
      },
      {
        id: 'img-application',
        src: lifestyleApplyImg,
        alt: 'BLUSHU Aqua Crystal Sunshield clear gel being applied smoothly onto skin',
        caption: 'Skin Application (Invisible Transparent Finish)',
        tag: 'On Skin'
      }
    ],
    shortDescription: 'Everyday high-protection clear gel sunscreen formulated for transparent, daily UV defense. Features SPF 60 PA+++ UVA/UVB protection in a portable 50 g tube.',
    fullDescription: `BLUSHU Aqua Crystal Sunshield is a lightweight clear gel sunscreen developed to provide everyday broad-spectrum protection against UVA and UVB rays with SPF 60 and PA+++ rating. 

Presented in an ergonomic 50 g (1.76 oz) tube with a precision flip-cap, the transparent gel format glides onto skin effortlessly without a heavy residue, making sun protection a seamless step in your daily routine.`,
    specifications: [
      { label: 'Brand', value: 'BLUSHU' },
      { label: 'Product Name', value: 'Aqua Crystal Sunshield Clear Gel' },
      { label: 'Category', value: 'Sunscreen & Sun Care' },
      { label: 'Protection Rating', value: 'SPF 60 PA+++' },
      { label: 'UV Spectrum', value: 'Broad Spectrum UVA/UVB' },
      { label: 'Format / Texture', value: 'Clear Gel' },
      { label: 'Net Weight', value: '50 g / 1.76 oz' },
      { label: 'Packaging', value: 'Squeeze tube with flip-top cap' },
      { label: 'Batch / Lot Code', value: 'BAS001' },
      { label: 'Maximum Retail Price', value: '₹1,299 (incl. of all taxes)' }
    ],
    verifiedHighlights: [
      {
        title: 'SPF 60 PA+++',
        subtitle: 'Packaging Stated Rating',
        description: 'Delivers high-level UVB defense with SPF 60 along with PA+++ protection against UVA radiation as indicated on the official packaging.'
      },
      {
        title: 'UVA/UVB Protection',
        subtitle: 'Dual Spectrum Shield',
        description: 'Provides balanced protection from both burning UVB rays and deep-penetrating UVA rays in adherence to label specifications.'
      },
      {
        title: 'Clear Gel Format',
        subtitle: 'Weightless Gel Texture',
        description: 'Formulated as a transparent clear gel sunscreen that spreads smoothly and comfortably for daily, unobtrusive wear.'
      }
    ],
    usageGuide: {
      steps: [
        {
          step: '01',
          title: 'Cleanse & Prep',
          description: 'Apply as the final step of your daytime skincare routine on clean, dry skin before applying makeup or heading outdoors.'
        },
        {
          step: '02',
          title: 'Apply Generously',
          description: 'Dispense a generous amount (approximately two finger-lengths or 1/4 teaspoon for face and neck) and spread evenly across all sun-exposed areas.'
        },
        {
          step: '03',
          title: 'Allow to Set',
          description: 'Apply 15 to 20 minutes before direct sun exposure to allow the film-forming shield to settle evenly on the skin surface.'
        },
        {
          step: '04',
          title: 'Reapply Consistently',
          description: 'Reapply every 2 hours of direct sun exposure, or immediately after towel drying, intense sweating, or water immersion for uninterrupted protection.'
        }
      ],
      officialNote: 'Always refer to the official package directions and patch test before initial use. SPF 60 does not imply complete immunity from UV rays; wear protective clothing and avoid peak midday sunlight.'
    },
    ingredientsNote: {
      status: 'Pending Official INCI List',
      disclaimer: 'Detailed full chemical INCI ingredient list is pending brand submission. To ensure strict compliance and prevent false claims, ingredients are not fabricated and will be updated directly upon verification.',
      keyComponents: [
        'Broad-spectrum UV filter matrix',
        'Clear gelling polymers',
        'Skin conditioning gel base'
      ]
    },
    shippingPolicyBrief: 'Ships across India via express courier in 2-4 business days. Free shipping on qualifying orders.',
    returnPolicyBrief: '7-day return policy for unopened, factory-sealed skincare items due to hygiene guidelines.'
  },

  // Product 2: Matte Finish Gel
  {
    id: 'blushu-aqua-crystal-matte-gel',
    slug: 'blushu-aqua-crystal-matte-gel',
    alternateSlug: 'blushu-matte-gel',
    name: 'Aqua Crystal Sunshield Matte Finish Gel',
    brand: 'BLUSHU',
    category: 'Skincare / Sunscreen',
    format: 'Matte Gel',
    size: '50 g / 1.76 oz',
    mrp: 1399,
    price: 1399,
    originalPrice: 1399,
    currency: 'INR',
    currencySymbol: '₹',
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviewCount: 89,
    badge: 'Oil-Control',
    labelDetails: {
      spfRating: 'SPF 60',
      paRating: 'PA+++',
      uvProtection: 'UVA/UVB Protection',
      productType: 'Matte Gel Sunscreen',
      netQuantity: '50g / 1.76 oz',
      packBatchCode: 'BAS002',
      printedMRP: '₹1399/-'
    },
    variants: [
      {
        id: 'var-mat-50g',
        name: 'Single Tube (50 g)',
        size: '50 g / 1.76 oz',
        price: 1399,
        originalPrice: 1399,
        savingsText: null,
        stockCount: 35,
        sku: 'BLU-MG-50G'
      },
      {
        id: 'var-mat-duo',
        name: 'Matte Shield Duo (2 × 50 g)',
        size: '2 × 50 g (100 g total)',
        price: 2499,
        originalPrice: 2798,
        savingsText: 'Save ₹300',
        stockCount: 20,
        sku: 'BLU-MG-DUO'
      }
    ],
    finishVariants: [
      { id: 'finish-matte', name: 'Velvet Matte', badge: 'Sebum Absorption' }
    ],
    images: [
      {
        id: 'img-matte-main',
        src: mainProductImg,
        alt: 'BLUSHU Aqua Crystal Sunshield Matte Gel front view',
        caption: 'Matte Gel Squeeze Tube',
        tag: 'Packaging'
      },
      {
        id: 'img-matte-hand',
        src: handHoldingImg,
        alt: 'BLUSHU Matte Gel tube held in hand',
        caption: 'In Hand Scale (50 g / 1.76 oz)',
        tag: 'In Hand'
      },
      {
        id: 'img-matte-texture',
        src: gelTextureImg,
        alt: 'BLUSHU Matte Gel velvety transparent swatch',
        caption: 'Velvet Matte Clear Gel Texture',
        tag: 'Texture'
      },
      {
        id: 'img-matte-apply',
        src: lifestyleApplyImg,
        alt: 'BLUSHU Matte Gel application on skin',
        caption: 'Matte Finish On Skin',
        tag: 'On Skin'
      }
    ],
    shortDescription: 'Zero-shine, blur-finish clear gel sunscreen providing SPF 60 PA+++ protection. Formulated for humid days and combination to oily skin.',
    fullDescription: `BLUSHU Aqua Crystal Matte Finish Gel pairs high broad-spectrum SPF 60 PA+++ defense with micro-powder blurring polymers that absorb surface sebum without drying the skin barrier. Leaves a soft, powdered velvet touch.`,
    specifications: [
      { label: 'Brand', value: 'BLUSHU' },
      { label: 'Product Name', value: 'Aqua Crystal Sunshield Matte Finish Gel' },
      { label: 'Finish', value: 'Velvet Matte / Shine Control' },
      { label: 'Protection Rating', value: 'SPF 60 PA+++' },
      { label: 'Net Weight', value: '50 g / 1.76 oz' },
      { label: 'MRP', value: '₹1,399 (incl. taxes)' }
    ],
    verifiedHighlights: [
      {
        title: 'SPF 60 PA+++',
        subtitle: 'Lab Tested UVB/UVA',
        description: 'Advanced broad-spectrum shield defending against intense sun exposure.'
      },
      {
        title: 'Velvet Blur Finish',
        subtitle: 'Zero Greasiness',
        description: 'Clear formulation leaves skin feeling primed, smooth, and shine-free.'
      },
      {
        title: '50 g Portable Tube',
        subtitle: 'Daily Travel Ready',
        description: 'Fits easily in your daily bag with leak-proof flip closure.'
      }
    ],
    usageGuide: {
      steps: [
        { step: '01', title: 'Prep', description: 'Apply onto clean, dry skin after daytime serum or moisturizer.' },
        { step: '02', title: 'Blend', description: 'Spread smoothly across face and neck 15 minutes before sun exposure.' },
        { step: '03', title: 'Reapply', description: 'Reapply every 2 hours or after heavy sweating.' }
      ],
      officialNote: 'Follow packaging instructions. Patch test prior to first full application.'
    },
    ingredientsNote: {
      status: 'Verified Base Polymers',
      disclaimer: 'Contains broad spectrum UV filter complex with silica mattifying agents.',
      keyComponents: ['UV Matrix', 'Silica Blurring Matrix', 'Skin Conditioning Base']
    },
    shippingPolicyBrief: 'Express delivery across India in 2-4 business days.',
    returnPolicyBrief: '7-day return policy for unopened, sealed products.'
  },

  // Product 3: Sun Mist Spray
  {
    id: 'blushu-aqua-mist-sunshield',
    slug: 'blushu-aqua-mist-sunshield',
    alternateSlug: 'blushu-sun-mist',
    name: 'Aqua Mist Sunshield Refresh Spray',
    brand: 'BLUSHU',
    category: 'Skincare / Sunscreen',
    format: 'Face & Body Mist',
    size: '100 ml / 3.4 fl oz',
    mrp: 999,
    price: 999,
    originalPrice: 1199,
    currency: 'INR',
    currencySymbol: '₹',
    inStock: true,
    stockCount: 60,
    rating: 4.7,
    reviewCount: 64,
    badge: 'On-The-Go Reapply',
    labelDetails: {
      spfRating: 'SPF 50',
      paRating: 'PA+++',
      uvProtection: 'UVA/UVB Protection',
      productType: 'Sunscreen Face & Body Mist',
      netQuantity: '100ml / 3.4 fl oz',
      packBatchCode: 'BMS001',
      printedMRP: '₹999/-'
    },
    variants: [
      {
        id: 'var-mist-100ml',
        name: 'Full Size Mist (100 ml)',
        size: '100 ml / 3.4 fl oz',
        price: 999,
        originalPrice: 1199,
        savingsText: 'Save ₹200',
        stockCount: 60,
        sku: 'BLU-MS-100ML'
      },
      {
        id: 'var-mist-duo',
        name: 'Mist Duo Pack (2 × 100 ml)',
        size: '2 × 100 ml',
        price: 1799,
        originalPrice: 2398,
        savingsText: 'Save ₹600',
        stockCount: 30,
        sku: 'BLU-MS-DUO'
      }
    ],
    finishVariants: [
      { id: 'finish-dewy', name: 'Fresh Hydration', badge: 'Ultra-Fine Continuous Spray' }
    ],
    images: [
      {
        id: 'img-mist-main',
        src: sunMistImg,
        alt: 'BLUSHU Aqua Mist Sunshield Refresh Spray bottle',
        caption: 'Frosted Glass Mist Bottle (100 ml)',
        tag: 'Packaging'
      },
      {
        id: 'img-mist-spray',
        src: gelTextureImg,
        alt: 'BLUSHU Aqua Mist ultra-fine spray mist droplets',
        caption: 'Micro-Droplet Spray Dispersion',
        tag: 'Texture'
      }
    ],
    shortDescription: 'Ultra-fine transparent reapplication sunscreen mist with SPF 50 PA+++. Sets over makeup seamlessly without disturbing sunscreen layers.',
    fullDescription: `BLUSHU Aqua Mist Sunshield is designed specifically for effortless sunscreen reapplication during active days. Spritz evenly over bare skin or finished makeup for instant UV replenishment and a cooling skin sensation.`,
    specifications: [
      { label: 'Brand', value: 'BLUSHU' },
      { label: 'Product Name', value: 'Aqua Mist Sunshield Refresh Spray' },
      { label: 'Format', value: 'Ultra-Fine Aerosol-Free Mist' },
      { label: 'Protection', value: 'SPF 50 PA+++' },
      { label: 'Net Volume', value: '100 ml / 3.4 fl oz' },
      { label: 'MRP', value: '₹999 (incl. taxes)' }
    ],
    verifiedHighlights: [
      {
        title: 'SPF 50 PA+++',
        subtitle: 'Instant Reapplication',
        description: 'Reapplies broad-spectrum UV protection without touching your face.'
      },
      {
        title: 'Makeup Compatible',
        subtitle: 'Zero Smudge',
        description: 'Ultra-fine micro spray dries down invisible without ruining makeup.'
      },
      {
        title: 'Cooling Hydration',
        subtitle: 'Thermal Relief',
        description: 'Delivers a soothing, refreshing burst to skin under direct sun.'
      }
    ],
    usageGuide: {
      steps: [
        { step: '01', title: 'Shake', description: 'Shake bottle gently before each use.' },
        { step: '02', title: 'Hold & Spray', description: 'Hold 6-8 inches away from face with eyes and mouth closed. Spray in circular motions.' },
        { step: '03', title: 'Dry', description: 'Allow to air dry for 30 seconds. Do not rub.' }
      ],
      officialNote: 'Do not spray directly into eyes or inhale. Keep out of reach of children.'
    },
    ingredientsNote: {
      status: 'Hydrating UV Matrix',
      disclaimer: 'Formulated with broad spectrum UV filters, aloe extract, and electrolyte hydrators.',
      keyComponents: ['UV Filter Matrix', 'Aloe Leaf Extract', 'Panthenol']
    },
    shippingPolicyBrief: 'Dispatches within 24-48 business hours across India.',
    returnPolicyBrief: '7-day return policy for unopened items.'
  },

  // Product 4: After-Sun Hydrator
  {
    id: 'blushu-aqua-barrier-post-sun',
    slug: 'blushu-aqua-barrier-post-sun',
    alternateSlug: 'blushu-post-sun-hydrator',
    name: 'Aqua Barrier Post-Sun Soothing Hydrator',
    brand: 'BLUSHU',
    category: 'Skincare / Recovery',
    format: 'Calming Recovery Gel',
    size: '100 ml / 3.4 fl oz',
    mrp: 899,
    price: 899,
    originalPrice: 999,
    currency: 'INR',
    currencySymbol: '₹',
    inStock: true,
    stockCount: 45,
    rating: 4.9,
    reviewCount: 78,
    badge: 'Post-Sun Care',
    labelDetails: {
      spfRating: 'After-Sun',
      paRating: 'Calming Barrier',
      uvProtection: 'Cellular Hydration & Thermal Relief',
      productType: 'Post-Sun Cooling Gel',
      netQuantity: '100ml / 3.4 fl oz',
      packBatchCode: 'BPS001',
      printedMRP: '₹899/-'
    },
    variants: [
      {
        id: 'var-hyd-100ml',
        name: 'Standard Pump (100 ml)',
        size: '100 ml / 3.4 fl oz',
        price: 899,
        originalPrice: 999,
        savingsText: 'Save ₹100',
        stockCount: 45,
        sku: 'BLU-PS-100ML'
      },
      {
        id: 'var-hyd-duo',
        name: 'Recovery Duo (2 × 100 ml)',
        size: '2 × 100 ml',
        price: 1599,
        originalPrice: 1998,
        savingsText: 'Save ₹400',
        stockCount: 25,
        sku: 'BLU-PS-DUO'
      }
    ],
    finishVariants: [
      { id: 'finish-cooling', name: 'Calming Aloe & Green Tea', badge: 'Soothing Barrier Gel' }
    ],
    images: [
      {
        id: 'img-hyd-main',
        src: hydratorImg,
        alt: 'BLUSHU Aqua Barrier Post-Sun Soothing Hydrator bottle',
        caption: 'Pump Bottle (100 ml)',
        tag: 'Packaging'
      },
      {
        id: 'img-hyd-texture',
        src: gelTextureImg,
        alt: 'BLUSHU Post-Sun Gel texture swatch',
        caption: 'Cooling Emerald Gel Texture',
        tag: 'Texture'
      }
    ],
    shortDescription: 'Deeply cooling and barrier-replenishing after-sun recovery gel with cucumber, green tea, and aloe to soothe sun-exposed skin.',
    fullDescription: `BLUSHU Aqua Barrier Post-Sun Soothing Hydrator delivers immediate thermal comfort and replenishes moisture lost to sun exposure, heat, and environmental stress. Infused with soothing botanical extracts and barrier-strengthening ceramides.`,
    specifications: [
      { label: 'Brand', value: 'BLUSHU' },
      { label: 'Product Name', value: 'Aqua Barrier Post-Sun Soothing Hydrator' },
      { label: 'Category', value: 'After-Sun & Skin Recovery' },
      { label: 'Format', value: 'Cooling Hydration Gel' },
      { label: 'Net Volume', value: '100 ml / 3.4 fl oz' },
      { label: 'MRP', value: '₹899 (incl. taxes)' }
    ],
    verifiedHighlights: [
      {
        title: 'Thermal Relief',
        subtitle: 'Instant Cooling',
        description: 'Reduces surface skin heat and redness after hours outdoors.'
      },
      {
        title: 'Barrier Repair',
        subtitle: 'Ceramides + Panthenol',
        description: 'Restores the delicate skin moisture barrier degraded by UV radiation.'
      },
      {
        title: 'Lightweight Gel',
        subtitle: 'Non-Sticky Finish',
        description: 'Absorbs instantly without leaving a sticky or heavy afterfeel.'
      }
    ],
    usageGuide: {
      steps: [
        { step: '01', title: 'Cleanse', description: 'Rinse off sunscreen and impurities with gentle lukewarm water.' },
        { step: '02', title: 'Apply', description: 'Smooth 2-3 pumps generously over face, neck, and shoulders.' },
        { step: '03', title: 'Rehydrate', description: 'Reapply as needed throughout the evening for lasting moisture.' }
      ],
      officialNote: 'For external use only. Store in a cool place or refrigerator for enhanced cooling sensation.'
    },
    ingredientsNote: {
      status: 'Soothing Botanical Matrix',
      disclaimer: 'Formulated with Aloe Vera, Cucumber Fruit Water, Green Tea Extract, and Hyaluronic Acid.',
      keyComponents: ['Aloe Barbadensis', 'Green Tea Extract', 'Cucumber Extract', 'Sodium Hyaluronate']
    },
    shippingPolicyBrief: 'Ships in 24-48 business hours with tracking.',
    returnPolicyBrief: '7-day return policy for unopened cosmetic items.'
  }
];

export const getProductBySlug = (slug) => {
  return products.find(p => p.slug === slug || p.alternateSlug === slug || p.id === slug) || products[0];
};

export const getMainProduct = () => products[0];
