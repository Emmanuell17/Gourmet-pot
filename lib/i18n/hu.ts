import type { Messages } from './en'

const hu: Messages = {
  meta: {
    description:
      'Autentikus nigériai konyha Debrecenben — heti előrendelés, átvétel szerdán és pénteken 15:00 után. Jollof, levesek és más ételek.',
    tagline: 'Ahol a konyhaművészet találkozik az autentikus hagyománnyal',
  },
  nav: {
    home: 'Főoldal',
    menu: 'Étlap',
    order: 'Rendelés',
    contact: 'Kapcsolat',
    privacy: 'Adatvédelem',
    open: 'Menü megnyitása',
    close: 'Menü bezárása',
    language: 'Nyelv',
  },
  pickup: {
    summary: 'Az átvétel minden szerdán és pénteken 15:00 után van.',
    cutoff: 'A rendelés minden kedden és csütörtökön 16:00-kor zárul.',
  },
  payment: {
    note: 'A visszaigazoló e-mail után egy következő üzenetben küldjük a Revolut vagy az átutalás adatait. Készpénzzel az átvételkor is lehet fizetni.',
    methods: 'Revolut, banki átutalás vagy készpénz',
    emailLine:
      'Fizetés: válaszunkban elküldjük a Revolut vagy az átutalás adatait. Készpénzzel az átvételkor is lehet fizetni.',
  },
  banner: {
    friday: {
      title: 'Átvételi nap',
      message:
        'Péntek van — az átvétel minden szerdán és pénteken 15:00 után van. Új rendelést vasárnaptól lehet leadni.',
    },
    weekend: {
      title: 'A rendelés zárva',
      message: 'A hétvégén nem fogadunk rendelést. Vasárnap nyitunk újra.',
    },
    tuesdayClosed: {
      title: 'A rendelés zárva',
      message:
        'A rendelés minden kedden és csütörtökön 16:00-kor zárul. Szerdán nyit újra a pénteki átvételre.',
    },
    tuesdayOpen: {
      title: 'Utolsó nap a szerdai átvételhez',
      message:
        'Rendelj ma 16:00 előtt (budapesti idő). Az átvétel minden szerdán és pénteken 15:00 után van.',
    },
    thursdayClosed: {
      title: 'A rendelés zárva',
      message:
        'A rendelés minden kedden és csütörtökön 16:00-kor zárul. Az átvétel minden szerdán és pénteken 15:00 után van. Új rendelést vasárnaptól lehet leadni.',
    },
    thursdayOpen: {
      title: 'Utolsó nap a pénteki átvételhez',
      message:
        'Rendelj ma 16:00 előtt (budapesti idő). Az átvétel minden szerdán és pénteken 15:00 után van.',
    },
    open: {
      title: 'Most lehet rendelni',
      message:
        'A rendelés minden kedden és csütörtökön 16:00-kor zárul. Az átvétel minden szerdán és pénteken 15:00 után van.',
    },
  },
  home: {
    viewMenu: 'Étlap',
    orderNow: 'Rendelés',
    favorites: 'Vendégeink kedvencei',
    viewFullMenu: 'Teljes étlap →',
    pickup: 'Átvétel',
  },
  menu: {
    title: 'Étlap',
    subtitle: 'Fedezd fel az ételeinket',
    riceBowls: 'Rizses tálak',
    soups: 'Levesek és raguk',
    backHome: '← Vissza a főoldalra',
    orderNow: 'Rendelés →',
  },
  contact: {
    title: 'Kapcsolat',
    subtitle: 'Lépj kapcsolatba velünk',
    instagram: 'Instagram',
    instagramNote: 'Írj, ha kérdésed van, vagy az átvétel helyét és a fizetést szeretnéd tudni.',
    phone: 'Telefon',
    email: 'E-mail',
    pickup: 'Átvétel',
    maps: 'Megnyitás a Google Térképen →',
    payment: 'Fizetés',
    accepted: 'Elfogadott',
    placeOrder: 'Rendelés leadása',
  },
  footer: {
    pickup: 'Átvétel',
    connect: 'Elérhetőség',
    payVia: 'Fizetés: {methods}.',
  },
  order: {
    title: 'Rendelés',
    subtitle: 'Válassz az étlapról',
    closedNote:
      'A rendelés jelenleg zárva van. Az étlapot így is megnézheted — a fenti sáv mutatja, mikor nyitunk újra.',
    menuItems: 'Ételek',
    decrease: '{name} mennyiségének csökkentése',
    increase: '{name} mennyiségének növelése',
    remove: 'Törlés',
    removeNamed: '{name} törlése a rendelésből',
    yourOrder: 'Rendelésed',
    clearCart: 'Kosár ürítése',
    editHint: 'A küldés előtt módosíthatod a mennyiséget, vagy törölhetsz tételt.',
    addMore: '+ További ételek',
    total: 'Összesen',
    customer: 'Adataid',
    name: 'Név',
    email: 'E-mail',
    confirmEmail: 'E-mail megerősítése',
    phone: 'Telefon',
    notes: 'Külön kérés (nem kötelező)',
    namePlaceholder: 'A neved',
    emailPlaceholder: 'email@pelda.hu',
    confirmPlaceholder: 'Írd be újra az e-mail-címet',
    phonePlaceholder: '+36 20 123 4567',
    notesPlaceholder: 'Fehérje a Tomato Stew-hoz, allergia stb.',
    emailMismatch: 'Az e-mail-címek nem egyeznek.',
    proteinNote: 'A fehérjét a külön kérésnél írd meg.',
    sending: 'Küldés...',
    submit: 'Rendelés elküldése',
    orderingClosed: 'A rendelés zárva',
    infoTitle: 'Rendelés',
    infoBody: 'Válassz az étlapról a rendeléshez.',
    call: 'Rendelés telefonon',
    instagram: 'Rendelés Instagramon',
    contact: 'Kapcsolat',
    backHome: '← Vissza a főoldalra',
    itemCount: '{count} tétel',
    itemCountPlural: '{count} tétel',
    review: 'Rendelés áttekintése',
    placed: 'Rendelés leadva',
    orderCode: 'Rendelési kód',
    showCode: 'Mutasd ezt a kódot az átvételkor.',
    privacyNote: 'A nevedet, az e-mail-címedet és a telefonszámodat csak a rendelés elkészítéséhez használjuk.',
    privacyLink: 'Adatvédelmi tájékoztató',
    success:
      'A rendelés elküldve. A visszaigazolás után egy következő üzenetben küldjük a Revolut vagy az átutalás adatait. Készpénzzel az átvételkor is lehet fizetni.',
    successNoEmail:
      ' A visszaigazoló e-mailt nem tudtuk elküldeni, de a rendelést megkaptuk.',
    closedSubmit:
      'Erre a hétre a rendelés zárva van. Vasárnap nézz vissza, vagy írj Instagramon.',
    emptyCart: 'Válassz legalább egy ételt.',
    missingFields: 'Töltsd ki a kötelező mezőket (név, e-mail, telefon).',
    emailMismatchSubmit: 'Az e-mail-címek nem egyeznek. Ellenőrizd, és próbáld újra.',
    failed: 'A rendelést nem sikerült elküldeni. Próbáld újra, vagy írj nekünk.',
  },
  email: {
    customerSubject: 'Rendelés visszaigazolása {code} - Gourmet Pot',
    greeting: 'Szia {name}!',
    thanks: 'Köszönjük a rendelést. Megkaptuk, és hamarosan átnézzük.',
    orderCode: 'Rendelési kód',
    showCode: 'Mutasd ezt a kódot az átvételkor.',
    pickup: 'Átvétel',
    yourOrder: 'A rendelésed',
    total: 'Összesen',
    orderDate: 'Rendelés ideje',
    sent: 'A rendelés elküldve',
  },
  api: {
    notConfigured: 'Az e-mail küldés nincs beállítva. Kérjük, keresd a vendéglőt közvetlenül.',
    invalid: 'A rendelés adatai hibásak.',
    badEmail: 'Adj meg egy érvényes e-mail-címet.',
    configError: 'Az e-mail beállítása hibás. Kérjük, keresd a vendéglőt közvetlenül.',
    sent: 'A rendelés elküldve.',
    failed: 'A rendelést nem sikerült elküldeni. Próbáld újra, vagy hívd a vendéglőt.',
    auth: 'Az e-mail azonosítás sikertelen. Kérjük, keresd a vendéglőt közvetlenül.',
    connection: 'Nem sikerült csatlakozni az e-mail szerverhez. Próbáld újra később.',
  },
}

export default hu
