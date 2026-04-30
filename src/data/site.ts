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
      { name: "Lucie Vodáková", email: "vodakova@crystalinteriors.cz" },
      { name: "Hanka Neklapilová", email: "neklapilova@crystalinteriors.cz" },
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
  projects: [
    {
      folder: "pudni-nastavba-brno-lisen",
      title: "Půdní nástavba v Brně-Líšni",
      subtitle: "Vizualizace koupelny a WC",
      text:
        "Koupelna v teplých neutrálních tónech s chytrým úložným řešením, vestavnými spotřebiči a detaily navrženými pro snadnou údržbu.",
      images: [
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000358-c392fc3931/Koupelna_001_pohled3%20-%20kopie.png",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000359-64e9c64e9f/Koupelna_001_pohled3.png",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000360-136e0136e3/Koupelna_001_pohled5.png",
      ],
    },
    {
      folder: "kuchynsky-koncept-rodinny-dum",
      title: "Kuchyňský koncept pro rodinný dům",
      subtitle: "Návrh dispozice, ergonomie a materiálů",
      text:
        "Kuchyně navržená pro každodenní provoz s důrazem na logické zóny, čistou linku detailů a dlouhou životnost vybavení.",
      images: [
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000191-c6da0c6da3/vizu%20kuchyn%C4%9B%20_1.png",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000016-72a8f72a91/Bartlov%C3%A1%20vizualizace%20kuchyn%C4%9B%201_Watermarked%20-%20kopie.png",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000296-08d4008d43/B%C5%99%C3%ADnkov%C3%A1_vizu_pohled1_Watermarked.png",
      ],
    },
    {
      folder: "obytny-prostor-zakazkovy-nabytek",
      title: "Obytný prostor se zakázkovým nábytkem",
      subtitle: "Návrh interiéru a návazných úložných prvků",
      text:
        "Spojení klidné atmosféry, reprezentativního výrazu a nábytku navrženého přesně pro dispozici i rytmus domácnosti.",
      images: [
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000246-71f9c71f9f/gruberova%20obyvak1_Watermarked.png",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000238-b5ddeb5de1/11.02.2021%20varianta%20k%20podpisu%201_Watermarked.png",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000262-9ac659ac68/IMG_7356%20%281%29_Watermarked.jpeg",
      ],
    },
    {
      folder: "studentsky-pokoj-rodinny-dum",
      title: "Studentský pokoj v rodinném domě",
      subtitle: "Návrh a následná realizace",
      text:
        "Pokoj navržený jako dlouhodobě udržitelný prostor pro odpočinek, studium i ukládání věcí, s návazností na skutečnou výrobu.",
      images: [
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000377-5845458456/IMG_20210531_140541%20%281%29.jpeg",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000378-62f0462f06/IMG_20210531_140543%20%281%29.jpeg",
        "https://d9775ec23a.clvaw-cdnwnd.com/06dde8fa305f9cdafdc34740aa3f3c92/200000386-048e4048e7/vizualizace_18.1.2021_1pohled_Watermarked.png",
      ],
    },
  ],
};

export type SiteData = typeof site;
