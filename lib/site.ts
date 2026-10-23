// All företagsinformation på ett ställe. Ändra här så uppdateras hela sidan.

export const SITE = {
  name: 'Taxi Helsingborg 24x7',
  legalName: 'Taxi Helsingborg 24x7 AB',
  url: 'https://taxihelsingborg24x7.com',
  phone: '042-18 09 00',
  phoneHref: 'tel:+4642180900',
  whatsapp: 'https://wa.me/4642180900',
  email: 'info@taxihelsingborg24x7.com',
  // Bokningar och förfrågningar från formulären skickas hit.
  // Kräver verifierad domän i Resend, annars tar Resend bara emot mejl till kontots egen adress.
  formEmail: 'taxi24x7hbg@gmail.com',
  street: 'Häradsgatan 3B',
  postalCode: '256 59',
  city: 'Helsingborg',
  mapsUrl: 'https://maps.google.com/?q=H%C3%A4radsgatan+3B,+256+59+Helsingborg',
  facebook: 'https://www.facebook.com/TaxiHelsingborg24x7/',
  instagram: 'https://www.instagram.com/taxi_helsingborg_24x7/',
  googleReview: 'https://g.page/r/CY8ZnTpQgpVwEB0/review',
};

export const AIRPORTS = [
  { code: 'CPH', name: 'Köpenhamn Kastrup', short: 'Kastrup', price: 1895, dest: 'Köpenhamn Kastrup Airport' },
  { code: 'MMX', name: 'Malmö Sturup', short: 'Sturup', price: 1795, dest: 'Sturup Flygplats' },
  { code: 'AGH', name: 'Ängelholm Helsingborg', short: 'Ängelholm', price: 695, dest: 'Ängelholm Flygplats' },
];

// Fasta priser från Helsingborg, personbil max 4 personer.
export const PRICES: [string, number][] = [
  ['Allerum', 400], ['Arild', 950], ['Billesholm', 675], ['Bjuv', 625], ['Bårslöv', 405],
  ['Båstad', 1450], ['Domsten', 450], ['Ekeby', 645], ['Eslöv', 1395], ['Förslöv', 1150],
  ['Gantofta', 425], ['Glumslöv', 495], ['Göteborg', 4350], ['Halmstad', 1850], ['Hasslarp', 655],
  ['Hyllinge', 495], ['Hässleholm', 1550], ['Höganäs', 750], ['Jonstorp', 715], ['Jönköping', 3995],
  ['Kastrup flygplats', 1895], ['Klippan', 750], ['Kristianstad', 1850], ['Kågeröd', 995],
  ['Köpenhamn C', 2350], ['Landskrona', 750], ['Lerberget', 705], ['Lund', 1385], ['Malmö', 1495],
  ['Markaryd', 1750], ['Munka Ljungby', 950], ['Mölle', 850], ['Perstorp', 1150], ['Påarp', 415],
  ['Rydebäck', 480], ['Stockholm', 13500], ['Sturup flygplats', 1795], ['Svalöv', 1200],
  ['Torekov', 1515], ['Ulared', 2950], ['Vallåkra', 645], ['Varberg', 2850], ['Viken', 645],
  ['Väla', 325], ['Ystad', 2350], ['Åstorp', 625], ['Ängelholm', 750], ['Ängelholm flygplats', 695],
  ['Ödåkra', 395],
];

// Visas överst i prislistan.
export const POPULAR = ['Malmö', 'Lund', 'Landskrona', 'Höganäs', 'Ängelholm'];

export const REVIEWS = [
  { name: 'Gösta Dahlberg', text: 'Underbart taxibolag med bra priser och trevliga chaufförer. Rekommenderar starkt.' },
  { name: 'Petter Stegroth', text: 'Jättetrevlig chaufför, vi upplevde resan jättebra. Prova gärna denna taxi när ni är i Helsingborg.' },
  { name: 'Magnus Bengtsson', text: 'Mycket bra bemötande! Chauffören var jättetrevlig. Rekommenderas varmt.' },
  { name: 'Kim Andersson', text: 'Jättebra! Även när jag är stressad och ringer kommer de så snabbt de kan.' },
  { name: 'Izabella Qasem', text: 'Finns inget att klaga på. Superbekväma och trevliga!' },
  { name: 'Melvin Vacuum', text: 'Snabba bud till rätt pris! Från PIAB Vakuum i Helsingborg till en mycket nöjd kund i Mellansverige.' },
];

export const formatKr = (n: number) => n.toLocaleString('sv-SE').replace(/ /g, ' ');

// Länk till bokningssidan, med resmålet förifyllt.
export const bookHref = (destination?: string) =>
  destination ? `/boka?till=${encodeURIComponent(destination)}` : '/boka';
