import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';
import {trips} from './mock/mock.js';
import {render, RenderPosition} from './utils/render.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
eventsModel.setEvents(trips);
const filterModel = new FilterModel();

const tripInfoComponent = new TripInfoView(eventsModel.getEvents());
const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(tripMainControlsElement, filterModel, eventsModel);

render(tripInfoComponent, new TripCostView(eventsModel.getEvents()), RenderPosition.BEFOREEND); // Отрисовка цены поездки
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN); // Отрисовка информации о поездке
render(tripMainControlsElement, new MenuView(), RenderPosition.AFTERBEGIN); // Отрисовка меню

filterPresenter.init();
tripPresenter.init();
