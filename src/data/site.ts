export const site = {
  name: "Crystal Interiors",
  siteUrl:
    import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.crystalinteriors.cz",
  description:
    "Navrhujeme a realizujeme interiéry a nábytek na míru pro byty, domy i komerční prostory v Brně a okolí.",
  keywords: [
    "interiérový design Brno",
    "nábytek na míru",
    "návrh kuchyně",
    "vizualizace interiéru",
    "realizace interiéru",
    "kuchyně na míru",
    "komerční interiéry",
    "Crystal Interiors",
  ],
  nav: [
    { href: "/", label: "Úvod" },
    { href: "/projekty/", label: "Projekty" },
    { href: "/sluzby/", label: "Služby" },
    { href: "/o-nas/", label: "O nás" },
    { href: "/kontakt/", label: "Kontakt" },
  ],
  social: {
    facebook: "https://www.facebook.com/Crystalinteriors/",
    instagram: "https://www.instagram.com/crystal_interiors_cz/",
  },
  company: {
    legalName: "Lucie Vodáková",
    ico: "21991707",
    showroomName: "Crystal Interiors",
    address: "Dusíkova 900/3c, 638 00 Brno-Lesná",
    registeredAddress: "Koniklecová 467/4, 634 00 Brno",
    phones: ["+420 774 446 988", "+420 725 452 566"],
    emails: [
      "vodakova@crystalinteriors.cz",
      "neklapilova@crystalinteriors.cz",
    ],
    contacts: [
      {
        name: "Lucie Vodáková",
        role: "Designérka",
        email: "vodakova@crystalinteriors.cz",
        phone: "+420 774 446 988",
      },
      {
        name: "Hanka Neklapilová",
        role: "Designérka",
        email: "neklapilova@crystalinteriors.cz",
        phone: "+420 725 452 566",
      },
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2601.8883735387655!2d16.624181377055472!3d49.29762077139047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712946d08b1e2ed%3A0x5f8409e0eea3efcb!2zRHVzw61rb3ZhIDkwMC8zYywgNjM4IDAwIEJybm8tTGVzbsOh!5e0!3m2!1scs!2scz!4v1714500000000!5m2!1scs!2scz",
  },
  hero: {
    eyebrow: "Interiéry a nábytek na míru",
    title: "Interiér, který dobře funguje, dobře vypadá a vydrží každodenní provoz.",
    text:
      "Navrhujeme a realizujeme kuchyně, obytné i komerční prostory tak, aby se v nich dobře žilo, pracovalo i reprezentovalo.",
    primaryCta: { href: "/kontakt/", label: "Nezávazná konzultace" },
    secondaryCta: { href: "/projekty/", label: "Prohlédnout projekty" },
    image:
      "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000193-22aec22aed/image-crop-200000191.png",
  },
  home: {
    introTitle: "Návrh, vizualizace a realizace v jednom procesu",
    introText:
      "Od prvního dispozičního návrhu až po osazení posledního detailu držíme projekt pohromadě. Díky tomu hlídáme ergonomii, rozpočet i kvalitu provedení.",
    businessSentence:
      "Pomáháme klientům rozhodovat se jistěji a investovat do interiéru, který dává smysl dlouhodobě.",
    parallaxImage: "https://duyn491kcolsw.cloudfront.net/files/1u/1um/1umned.jpg",
  },
  services: [
    {
      title: "Kuchyně na míru",
      text: "Řešíme kuchyně od dispozice přes materiály a spotřebiče až po dodání na klíč.",
      image:
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000191-c6da0c6da3/vizu%20kuchyn%C4%9B%20_1.png",
    },
    {
      title: "Ložnice, šatny a úložné systémy",
      text: "Navrhujeme klidné a praktické zázemí s úložnými prostory, které využijí každý centimetr.",
      image:
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000211-872898728c/138549013_1799853613529238_6851870505081232937_n%20%281%29.jpeg",
    },
    {
      title: "Koupelny a technické zázemí",
      text: "Koupelny navrhujeme s důrazem na provoz, údržbu a čisté detailní řešení.",
      image:
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000086-75d8775d89/Koutn%C3%BD_spodn%C3%AD_koupelna-vzor_Watermarked.jpeg",
    },
    {
      title: "Obývací a dětské pokoje",
      text: "Kombinujeme pohodlí, reprezentativní vzhled a chytré ukládání pro každodenní život.",
      image:
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000304-51b0a51b0c/vizu_d%C4%9Btsk%C3%BDpokoj%202_Watermarked-7.png",
    },
    {
      title: "Kanceláře a komerční interiéry",
      text: "Tvoříme pracovní a obchodní prostory, které podporují výkon i dojem z vaší značky.",
      image:
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000286-f0fa5f0fa7/196461753_1905792292935369_8953993768414667784_n%20%281%29.jpeg",
    },
    {
      title: "Hotely, restaurace a kavárny",
      text: "Navrhujeme prostory, ve kterých se hosté cítí přirozeně dobře a chtějí se vracet.",
      image: "https://duyn491kcolsw.cloudfront.net/files/24/24t/24tltk.jpg",
    },
  ],
  process: [
    {
      title: "Zkušenost",
      text: "Spojujeme dlouholetou praxi v interiérech, materiálech a zakázkové výrobě nábytku.",
    },
    {
      title: "Osobní spolupráce",
      text: "Schůzku zvládneme u nás ve vzorkovně i přímo u vás, podle typu projektu a času klienta.",
    },
    {
      title: "Spolupráce s profesionály",
      text: "Navazujeme na truhláře, architekty i developery a držíme technické řešení pod kontrolou.",
    },
    {
      title: "Termíny a realizace",
      text: "Návrh nevnímáme izolovaně. Přemýšlíme o výrobě, montáži a reálném harmonogramu.",
    },
  ],
  pricing: [
    { title: "Vizualizace kuchyně", price: "od 2 000 Kč" },
    { title: "Vizualizace obývacího pokoje nebo předsíně", price: "od 1 500 Kč" },
    { title: "Vizualizace ložnice nebo šatny", price: "od 2 000 Kč" },
    { title: "Vizualizace bytu", price: "od 4 000 Kč" },
    { title: "Vizualizace rodinného domu", price: "od 8 000 Kč" },
    { title: "Komerční a atypické prostory", price: "na poptání" },
    { title: "Konzultace po Brně", price: "zdarma" },
    { title: "Konzultace mimo Brno", price: "12 Kč / km" },
  ],
  about: {
    title: "Dvě designérky, jeden společný standard kvality",
    lead:
      "Ve středu každého projektu stojí potřeby klienta, způsob užívání prostoru a detail, který bude fungovat i po letech.",
    paragraphs: [
      "Crystal Interiors stojí na propojení zkušeností Lucie Vodákové a Hanky Neklapilové. Každá přináší jiný pohled, ale stejný důraz na praktičnost, estetiku a dobře zvládnutou realizaci.",
      "Navrhujeme interiéry pro bydlení i podnikání. Klientům pomáháme zpřehlednit rozhodování, ohlídat návaznosti a proměnit představu v konkrétní prostor.",
      "Neprodáváme jen vizualizaci. Dodáváme jistotu, že dispozice, materiály a výroba dávají dohromady celek, který obstojí v běžném provozu.",
    ],
  },
  references: [
    {
      slug: "kuchyne",
      tag: "kuchyne",
      title: "Kuchyně",
      text:
        "Kuchyně řešíme od dispozice a ergonomie přes materiály a spotřebiče až po čisté detaily, které vydrží každodenní provoz.",
    },
    {
      slug: "obyvaky",
      tag: "obyvaky",
      title: "Obývací pokoje",
      text:
        "Obývací prostory s důrazem na pohodlí, reprezentativní výraz a chytré ukládání pro skutečný rytmus domácnosti.",
    },
    {
      slug: "loznice",
      tag: "loznice",
      title: "Ložnice a šatny",
      text:
        "Klidné zázemí pro odpočinek s úložnými systémy navrženými přesně na míru dispozice a věcí, které v nich žijí.",
    },
    {
      slug: "detske-pokoje",
      tag: "detske-pokoje",
      title: "Dětské a studentské pokoje",
      text:
        "Pokoje navržené tak, aby rostly s dítětem. Ukládání, studijní zóna i odpočinek v jednom funkčním celku.",
    },
    {
      slug: "koupelny",
      tag: "koupelny",
      title: "Koupelny",
      text:
        "Koupelny s důrazem na provoz, údržbu a detail. Materiály a zařizovací předměty volíme s ohledem na dlouhou životnost.",
    },
    {
      slug: "komercni",
      tag: "komercni",
      title: "Kanceláře a komerční interiéry",
      text:
        "Pracovní, obchodní a gastro prostory navržené tak, aby podporovaly výkon, provoz i dojem z vaší značky.",
    },
  ],
};

export type SiteData = typeof site;
