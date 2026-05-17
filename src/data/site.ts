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
      slug: "kuchyne",
      title: "Kuchyně",
      text: "Kuchyně a kuchyňské linky na míru — od dispozice a materiálů přes spotřebiče až po výrobu a montáž.",
      image: "/images/thumbnails/kuchyne.avif",
    },
    {
      slug: "loznice",
      title: "Ložnice",
      text: "Ložnice a vestavěné skříně na míru. Klidné zázemí s úložnými systémy využívajícími každý centimetr.",
      image: "/images/thumbnails/loznice.avif",
    },
    {
      slug: "satny-a-predsine",
      title: "Šatny a předsíně",
      text: "Skříně a vybavení šaten s přesným úložným systémem podle vašich věcí a dispozice prostoru.",
      image: "/images/thumbnails/satny-a-predsine.avif",
    },
    {
      slug: "koupelny",
      title: "Koupelny",
      text: "Příjemné místo pro relaxaci. Materiály a zařizovací předměty volíme s důrazem na provoz a údržbu.",
      image: "/images/thumbnails/koupelny.avif",
    },
    {
      slug: "obyvaky",
      title: "Obývací pokoje",
      text: "Odpočinek i reprezentace. Pohodlí, výraz a chytré ukládání pro skutečný rytmus domácnosti.",
      image: "/images/thumbnails/obyvaci-pokoje.avif",
    },
    {
      slug: "detske-pokoje",
      title: "Dětský pokoj",
      text: "Multifunkční prostor, který vydrží. Studijní zóna, ukládání i odpočinek v jednom funkčním celku.",
      image: "/images/thumbnails/detsky-pokoj.avif",
    },
    {
      slug: "kancelare",
      title: "Kanceláře",
      text: "Kvalitní rozložení a dobrý nábytek. Pracovní prostory, které podporují výkon i dojem ze značky.",
      image: "/images/thumbnails/kancelare.avif",
    },
    {
      slug: "hotely",
      title: "Hotely",
      text: "Krásné pokoje na míru. Pohostinné prostředí navržené pro hosty, kteří se rádi vracejí.",
      image: "/images/thumbnails/hotely.avif",
    },
    {
      slug: "restaurace-bary-kavarny",
      title: "Restaurace, bary a kavárny",
      text: "Stylový prostor podle vašeho stylu. Atmosféra, provoz a detail propojené v jedné lince.",
      image: "/images/thumbnails/restaurace-bary-kavarny.avif",
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
      "Crystal Interiors stojí na propojení zkušeností <strong>Lucie Vodákové</strong> a <strong>Hanky Neklapilové</strong>. Každá přináší jiný pohled, ale stejný důraz na <strong>praktičnost, estetiku a dobře zvládnutou realizaci</strong>.",
      "Navrhujeme interiéry pro <strong>bydlení i podnikání</strong>. Klientům pomáháme <strong>zpřehlednit rozhodování</strong>, ohlídat návaznosti a proměnit představu v <strong>konkrétní prostor</strong>.",
      "Neprodáváme jen vizualizaci. <strong>Dodáváme jistotu</strong>, že dispozice, materiály a výroba dávají dohromady <strong>celek, který obstojí v běžném provozu</strong>.",
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
      slug: "loznice",
      tag: "loznice",
      title: "Ložnice",
      text:
        "Klidné zázemí pro odpočinek s vestavěnými skříněmi a úložnými systémy navrženými přesně na míru dispozice.",
    },
    {
      slug: "satny-a-predsine",
      tag: "satny",
      title: "Šatny a předsíně",
      text:
        "Skříně a vybavení šaten s přesným úložným systémem podle vašich věcí a dispozice prostoru.",
    },
    {
      slug: "koupelny",
      tag: "koupelny",
      title: "Koupelny",
      text:
        "Koupelny s důrazem na provoz, údržbu a detail. Materiály a zařizovací předměty volíme s ohledem na dlouhou životnost.",
    },
    {
      slug: "obyvaky",
      tag: "obyvaky",
      title: "Obývací pokoje",
      text:
        "Obývací prostory s důrazem na pohodlí, reprezentativní výraz a chytré ukládání pro skutečný rytmus domácnosti.",
    },
    {
      slug: "detske-pokoje",
      tag: "detske-pokoje",
      title: "Dětské a studentské pokoje",
      text:
        "Pokoje navržené tak, aby rostly s dítětem. Ukládání, studijní zóna i odpočinek v jednom funkčním celku.",
    },
    {
      slug: "kancelare",
      tag: "kancelare",
      title: "Kanceláře",
      text:
        "Pracovní a obchodní prostory navržené tak, aby podporovaly výkon, provoz i dojem ze značky.",
    },
    {
      slug: "hotely",
      tag: "hotely",
      title: "Hotely",
      text:
        "Hotelové pokoje a společné prostory s pohostinnou atmosférou — navrhujeme tak, aby se hosté rádi vraceli.",
    },
    {
      slug: "restaurace-bary-kavarny",
      tag: "restaurace",
      title: "Restaurace, bary a kavárny",
      text:
        "Gastro prostory, ve kterých provoz, atmosféra a značka drží spolu — od dispozice po finální detail.",
    },
  ],
};

export type SiteData = typeof site;
