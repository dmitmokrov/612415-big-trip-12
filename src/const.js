export const preposition = {
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`
};

export const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export const Description = {
  AMSTERDAM: `Amsterdam is the capital and most populous city of the Netherlands with a population of 872,680 within the city proper, 1,380,872 in the urban area and 2,410,960 in the metropolitan area. Found within the province of North Holland, Amsterdam is colloquially referred to as the "Venice of the North", attributed by the large number of canals which form a UNESCO World Heritage Site.`,
  CHAMONIX: `Chamonix-Mont-Blanc, more commonly known as Chamonix, is a commune in the Haute-Savoie department in the Auvergne-Rhône-Alpes region in south-eastern France. It was the site of the first Winter Olympics in 1924.`,
  GENEVA: `Geneva is the second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland. Situated where the Rhône exits Lake Geneva, it is the capital of the Republic and Canton of Geneva.`,
  LONDON: `London is the capital and largest city of England and the United Kingdom. The city stands on the River Thames in the south-east of England, at the head of its 50-mile (80 km) estuary leading to the North Sea, London has been a major settlement for two millennia. Londinium was founded by the Romans. The City of London, London's ancient core and financial centre − an area of just 1.12 square miles (2.9 km2) and colloquially known as the Square Mile − retains boundaries that closely follow its medieval limits. The adjacent City of Westminster is an Inner London borough and has for centuries been the location of much of the national government. Thirty one additional boroughs north and south of the river also comprise modern London. London is governed by the mayor of London and the London Assembly.`,
  PARIS: `Paris is the capital and most populous city of France, with an estimated population of 2,150,271 residents as of 2020, in an area of 105 square kilometres (41 square miles). Since the 17th century, Paris has been one of Europe's major centres of finance, diplomacy, commerce, fashion, science and arts. The City of Paris is the centre and seat of government of the Île-de-France, or Paris Region, which has an estimated official 2020 population of 12,278,210, or about 18 percent of the population of France. The Paris Region had a GDP of €709 billion ($808 billion) in 2017. According to the Economist Intelligence Unit Worldwide Cost of Living Survey in 2018, Paris was the second most expensive city in the world, after Singapore, and ahead of Zürich, Hong Kong, Oslo and Geneva. Another source ranked Paris as most expensive, on a par with Singapore and Hong Kong, in 2018.`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const UserAction = {
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`,
  EDIT_EVENT: `EDIT_EVENT`
};

export const FilterType = {
  EVERYTHING: `EVERYTHING`,
  FUTURE: `FUTURE`,
  PAST: `PAST`
};

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.startTime > Date.now()),
  [FilterType.PAST]: (events) => events.filter((event) => event.endTime < Date.now())
};
