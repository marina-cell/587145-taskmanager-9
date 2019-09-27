import {createMainMenuTemplate} from './components/main-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createFiltersTemplate} from './components/filters.js';
import {createCardTemplate} from './components/card.js';
import {createCardEditTemplate} from './components/card-edit.js';
import {createButtonTemplate} from './components/button.js';
import {createBoardTemplate} from './components/board.js';
import {getTask, getFilter} from './data.js';
import {Position, renderElement, unrenderElement} from './utils.js';
import Task from './components/task.js';

const tasksForRender = {
  MAX: 8,
  TOTAL: 16,
  renderedCount: 0,
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const allTasks = new Array(tasksForRender.MAX).fill(``).map(() => getTask());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFiltersTemplate(getFilter(allTasks)), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const tasksContainer = document.querySelector(`.board__tasks`);

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  renderElement(tasksContainer, task.getElement(), Position.BEFOREEND);
};

const taskMocks = new Array(tasksForRender.TOTAL).fill(``).map(getTask);
taskMocks.forEach((taskMock) => renderTask(taskMock));
