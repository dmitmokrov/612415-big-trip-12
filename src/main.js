import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FilterView from './view/filter.js';
import TripPresenter from './presenter/trip.js';
import {trips} from './mock/mock.js';
import {render, RenderPosition} from './utils/render.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoView(trips);
const tripPresenter = new TripPresenter(tripEventsElement);

render(tripInfoComponent, new TripCostView(trips), RenderPosition.BEFOREEND); // Отрисовка цены поездки
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN); // Отрисовка информации о поездке
render(tripMainControlsElement, new MenuView(), RenderPosition.AFTERBEGIN); // Отрисовка меню
render(tripMainControlsElement, new FilterView(), RenderPosition.BEFOREEND); // Отрисовка фильтров

tripPresenter.init(trips);
