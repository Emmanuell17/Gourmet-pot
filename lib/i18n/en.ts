const en = {
  meta: {
    description:
      'Authentic Nigerian cuisine in Debrecen — weekly preorder with pickup on Wednesdays and Fridays after 3:00 PM. Jollof, soups, and more.',
    tagline: 'Where culinary artistry meets authentic tradition',
  },
  nav: {
    home: 'Home',
    menu: 'Menu',
    order: 'Order',
    contact: 'Contact',
    privacy: 'Privacy',
    open: 'Open menu',
    close: 'Close menu',
    language: 'Language',
  },
  pickup: {
    summary: 'Pickups are every Wednesday and Friday after 3:00 PM.',
    cutoff: 'Orders close every Tuesday and Thursday at 4:00 PM.',
  },
  payment: {
    note: 'After your order is confirmed by email, we send Revolut or bank transfer details in a follow-up message. Cash is accepted at pickup.',
    methods: 'Revolut, bank transfer, or cash',
    emailLine:
      'Payment: we will reply with Revolut or bank transfer details. Cash is accepted at pickup.',
  },
  banner: {
    friday: {
      title: 'Pickup day',
      message:
        "It's Friday — pickups are every Wednesday and Friday after 3:00 PM. New orders open again on Sunday.",
    },
    weekend: {
      title: 'Ordering closed',
      message: 'We are closed for orders this weekend. Ordering reopens Sunday.',
    },
    tuesdayClosed: {
      title: 'Ordering closed',
      message:
        'Orders close every Tuesday and Thursday at 4:00 PM. Ordering reopens Wednesday for Friday pickup.',
    },
    tuesdayOpen: {
      title: 'Last day to order for Wednesday pickup',
      message:
        'Order before 4:00 PM today (Budapest time). Pickups are every Wednesday and Friday after 3:00 PM.',
    },
    thursdayClosed: {
      title: 'Ordering closed',
      message:
        'Orders close every Tuesday and Thursday at 4:00 PM. Pickups are every Wednesday and Friday after 3:00 PM. New orders open again on Sunday.',
    },
    thursdayOpen: {
      title: 'Last day to order for Friday pickup',
      message:
        'Order before 4:00 PM today (Budapest time). Pickups are every Wednesday and Friday after 3:00 PM.',
    },
    open: {
      title: 'Now taking orders',
      message:
        'Orders close every Tuesday and Thursday at 4:00 PM. Pickups are every Wednesday and Friday after 3:00 PM.',
    },
  },
  home: {
    viewMenu: 'View Menu',
    orderNow: 'Order Now',
    favorites: 'Customer favorites',
    viewFullMenu: 'View full menu →',
    pickup: 'Pickup',
  },
  menu: {
    title: 'Menu',
    subtitle: 'Discover our culinary offerings',
    riceBowls: 'Rice bowls',
    soups: 'Soups & stews',
    backHome: '← Back to Home',
    orderNow: 'Order Now →',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Get in touch with us',
    instagram: 'Instagram',
    instagramNote: 'Message us for questions, pickup location details, or payment info.',
    phone: 'Phone',
    email: 'Email',
    pickup: 'Pickup',
    maps: 'Open in Google Maps →',
    payment: 'Payment',
    accepted: 'Accepted',
    placeOrder: 'Place an order',
  },
  footer: {
    pickup: 'Pickup',
    connect: 'Connect',
    payVia: 'Pay via {methods}.',
  },
  order: {
    title: 'Order Now',
    subtitle: 'Select items from our menu',
    closedNote:
      'Ordering is currently closed. You can still browse the menu — check the banner above for when we reopen.',
    menuItems: 'Menu Items',
    decrease: 'Decrease {name} quantity',
    increase: 'Increase {name} quantity',
    remove: 'Remove',
    removeNamed: 'Remove {name} from order',
    yourOrder: 'Your order',
    clearCart: 'Clear cart',
    editHint: 'Change quantities or remove items before you submit.',
    addMore: '+ Add more items',
    total: 'Total',
    customer: 'Customer Information',
    name: 'Name',
    email: 'Email',
    confirmEmail: 'Confirm email',
    phone: 'Phone',
    notes: 'Special Instructions (Optional)',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    confirmPlaceholder: 'Type your email again',
    phonePlaceholder: '+36 20 123 4567',
    notesPlaceholder: 'Protein choice for Tomato Stew, allergies, etc.',
    emailMismatch: 'Email addresses do not match.',
    proteinNote: 'Add your protein choice in special instructions.',
    sending: 'Sending Order...',
    submit: 'Submit Order',
    orderingClosed: 'Ordering Closed',
    infoTitle: 'Order Information',
    infoBody: 'Select items from the menu above to place an order.',
    call: 'Call to Order',
    instagram: 'Order via Instagram',
    contact: 'Contact Us',
    backHome: '← Back to Home',
    itemCount: '{count} item',
    itemCountPlural: '{count} items',
    review: 'Review order',
    placed: 'Order placed',
    orderCode: 'Order code',
    showCode: 'Show this code at pickup.',
    privacyNote: 'Your name, email, and phone are used only to prepare this order.',
    privacyLink: 'Privacy notice',
    success:
      'Order sent successfully. After this confirmation, we send Revolut or bank transfer details in a follow-up message. Cash is accepted at pickup.',
    successNoEmail:
      ' We could not send a confirmation email, but your order was received.',
    closedSubmit:
      'Ordering is closed for this week. Check back Sunday or message us on Instagram.',
    emptyCart: 'Please select at least one item to order.',
    missingFields: 'Please fill in all required fields (Name, Email, Phone).',
    emailMismatchSubmit: 'The email addresses do not match. Please check them and try again.',
    failed: 'Failed to send order. Please try again or contact us.',
  },
  email: {
    customerSubject: 'Order confirmation {code} - Gourmet Pot',
    greeting: 'Hi {name},',
    thanks: 'Thanks for your order. We received it and will review it shortly.',
    orderCode: 'Order code',
    showCode: 'Show this code at pickup.',
    pickup: 'Pickup',
    yourOrder: 'Your order',
    total: 'Total',
    orderDate: 'Order Date',
    sent: 'Order sent successfully',
  },
  api: {
    notConfigured: 'Email service is not configured. Please contact the restaurant directly.',
    invalid: 'Invalid order data provided.',
    badEmail: 'Please enter a valid email address.',
    configError: 'Email service configuration error. Please contact the restaurant directly.',
    sent: 'Order sent successfully!',
    failed: 'Failed to send order. Please try again or call us.',
    auth: 'Email authentication failed. Please contact the restaurant directly.',
    connection: 'Could not connect to email server. Please try again later.',
  },
}

export type Messages = typeof en
export default en
