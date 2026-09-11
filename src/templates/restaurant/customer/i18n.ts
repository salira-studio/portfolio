export type Language = 'en' | 'ta'

export const SUPPORTED_LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
]

export const translations: Record<string, Record<Language, string>> = {
  // ── Layout & Navigation ──
  'layout.announceOpen': {
    en: 'Annachies is Open',
    ta: 'அண்ணாச்சிஸ் திறந்துள்ளது',
  },
  'layout.announceLocation': {
    en: 'Siruvani Main Road, Karunya Nagar, Coimbatore · Dine-In, Parcel & Delivery',
    ta: 'சிறுவாணி மெயின் ரோடு, கருண்யா நகர், கோயம்புத்தூர் · உணவருந்த, பார்சல் & டெலிவரி',
  },
  'layout.portfolio': {
    en: '← Portfolio',
    ta: '← போர்ட்ஃபோலியோ',
  },
  'layout.ownerConsole': {
    en: 'Owner Console',
    ta: 'உரிமையாளர் கன்சோல்',
  },
  'layout.brandName': {
    en: 'Annachies',
    ta: 'அண்ணாச்சிஸ்',
  },
  'layout.brandSubtitle': {
    en: 'South Indian Kitchen',
    ta: 'தென்னிந்திய சமையலறை',
  },
  'layout.navHome': {
    en: 'Home',
    ta: 'முகப்பு',
  },
  'layout.navMenu': {
    en: 'Explore Menu',
    ta: 'மெனு',
  },
  'layout.navStory': {
    en: 'Our Story',
    ta: 'எங்கள் பாரம்பரியம்',
  },
  'layout.navLocation': {
    en: 'Hours & Location',
    ta: 'நேரம் & முகவரி',
  },
  'layout.navOrders': {
    en: 'My Orders',
    ta: 'என் ஆர்டர்கள்',
  },
  'layout.bag': {
    en: 'Bag',
    ta: 'கூடை',
  },
  'layout.tracking': {
    en: 'Tracking',
    ta: 'கண்காணிப்பு',
  },
  'layout.trackingOrder': {
    en: 'Tracking #',
    ta: 'கண்காணிப்பு எண் #',
  },
  'layout.footerDesc': {
    en: 'Steeped in the rich culinary heritage of Kongu Nadu and Tamil Nadu. Pure sesame oil, heirloom recipes, fresh stone grinding, and pure country ghee.',
    ta: 'கொங்கு மற்றும் தமிழக சமையல் பாரம்பரியத்தில் உருவான உணவகம். தூய நல்லெண்ணெய், பாரம்பரிய செய்முறை, ஆட்டுக்கல் அரைப்பு மற்றும் சுத்தமான நாட்டு நெய்.',
  },
  'layout.footerTagline': {
    en: 'Authentic South Indian Kitchen',
    ta: 'ஆத்திரிசிய தென்னிந்திய சமையல்',
  },
  'layout.footerExplore': {
    en: 'Explore',
    ta: 'பிரிவுகள்',
  },
  'layout.footerDiningHours': {
    en: 'Dining Hours',
    ta: 'உணவு நேரம்',
  },
  'layout.footerFindUs': {
    en: 'Find Us',
    ta: 'எங்குள்ளோம்',
  },
  'layout.footerMenuSpecialties': {
    en: 'Menu & Specialties',
    ta: 'மெனு & சிறப்பு உணவுகள்',
  },
  'layout.footerOrderOnline': {
    en: 'Order Online',
    ta: 'ஆன்லைன் ஆர்டர்',
  },
  'layout.footerLiveTrack': {
    en: 'Live Track Order',
    ta: 'நேரடி ஆர்டர் கண்காணிப்பு',
  },
  'layout.footerPrivacy': {
    en: 'Privacy & Dietary Policy',
    ta: 'தனியுரிமை கொள்கை',
  },
  'layout.morningTiffin': {
    en: 'Morning Tiffin: 7:00 AM – 11:30 AM',
    ta: 'காலை சிற்றுண்டி: 7:00 AM – 11:30 AM',
  },
  'layout.bananaLeafMeals': {
    en: 'Banana Leaf Meals: 12:00 PM – 4:00 PM',
    ta: 'வாழை இலை சாப்பாடு: 12:00 PM – 4:00 PM',
  },
  'layout.dinnerDosa': {
    en: 'Dinner & Dosa Counter: 6:30 PM – 10:30 PM',
    ta: 'இரவு சிற்றுண்டி & தோசை: 6:30 PM – 10:30 PM',
  },
  'layout.closedNote': {
    en: 'Open every day for hot dine-in & delivery',
    ta: 'அனைத்து நாட்களிலும் காலை முதல் இரவு வரை திறந்திருக்கும்',
  },
  'layout.addressText': {
    en: 'Siruvani Main Road, Karunya Nagar, Coimbatore, Tamil Nadu 641114',
    ta: 'சிறுவாணி மெயின் ரோடு, கருண்யா நகர், கோயம்புத்தூர் 641114',
  },
  'layout.phoneText': {
    en: '+91 94431 82910 · (0422) 261 4500',
    ta: '+91 94431 82910 · (0422) 261 4500',
  },
  'layout.deliveryModes': {
    en: 'Dine-In, Takeaway & Contactless Delivery',
    ta: 'உணவருந்த, பார்சல் & ஹோம் டெலிவரி',
  },
  'layout.copyrightNotice': {
    en: 'South Indian Kitchen · Karunya Nagar, Coimbatore',
    ta: 'தென்னிந்திய சமையலறை · கருண்யா நகர், கோயம்புத்தூர்',
  },
  'layout.konguFlavours': {
    en: 'Authentic Kongu & Tamil Nadu Flavours',
    ta: 'பாரம்பரிய கொங்கு & தமிழ்நாட்டு சுவைகள்',
  },
  'layout.fssai': {
    en: 'FSSAI Lic. 12423002000456',
    ta: 'FSSAI உரிமம் 12423002000456',
  },
  'layout.mobileHome': {
    en: 'Home',
    ta: 'முகப்பு',
  },
  'layout.mobileMenu': {
    en: 'Menu',
    ta: 'மெனு',
  },
  'layout.mobileCart': {
    en: 'Cart',
    ta: 'கூடை',
  },
  'layout.mobileTracking': {
    en: 'Tracking',
    ta: 'கண்காணிப்பு',
  },

  // ── Hero Section ──
  'hero.badge': {
    en: 'Kongu South Indian Kitchen · Karunya Nagar',
    ta: 'கொங்கு தென்னிந்திய சமையல் · கருண்யா நகர்',
  },
  'hero.titlePart1': {
    en: 'Authentic Kongu flavours,',
    ta: 'ஆத்திரிசிய கொங்கு சுவைகள்,',
  },
  'hero.titlePart2': {
    en: 'crafted with passion.',
    ta: 'அன்போடு சமைக்கப்பட்டது.',
  },
  'hero.subtitle': {
    en: 'Ground at dawn, roasted in pure country ghee, and served with pride. Experience soft Thatte idlis, cast-iron crispy ghee roasts, authentic banana-leaf feasts, and fragrant seeraga samba biryanis.',
    ta: 'அதிகாலையில் அரைத்த மாவு, சுத்தமான நாட்டு நெய், பெருமையுடன் பரிமாறப்படும் சுவை. மெதுவான தட்டே இட்லி, மொறுமொறு நெய் ரோஸ்ட், வாழை இலை விருந்து மற்றும் மணக்கும் சீரக சம்பா பிரியாணி.',
  },
  'hero.cta': {
    en: 'Explore Menu & Order',
    ta: 'மெனுவை ஆராய்க',
  },
  'hero.philosophy': {
    en: 'Our Philosophy',
    ta: 'எங்கள் பாரம்பரியம்',
  },
  'hero.stat1Title': {
    en: '100% Ghee',
    ta: '100% தூய நெய்',
  },
  'hero.stat1Desc': {
    en: 'Farm-churned butter',
    ta: 'கிராமத்து வெண்ணெய்',
  },
  'hero.stat2Title': {
    en: '24h Batter',
    ta: '24 மணி மாவு',
  },
  'hero.stat2Desc': {
    en: 'Natural stone grinding',
    ta: 'இயற்கை ஆட்டுக்கல் அரைப்பு',
  },
  'hero.stat3Title': {
    en: 'Live Sync',
    ta: 'நேரடி பரிமாற்றம்',
  },
  'hero.stat3Desc': {
    en: 'Order directly to kitchen',
    ta: 'சமையலறைக்கு நேரடி ஆர்டர்',
  },
  'hero.floatingDishName': {
    en: 'Ghee Roast Dosa',
    ta: 'நெய் ரோஸ்ட் தோசை',
  },
  'hero.floatingDishDesc': {
    en: 'Crisp fermented rice crepe dusted with gunpowder podi & ghee.',
    ta: 'காரப் பொடி மற்றும் தூய நெய் மணக்கும் மொறுமொறு தோசை.',
  },

  // ── Home Sections ──
  'home.curatedOfferings': {
    en: 'Curated Offerings',
    ta: 'தேர்ந்தெடுத்த சுவைகள்',
  },
  'home.browseByCategory': {
    en: 'Browse by Category',
    ta: 'உணவு வகைகள்',
  },
  'home.viewAllDishes': {
    en: 'View all dishes',
    ta: 'அனைத்து உணவுகளும்',
  },
  'home.explore': {
    en: 'Explore',
    ta: 'ஆராய்க',
  },
  'home.houseSpecialties': {
    en: 'House Specialties',
    ta: 'சிறப்பு உணவுகள்',
  },
  'home.signatureDishes': {
    en: 'Signature Dishes',
    ta: 'பாரம்பரிய உணவுகள்',
  },
  'home.signatureSubtitle': {
    en: 'Dishes that define the kitchen of Annachies',
    ta: 'அண்ணாச்சிஸின் தனித்துவமான உணவுகள்',
  },
  'home.seeEntireMenu': {
    en: 'See entire menu',
    ta: 'முழு மெனுவை காண்க',
  },
  'home.customize': {
    en: 'Customize',
    ta: 'தனிப்பயனாக்கு',
  },
  'home.add': {
    en: 'Add',
    ta: 'சேர்',
  },
  'home.signatureBadge': {
    en: 'Signature',
    ta: 'சிறப்பு',
  },
  'home.popularBadge': {
    en: 'Popular',
    ta: 'பிரபலம்',
  },
  'home.popularThisEvening': {
    en: 'Popular This Evening',
    ta: 'இன்றைய மாலை சிறப்பு',
  },
  'home.popularSubtitle': {
    en: 'Most ordered by diners in Karunya Nagar today',
    ta: 'கருண்யா நகர் வாடிக்கையாளர்களின் விருப்பம்',
  },
  'home.select': {
    en: 'Select →',
    ta: 'தேர்ந்தெடு →',
  },
  'home.fromOurKitchen': {
    en: 'From Our Kitchen',
    ta: 'எங்கள் சமையலறையிலிருந்து',
  },
  'home.storyHeading': {
    en: 'Every dish carries authentic Kongu culinary heritage, crafted for today.',
    ta: 'ஒவ்வொரு உணவும் ஆத்திரிசிய கொங்கு சமையல் பாரம்பரியத்தை சுமக்கிறது.',
  },
  'home.storyTamil': {
    en: 'Pure country ghee, hand-ground spices, zero shortcuts.',
    ta: 'சுத்தமான நாட்டு நெய், கைப்பிடி மசாலா, கலப்படமற்ற சுவை.',
  },
  'home.storyBody': {
    en: 'Rooted in Karunya Nagar, Annachies celebrates the rich flavors of Coimbatore and the Kongu region. Our dosa batter ferments for an exact 24 hours to achieve signature airy crispness, roasted in cold-pressed sesame oil and pure country ghee. Our spices are hand-pounded, and our coffee is brewed from freshly ground peaberry decoction.',
    ta: 'கருண்யா நகரில் அமைந்துள்ள அண்ணாச்சிஸ், கோயம்புத்தூர் மற்றும் கொங்கு மண்டலத்தின் சுவைகளை கொண்டாடுகிறது. 24 மணி நேரம் இயற்கையாக புளித்த தோசை மாவு, நாட்டு நல்லெண்ணெய், தூய நெய்யில் வார்க்கப்படுகிறது. கை அரைத்த மசாலாக்கள் மற்றும் ஃபிரஷ் பீபெர்ரி டிகாக்‌ஷன் காபி எங்கள் அடையாளம்.',
  },
  'home.zeroArtificial': {
    en: 'Zero Artificial Colours',
    ta: 'செயற்கை நிறங்கள் இல்லை',
  },
  'home.preparedFresh': {
    en: 'Prepared Fresh to Order',
    ta: 'புதிதாக சமைக்கப்படும்',
  },
  'home.locationTitle': {
    en: 'Karunya Nagar, Coimbatore',
    ta: 'கருண்யா நகர், கோயம்புத்தூர்',
  },
  'home.serviceHours': {
    en: 'Daily Service Hours',
    ta: 'தினசரி சேவை நேரம்',
  },
  'home.morningHours': {
    en: 'Morning Tiffin: 7:00 AM – 11:30 AM',
    ta: 'காலை சிற்றுண்டி: 7:00 AM – 11:30 AM',
  },
  'home.lunchHours': {
    en: 'Banana Leaf Meals: 12:00 PM – 4:00 PM',
    ta: 'வாழை இலை சாப்பாடு: 12:00 PM – 4:00 PM',
  },
  'home.dinnerHours': {
    en: 'Dinner & Tiffin: 5:30 PM – 10:30 PM',
    ta: 'இரவு சிற்றுண்டி: 5:30 PM – 10:30 PM',
  },
  'home.readyForDining': {
    en: 'Ready for Dining?',
    ta: 'சாப்பிட தயாரா?',
  },
  'home.readySubtitle': {
    en: 'Order online for swift pickup or doorstep delivery.',
    ta: 'ஆன்லைனில் ஆர்டர் செய்து உடனே பெற்றுக்கொள்ளுங்கள்.',
  },
  'home.startYourOrder': {
    en: 'Start Your Order',
    ta: 'உங்கள் ஆர்டரைத் தொடங்குங்கள்',
  },

  // ── Menu Page ──
  'menu.title': {
    en: 'Our Menu',
    ta: 'எங்கள் மெனு',
  },
  'menu.subtitle': {
    en: 'Freshly prepared South Indian delicacies made to order',
    ta: 'சுடச்சுட தயாரிக்கப்படும் தென்னிந்திய சுவையான உணவுகள்',
  },
  'menu.searchPlaceholder': {
    en: 'Search dishes...',
    ta: 'உணவுகளைத் தேடுங்கள்...',
  },
  'menu.clear': {
    en: 'Clear',
    ta: 'அழி',
  },
  'menu.all': {
    en: 'All',
    ta: 'அனைத்தும்',
  },
  'menu.veg': {
    en: 'Veg',
    ta: 'சைவம்',
  },
  'menu.nonVeg': {
    en: 'Non-Veg',
    ta: 'அசைவம்',
  },
  'menu.allItems': {
    en: 'All Items',
    ta: 'அனைத்து உணவுகள்',
  },
  'menu.noDishesFound': {
    en: 'No dishes found',
    ta: 'உணவுகள் எதுவும் கிடைக்கவில்லை',
  },
  'menu.noDishesDesc': {
    en: 'Try changing your search term or clearing the dietary filters.',
    ta: 'தேடல் சொல்லை மாற்றவும் அல்லது வடிகட்டிகளை மீட்டமைக்கவும்.',
  },
  'menu.resetFilters': {
    en: 'Reset Filters',
    ta: 'வடிகட்டிகளை மீட்டமை',
  },
  'menu.spicy': {
    en: 'Spicy',
    ta: 'காரமானது',
  },
  'menu.customize': {
    en: 'Customize',
    ta: 'தனிப்பயனாக்கு',
  },
  'menu.add': {
    en: 'Add',
    ta: 'சேர்',
  },
  'menu.soldOut': {
    en: 'Sold Out',
    ta: 'தீர்ந்துவிட்டது',
  },
  'menu.unavailable': {
    en: 'Unavailable',
    ta: 'கிடைக்கவில்லை',
  },
  'menu.itemsCount': {
    en: 'items',
    ta: 'உணவுகள்',
  },
  'menu.itemCount': {
    en: 'item',
    ta: 'உணவு',
  },

  // ── Item Detail Page ──
  'item.backToMenu': {
    en: 'Back to Menu',
    ta: 'மெனுவுக்கு திரும்பு',
  },
  'item.itemNotFound': {
    en: 'Item Not Found',
    ta: 'உணவு கிடைக்கவில்லை',
  },
  'item.itemNotFoundDesc': {
    en: 'This dish may have been removed or updated. Please browse our active menu.',
    ta: 'இந்த உணவு மாற்றப்பட்டிருக்கலாம். எங்கள் மெனுவை பார்வையிடவும்.',
  },
  'item.returnToMenu': {
    en: 'Return to Menu',
    ta: 'மெனுவுக்கு திரும்பு',
  },
  'item.quantity': {
    en: 'Quantity',
    ta: 'எண்ணிக்கை',
  },
  'item.total': {
    en: 'Total',
    ta: 'மொத்தம்',
  },
  'item.addToOrder': {
    en: 'Add to Order',
    ta: 'ஆர்டரில் சேர்',
  },
  'item.added': {
    en: 'Added to Bag!',
    ta: 'கூடையில் சேர்க்கப்பட்டது!',
  },
  'item.currentlyUnavailable': {
    en: 'Currently Unavailable',
    ta: 'தற்போது கிடைக்கவில்லை',
  },
  'item.required': {
    en: 'Required',
    ta: 'கட்டாயம்',
  },
  'item.optional': {
    en: 'Optional',
    ta: 'விருப்பத்தேர்வு',
  },

  // ── Cart Page ──
  'cart.emptyTitle': {
    en: 'Your Bag is Empty',
    ta: 'உங்கள் கூடை காலியாக உள்ளது',
  },
  'cart.emptyDesc': {
    en: "Looks like you haven't added any South Indian specialties to your order yet.",
    ta: 'நீங்கள் இன்னும் உணவுகள் எதையும் கூடையில் சேர்க்கவில்லை.',
  },
  'cart.exploreMenu': {
    en: 'Explore the Menu',
    ta: 'மெனுவை காண்க',
  },
  'cart.pageTitle': {
    en: 'Your Order',
    ta: 'உங்கள் ஆர்டர்',
  },
  'cart.pageSubtitle': {
    en: 'Review dishes and choose your dining preferences',
    ta: 'உணவுகளை சரிபார்த்து ஆர்டர் செய்யவும்',
  },
  'cart.addMore': {
    en: 'Add more dishes',
    ta: 'மேலும் உணவுகளைச் சேர்',
  },
  'cart.fulfilmentMode': {
    en: 'Dining & Delivery Mode',
    ta: 'சாப்பிடும் முறை & டெலிவரி',
  },
  'cart.dineIn': {
    en: 'Dine-In',
    ta: 'உணவகத்தில் சாப்பிட',
  },
  'cart.takeaway': {
    en: 'Takeaway (Parcel)',
    ta: 'பார்சல்',
  },
  'cart.delivery': {
    en: 'Delivery',
    ta: 'ஹோம் டெலிவரி',
  },
  'cart.selectSeat': {
    en: 'Select Table Number',
    ta: 'மேஜை எண்ணைத் தேர்ந்தெடுக்கவும்',
  },
  'cart.orderSummary': {
    en: 'Bill Details',
    ta: 'கட்டண விவரம்',
  },
  'cart.itemTotal': {
    en: 'Item Total',
    ta: 'உணவு கட்டணம்',
  },
  'cart.deliveryFee': {
    en: 'Delivery Fee',
    ta: 'டெலிவரி கட்டணம்',
  },
  'cart.parcelPacking': {
    en: 'Eco Banana Leaf Packing',
    ta: 'வாழை இலை பார்சல் கட்டணம்',
  },
  'cart.taxes': {
    en: 'Taxes & GST (5%)',
    ta: 'வரி & ஜிஎஸ்டி (5%)',
  },
  'cart.grandTotal': {
    en: 'To Pay',
    ta: 'செலுத்த வேண்டிய தொகை',
  },
  'cart.proceedToCheckout': {
    en: 'Proceed to Checkout',
    ta: 'செக்அவுட் தொடர்க',
  },
  'cart.table': {
    en: 'Table',
    ta: 'மேஜை',
  },

  // ── Checkout Page ──
  'checkout.title': {
    en: 'Complete Your Order',
    ta: 'ஆர்டரை முடிக்கவும்',
  },
  'checkout.step1': {
    en: 'Dining & Service Mode',
    ta: 'சாப்பிடும் முறை',
  },
  'checkout.step2': {
    en: 'Customer Contact',
    ta: 'வாடிக்கையாளர் தகவல்',
  },
  'checkout.step3': {
    en: 'Payment & Kitchen Notes',
    ta: 'பணம் & சமையல் குறிப்புகள்',
  },
  'checkout.nameLabel': {
    en: 'Full Name',
    ta: 'முழு பெயர்',
  },
  'checkout.namePlaceholder': {
    en: 'Enter your name',
    ta: 'உங்கள் பெயரை உள்ளிடவும்',
  },
  'checkout.phoneLabel': {
    en: 'Mobile Number',
    ta: 'அலைபேசி எண்',
  },
  'checkout.phonePlaceholder': {
    en: '10-digit mobile number',
    ta: '10 இலக்க அலைபேசி எண்',
  },
  'checkout.addressLabel': {
    en: 'Delivery Address',
    ta: 'டெலிவரி முகவரி',
  },
  'checkout.addressPlaceholder': {
    en: 'Hostel, room number, or street address in Karunya Nagar',
    ta: 'விடுதி, அறை எண் அல்லது தெரு முகவரி',
  },
  'checkout.notesLabel': {
    en: 'Cooking & Dietary Instructions',
    ta: 'சமையல் குறிப்புகள்',
  },
  'checkout.notesPlaceholder': {
    en: 'e.g. less spicy, extra sambar, crispier dosa',
    ta: 'எ.கா. காரம் குறைவாக, கூடுதல் சாம்பார்...',
  },
  'checkout.paymentMethod': {
    en: 'Payment Method',
    ta: 'பணம் செலுத்தும் முறை',
  },
  'checkout.upi': {
    en: 'UPI / GPay / PhonePe',
    ta: 'யுபிஐ / ஜிபே / போன்பே',
  },
  'checkout.cash': {
    en: 'Cash on Delivery / Counter',
    ta: 'நேரடி பணம் (Cash)',
  },
  'checkout.placeOrder': {
    en: 'Place Order',
    ta: 'ஆர்டர் செய்க',
  },
  'checkout.placing': {
    en: 'Placing Order...',
    ta: 'ஆர்டர் செய்யப்படுகிறது...',
  },

  // ── Orders & Tracking ──
  'orders.title': {
    en: 'Your Orders',
    ta: 'உங்கள் ஆர்டர்கள்',
  },
  'orders.subtitle': {
    en: 'Track live kitchen status and order history',
    ta: 'உங்கள் ஆர்டர்களின் நேரடி நிலை',
  },
  'orders.noOrders': {
    en: 'No Orders Yet',
    ta: 'ஆர்டர்கள் எதுவும் இல்லை',
  },
  'orders.noOrdersDesc': {
    en: "You haven't placed any orders during this session.",
    ta: 'இந்த அமர்வில் நீங்கள் ஆர்டர்கள் எதுவும் செய்யவில்லை.',
  },
  'orders.exploreMenu': {
    en: 'Explore Menu & Order',
    ta: 'மெனுவை காண்க & ஆர்டர் செய்க',
  },
  'orders.orderNumber': {
    en: 'Order',
    ta: 'ஆர்டர் எண்',
  },
  'orders.liveStatus': {
    en: 'Live Kitchen Status',
    ta: 'சமையலறை நிலை',
  },
  'orders.orderPlaced': {
    en: 'Order Placed',
    ta: 'ஆர்டர் பெறப்பட்டது',
  },
  'orders.preparing': {
    en: 'In the Kitchen',
    ta: 'சமைக்கப்படுகிறது',
  },
  'orders.ready': {
    en: 'Ready for Service',
    ta: 'தயாராகிவிட்டது',
  },
  'orders.outForDelivery': {
    en: 'Out for Delivery',
    ta: 'டெலிவரிக்கு புறப்பட்டது',
  },
  'orders.completed': {
    en: 'Delivered / Completed',
    ta: 'முடிக்கப்பட்டது',
  },
}

// ── Category Translations ──
const categoryTranslations: Record<string, { name: Record<Language, string>; description: Record<Language, string> }> = {
  tiffin: {
    name: {
      en: 'Morning & Evening Tiffin',
      ta: 'காலை & மாலை சிற்றுண்டி',
    },
    description: {
      en: 'Freshly steamed idlis, hot crispy vadais, and ghee pongal',
      ta: 'சூடான மல்லிப்பூ இட்லி, மொறுமொறு வடை மற்றும் நெய் பொங்கல்',
    },
  },
  dosa: {
    name: {
      en: 'Cast-Iron Dosas',
      ta: 'வார்க்கல் தோசைகள்',
    },
    description: {
      en: 'Crispy ghee roasts, podi dosas and Kari dosas from the tawa',
      ta: 'மொறுமொறு நெய் ரோஸ்ட், பொடி தோசை மற்றும் காரி தோசை',
    },
  },
  meals: {
    name: {
      en: 'Banana Leaf Meals & Rice',
      ta: 'வாழை இலை சாப்பாடு & சாதம்',
    },
    description: {
      en: 'Traditional Kongu noon feasts and fragrant variety rice',
      ta: 'பாரம்பரிய கொங்கு மதிய விருந்து மற்றும் கலவை சாதங்கள்',
    },
  },
  biryani: {
    name: {
      en: 'Seeraga Samba Biryani',
      ta: 'சீரக சம்பா பிரியாணி',
    },
    description: {
      en: 'Aromatic wood-fired Kongu dum biryani',
      ta: 'மணமணக்கும் விறகடுப்பு கொங்கு தம் பிரியாணி',
    },
  },
  starters: {
    name: {
      en: 'Kongu Specials & Starters',
      ta: 'கொங்கு ஸ்பெஷல் & ஸ்டார்ட்டர்ஸ்',
    },
    description: {
      en: 'Authentic village style chukkas and spice roasts',
      ta: 'கிராமத்து சுவை சுக்கா மற்றும் கார வறுவல்கள்',
    },
  },
  drinks: {
    name: {
      en: 'Filter Coffee & Beverages',
      ta: 'பில்டர் காபி & பானங்கள்',
    },
    description: {
      en: 'Degree filter coffee, spiced neer mor & cooling drinks',
      ta: 'டிகிரி பில்டர் காபி, தாளித்த நீர்மோர் & குளிர் பானங்கள்',
    },
  },
  desserts: {
    name: {
      en: 'Traditional Sweets',
      ta: 'பாரம்பரிய இனிப்புகள்',
    },
    description: {
      en: 'Elaneer payasam and rich ghee prasadam',
      ta: 'இளநீர் பாயாசம் மற்றும் நெய் பிரசாதம்',
    },
  },
}

// ── Item Translations ──
const itemTranslations: Record<string, { name: Record<Language, string>; description: Record<Language, string> }> = {
  'ghee-roast-dosa': {
    name: {
      en: 'Annachis Special Ghee Roast',
      ta: 'அண்ணாச்சிஸ் ஸ்பெஷல் நெய் ரோஸ்ட்',
    },
    description: {
      en: 'Crisp golden crepe roasted in pure country ghee, dusted with fragrant gun powder podi. Served with drumstick sambar & trio of fresh chutneys.',
      ta: 'சுத்தமான நாட்டு நெய்யில் வறுத்த மொறுமொறு தோசை, இட்லி பொடி தூவி, முருங்கைக்காய் சாம்பார் & மூன்று வகை சட்னியுடன்.',
    },
  },
  'masala-dosa': {
    name: {
      en: 'Crispy Potato Masala Dosa',
      ta: 'மொறுமொறு மசாலா தோசை',
    },
    description: {
      en: 'Golden tawa dosa filled with tempered potato, shallots, green chillies and fresh curry leaves. Sambar and two chutneys alongside.',
      ta: 'வெங்காயம், உருளைக்கிழங்கு, பச்சை மிளகாய் மசாலா நிரப்பிய பொன்னிற தோசை, சாம்பார் மற்றும் சட்னியுடன்.',
    },
  },
  'podi-dosa': {
    name: {
      en: 'Madurai Spicy Podi Dosa',
      ta: 'மதுரை கார பொடி தோசை',
    },
    description: {
      en: 'Thick dosa slathered with fiery idli podi and cold-pressed sesame oil. Pungent, crunchy, and richly fragrant.',
      ta: 'நாட்டு நல்லெண்ணெய் மற்றும் காரசாரமான இட்லி பொடி தடவிய மொறுமொறு தடிமனான தோசை.',
    },
  },
  'kari-dosa': {
    name: {
      en: 'Madurai Kari Dosa (Mutton Keema)',
      ta: 'மதுரை மட்டன் காரி தோசை',
    },
    description: {
      en: 'Triple-layered tawa delight: thick base dosa, fluffy country egg omelette, topped with spicy tender minced mutton chukka.',
      ta: 'மூன்று அடுக்கு சுவை: தடிமனான தோசை, நாட்டு முட்டை ஆம்லெட் மற்றும் காரசாரமான மட்டன் கீமா சுக்கா.',
    },
  },
  'onion-rava-dosa': {
    name: {
      en: 'Crisp Onion Rava Dosa',
      ta: 'மொறுமொறு வெங்காய ரவா தோசை',
    },
    description: {
      en: 'Lacy semolina crepe studded with diced shallots, crushed black pepper, ginger, and green chillies. Crackles at the first bite.',
      ta: 'சின்ன வெங்காயம், மிளகு, சீரகம், இஞ்சி சேர்த்து வார்க்கப்பட்ட மொறுமொறு ரவா தோசை.',
    },
  },
  'ghee-podi-idli': {
    name: {
      en: 'Ghee Podi Thatte Idli (2 pcs)',
      ta: 'நெய் பொடி தட்டே இட்லி (2 எண்ணிக்கை)',
    },
    description: {
      en: 'Large plate-sized cloud soft idlis drenched in pure ghee and spicy house podi, served with piping hot sambar.',
      ta: 'சுத்தமான நெய் மற்றும் காரசாரமான வீட்டு பொடியில் நனைத்த தட்டு இட்லி, சுடச்சுட சாம்பாருடன்.',
    },
  },
  'steamed-idli': {
    name: {
      en: 'Steamed Mallipoo Idli (4 pcs)',
      ta: 'மல்லிப்பூ இட்லி (4 எண்ணிக்கை)',
    },
    description: {
      en: 'Feather-light naturally fermented rice cakes, served with traditional Kongu drumstick sambar and freshly ground coconut chutney.',
      ta: 'பஞ்சு போன்ற மெதுவான இட்லி, பாரம்பரிய கொங்கு முருங்கைக்காய் சாம்பார் & தேங்காய் சட்னியுடன்.',
    },
  },
  'medu-vada': {
    name: {
      en: 'Crispy Medu Vada (2 pcs)',
      ta: 'மொறுமொறு மெது வடை (2 எண்ணிக்கை)',
    },
    description: {
      en: 'Golden crunchy urad dal fritters with ginger and peppercorns, pillowy inside. Served with sambar and coconut chutney.',
      ta: 'இஞ்சி, மிளகு மணம் கமழும் பொன்னிற மொறுமொறு உளுந்து வடை, சாம்பார் மற்றும் சட்னியுடன்.',
    },
  },
  'ven-pongal': {
    name: {
      en: 'Ghee Ven Pongal with Cashews',
      ta: 'நெய் வெண் பொங்கல் முந்திரியுடன்',
    },
    description: {
      en: 'Short grain rice and moong dal simmered with crushed pepper, ginger, cumin, and generously finished with ghee-roasted cashews.',
      ta: 'சீரக சம்பா அரிசி, பாசிப்பருப்பு, மிளகு, சீரகம், இஞ்சி மற்றும் நெய்யில் வறுத்த முந்திரியுடன்.',
    },
  },
  'upma-kichadi': {
    name: {
      en: 'Coimbatore Rava Kichadi',
      ta: 'கோயம்புத்தூர் ரவா கிச்சடி',
    },
    description: {
      en: 'Vegetable semolina kichadi tempered with mustard, curry leaves, carrots, beans, and finished with a spoonful of country ghee.',
      ta: 'கேரட், பீன்ஸ், பட்டாணி மற்றும் நாட்டு நெய் மணக்கும் பாரம்பரிய ரவா கிச்சடி.',
    },
  },
  'south-indian-meals': {
    name: {
      en: 'Banana Leaf Full Veg Meals',
      ta: 'வாழை இலை முழு சைவ சாப்பாடு',
    },
    description: {
      en: 'Traditional Coimbatore lunch spread: hot ponni rice, drumstick sambar, pepper rasam, mor kuzhambu, kootu, poriyal, appalam, pickle & elaneer payasam.',
      ta: 'பொன்னி அரிசி சாதம், முருங்கை சாம்பார், மிளகு ரசம், மோர் குழம்பு, கூட்டு, பொரியல், அப்பளம், ஊறுகாய் மற்றும் இளநீர் பாயாசம்.',
    },
  },
  'nonveg-meals': {
    name: {
      en: 'Kongu Special Non-Veg Meals',
      ta: 'கொங்கு ஸ்பெஷல் அசைவ சாப்பாடு',
    },
    description: {
      en: 'Full banana leaf meals with spicy Nattu Kozhi kuzhambu, country mutton gravy, fish fry of the day, and traditional accompaniments.',
      ta: 'வாழை இலை சாப்பாடு, காரசாரமான நாட்டுக்கோழி குழம்பு, கொங்கு மட்டன் குழம்பு, மீன் வறுவல் மற்றும் கூட்டு பொரியலுடன்.',
    },
  },
  'lemon-rice': {
    name: {
      en: 'Kongu Lemon Peanut Rice',
      ta: 'கொங்கு எலுமிச்சை சாதம்',
    },
    description: {
      en: 'Fragrant turmeric rice tempered with crunchy groundnuts, green chillies, mustard, and freshly squeezed Siruvani lemons.',
      ta: 'சிறுவாணி எலுமிச்சை சாறு, வறுத்த வேர்க்கடலை மற்றும் தாளித்த மிளகாய் மணக்கும் சாதம்.',
    },
  },
  'curd-rice': {
    name: {
      en: 'Chettinad Curd Rice with Mor Milagai',
      ta: 'மோர் மிளகாய் தயிர் சாதம்',
    },
    description: {
      en: 'Cooling home-churned curd rice finished with mustard tempering, fresh pomegranate seeds, and sun-dried fried curd chilli.',
      ta: 'பச்சை மாதுளை முத்துக்கள், தாளித்த கடுகு, கறிவேப்பிலை மற்றும் வறுத்த மோர் மிளகாயுடன் தயிர் சாதம்.',
    },
  },
  'kongu-chicken-biryani': {
    name: {
      en: 'Kongu Seeraga Samba Chicken Biryani',
      ta: 'கொங்கு சீரக சம்பா சிக்கன் பிரியாணி',
    },
    description: {
      en: 'Aromatic small-grain seeraga samba rice slow dum-cooked with tender country chicken, shallots, garlic, and fresh mint. Served with onion raita & brinjal gravy.',
      ta: 'சீரக சம்பா அரிசி, நாட்டுக்கோழி, புதினா, சின்ன வெங்காயம் சேர்த்து விறகடுப்பில் சமைத்த தம் பிரியாணி, தயிர் பச்சடி & தால்சாவுடன்.',
    },
  },
  'veg-biryani': {
    name: {
      en: 'Seeraga Samba Vegetable Dum Biryani',
      ta: 'சீரக சம்பா காய்கறி தம் பிரியாணி',
    },
    description: {
      en: 'Fragrant seeraga samba rice cooked with fresh seasonal farm vegetables, mint, coriander, and gentle wood-fired spices.',
      ta: 'சீரக சம்பா அரிசியில் காய்கறிகள், புதினா, கொத்தமல்லி சேர்த்து மணமணக்க சமைத்த காய்கறி பிரியாணி.',
    },
  },
  'chicken-65': {
    name: {
      en: 'Kongu Nattu Kozhi Chukka (Dry)',
      ta: 'கொங்கு நாட்டுக்கோழி சுக்கா',
    },
    description: {
      en: 'Country chicken pan-roasted on high tawa flame with hand-ground shallots, dry red chillies, black pepper, and curry leaves.',
      ta: 'சின்ன வெங்காயம், காய்ந்த மிளகாய், கறிவேப்பிலை, மிளகு சேர்த்து தவா வறுவல் செய்த நாட்டுக்கோழி.',
    },
  },
  'pepper-chicken': {
    name: {
      en: 'Coimbatore Pepper Chicken Fry',
      ta: 'கோவை பெப்பர் சிக்கன் வறுவல்',
    },
    description: {
      en: 'Tender chicken tossed with coarsely pounded Tellicherry black pepper, garlic cloves, and ghee. Rich, dark, and intensely flavourful.',
      ta: 'நாட்டு நெய், பூண்டு மற்றும் தட்டிய கருப்பு மிளகு மணக்கும் கோயம்புத்தூர் சிக்கன் வறுவல்.',
    },
  },
  'mutton-chukka': {
    name: {
      en: 'Erode Mutton Chukka Varuval',
      ta: 'ஈரோடு மட்டன் சுக்கா வறுவல்',
    },
    description: {
      en: 'Melt-in-mouth tender young mutton cooked with fennel, small onions, and authentic Kongu spices till dry and glazed.',
      ta: 'சோம்பு, சின்ன வெங்காயம் மற்றும் கொங்கு மசாலாக்களுடன் சுண்ட வறுத்த இளங்கடா மட்டன் சுக்கா.',
    },
  },
  'paneer-ghee-roast': {
    name: {
      en: 'Fresh Paneer Ghee Roast',
      ta: 'பனீர் நெய் ரோஸ்ட்',
    },
    description: {
      en: 'Fresh dairy paneer cubes roasted in spiced red chilli paste and clarified farm butter till caramelised and succulent.',
      ta: 'சுத்தமான பண்ணை நெய் மற்றும் காரசாரமான சிவப்பு மசாலாவில் வறுத்த மெதுவான பனீர் துண்டுகள்.',
    },
  },
  'gobi-65': {
    name: {
      en: 'Annachis Crispy Gobi 65',
      ta: 'அண்ணாச்சிஸ் மொறுமொறு கோபி 65',
    },
    description: {
      en: 'Fresh cauliflower florets marinated in spiced rice flour batter, deep fried till crisp with whole curry leaves.',
      ta: 'காலிஃபிளவர் துண்டுகளை மசாலா சேர்த்து கறிவேப்பிலையுடன் மொறுமொறுப்பாக பொரித்தெடுத்தது.',
    },
  },
  'filter-coffee': {
    name: {
      en: 'Kumbakonam Degree Filter Coffee',
      ta: 'கும்பகோணம் டிகிரி பில்டர் காபி',
    },
    description: {
      en: 'First-press chicory blend decoction brewed in brass filter, frothed with thick full cream milk. Served in traditional brass dabarah.',
      ta: 'பித்தளை பில்டரில் இறக்கிய திக்கான டிகாஷன், பசும்பால் சேர்த்து பித்தளை டவரா செட்டில் பரிமாறப்படும் காபி.',
    },
  },
  'masala-chai': {
    name: {
      en: 'Fresh Ginger Cardamom Tea',
      ta: 'இஞ்சி ஏலக்காய் டீ',
    },
    description: {
      en: 'Nilgiri tea leaves slow simmered with fresh crushed ginger root, green cardamom, and rich dairy milk.',
      ta: 'நீலகிரி தேயிலை, தட்டிய சுக்கு இஞ்சி மற்றும் மணக்கும் ஏலக்காய் சேர்த்த தேநீர்.',
    },
  },
  'neer-mor': {
    name: {
      en: 'Spiced Village Buttermilk (Neer Mor)',
      ta: 'பாரம்பரிய கிராமத்து தாளித்த நீர்மோர்',
    },
    description: {
      en: 'Hand-churned butter milk tempered with mustard seeds, ginger, green chillies, curry leaves, and a touch of asafoetida.',
      ta: 'கடுகு, இஞ்சி, பச்சை மிளகாய், கறிவேப்பிலை, பெருங்காயம் தாளித்த சிலுப்பிய நாட்டு நீர்மோர்.',
    },
  },
  'madurai-jigarthanda': {
    name: {
      en: 'Famous Madurai Jigarthanda',
      ta: 'மதுரை ஸ்பெஷல் ஜிகர்தண்டா',
    },
    description: {
      en: 'Special South Indian royal beverage made with almond gum (badam pisin), nannari syrup, basundi milk, and topped with malai ice cream.',
      ta: 'பாதாம் பிசின், நன்னாரி சர்பத், பால்கோவா பாசந்தி மற்றும் மில்க் ஐஸ்கிரீம் சேர்த்த பிரசித்தி பெற்ற குளிர்பானம்.',
    },
  },
  'lime-soda': {
    name: {
      en: 'Fresh Mint Lime Soda',
      ta: 'புதினா எலுமிச்சை சோடா',
    },
    description: {
      en: 'Siruvani country lime juice with sparkling club soda, fresh mint sprigs and black salt.',
      ta: 'சிறுவாணி எலுமிச்சை சாறு, புத்துணர்ச்சியூட்டும் புதினா மற்றும் சோடா.',
    },
  },
  'tender-coconut-payasam': {
    name: {
      en: 'Elaneer (Tender Coconut) Payasam',
      ta: 'இளநீர் பாயாசம்',
    },
    description: {
      en: 'Silky smooth chilled pudding of tender coconut pulp, rich condensed milk, cardamom, and roasted cashews.',
      ta: 'வழுக்கை இளநீர், திக்கான பால், ஏலக்காய் மற்றும் நெய் முந்திரி சேர்த்த பிரத்யேக பாயாசம்.',
    },
  },
  'kesari': {
    name: {
      en: 'Ghee Rava Kesari',
      ta: 'நெய் ரவா கேசரி',
    },
    description: {
      en: 'Golden semolina halwa enriched with saffron essence, abundant ghee, and crunchy cashews.',
      ta: 'தூய நெய், குங்குமப்பூ மணம் மற்றும் முந்திரி திராட்சை நிறைந்த பொன்னிற கேசரி.',
    },
  },
  'mysore-pak': {
    name: {
      en: 'Traditional Ghee Mysore Pak',
      ta: 'பாரம்பரிய நெய் மைசூர் பாக்',
    },
    description: {
      en: 'Melt-in-mouth gram flour fudge slow-cooked in pure country ghee with aromatic cardamom.',
      ta: 'நாக்கில் கரையும் சுத்தமான நாட்டு நெய் மைசூர் பாக்.',
    },
  },
}

// ── Options & Addons Translations ──
const optionTranslations: Record<string, Record<Language, string>> = {
  'extra-ghee': { en: 'Extra Country Ghee', ta: 'கூடுதல் நாட்டு நெய்' },
  'extra-podi': { en: 'Extra Gunpowder Podi', ta: 'கூடுதல் இட்லி பொடி' },
  'ghee-drizzle': { en: 'Ghee Drizzle', ta: 'நெய் ஊற்றல்' },
  'boiled-egg': { en: 'Boiled Egg', ta: 'வேகவைத்த முட்டை' },
  'extra-raita': { en: 'Extra Onion Raita', ta: 'கூடுதல் தயிர் பச்சடி' },
  'regular': { en: 'Regular', ta: 'வழக்கமானது' },
  'strong': { en: 'Strong (Heavy Decoction)', ta: 'ஸ்ட்ராங் (அடர்ந்த டிகாஷன்)' },
  'sweet': { en: 'Sweet', ta: 'இனிப்பு' },
  'salt': { en: 'Salty', ta: 'உப்பு' },
  'mixed': { en: 'Sweet & Salt', ta: 'இனிப்பு & உப்பு' },
  'full': { en: 'Unlimited Dine-In Leaf Meals', ta: 'வரம்பற்ற வாழை இலை உணவு' },
  'parcel': { en: 'Takeaway Banana Leaf Pack', ta: 'பார்சல் வாழை இலை கட்டு' },
  'chicken': { en: 'Nattu Kozhi Kuzhambu', ta: 'நாட்டுக்கோழி குழம்பு' },
  'mutton': { en: 'Kongu Mutton Kuzhambu', ta: 'கொங்கு மட்டன் குழம்பு' },
}

const optionGroupTranslations: Record<string, Record<Language, string>> = {
  extras: { en: 'Add-ons', ta: 'கூடுதல் சேர்ப்புகள்' },
  variant: { en: 'Meal Type', ta: 'உணவு முறை' },
  gravy: { en: 'Curry Choice', ta: 'குழம்பு தேர்வு' },
  strength: { en: 'Coffee Strength', ta: 'காபி அடர்த்தி' },
  style: { en: 'Taste Preference', ta: 'சுவை விருப்பம்' },
}

// ── Helper Lookup Functions ──
export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key
}

export function getCategoryName(catId: string, defaultName: string, lang: Language): string {
  return categoryTranslations[catId]?.name[lang] ?? defaultName
}

export function getCategoryDescription(catId: string, defaultDesc: string, lang: Language): string {
  return categoryTranslations[catId]?.description[lang] ?? defaultDesc
}

export function getItemName(itemId: string, defaultName: string, lang: Language): string {
  return itemTranslations[itemId]?.name[lang] ?? defaultName
}

export function getItemDescription(itemId: string, defaultDesc: string, lang: Language): string {
  return itemTranslations[itemId]?.description[lang] ?? defaultDesc
}

export function getOptionGroupName(groupId: string, defaultName: string, lang: Language): string {
  return optionGroupTranslations[groupId]?.[lang] ?? defaultName
}

export function getOptionName(optionId: string, defaultName: string, lang: Language): string {
  return optionTranslations[optionId]?.[lang] ?? defaultName
}
