import {createMainMenuTemplate} from './components/main-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createFiltersTemplate} from './components/filters.js';
import {createCardTemplate} from './components/card.js';
import {createCardEditTemplate} from './components/card-edit.js';
import {createButtonTemplate} from './components/button.js';
import {createBoardTemplate} from './components/board.js';
import {getTask, getFilter} from './data.js';

const tasksForRender = {
  MAX: 8,
  TOTAL: 16,
  renderedCount: 0,
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const allTasks = new Array(tasksForRender.TOTAL).fill(``).map(() => getTask());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFiltersTemplate(getFilter(allTasks)), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(taskListElement, createCardEditTemplate(allTasks[0]), `beforeend`);

const renderCards = (fromCard, toCard) => {
  for (const task of allTasks.slice(fromCard, toCard)) {
    render(taskListElement, createCardTemplate(task), `beforeend`);
  }
  tasksForRender.renderedCount += tasksForRender.MAX;
  tasksForRender.renderedCount = tasksForRender.renderedCount > allTasks.length ? allTasks.length : tasksForRender.renderedCount;
};

renderCards(tasksForRender.renderedCount + 1, tasksForRender.MAX + tasksForRender.renderedCount);

if (tasksForRender.renderedCount < allTasks.length) {
  render(boardElement, createButtonTemplate(`load-more`, `load more`), `beforeend`);
}

const loadMoreButton = document.querySelector(`.load-more`);
if (loadMoreButton) {
  loadMoreButton.addEventListener(`click`, function () {
    if (allTasks.length > tasksForRender.renderedCount) {
      renderCards(tasksForRender.renderedCount, tasksForRender.MAX + tasksForRender.renderedCount);
    }

    if (tasksForRender.renderedCount >= allTasks.length) {
      loadMoreButton.style.display = `none`;
    } else {
      loadMoreButton.style.display = `block`;
    }
  });
}
