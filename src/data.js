import {getRandomBoolean, getCountForFilter} from './utils.js';

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + Math.floor((Math.random() - 0.5) * 2 * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'Mo': getRandomBoolean(),
    'Tu': false,
    'We': getRandomBoolean(),
    'Th': false,
    'Fr': false,
    'Sa': false,
    'Su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `awesome`,
    `awful`
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});

export const getFilter = (tasks) => [
  {
    title: `All`,
    count: getCountForFilter(tasks, `all`)
  },
  {
    title: `Overdue`,
    count: getCountForFilter(tasks, `overdue`),
  },
  {
    title: `Today`,
    count: getCountForFilter(tasks, `today`),
  },
  {
    title: `Favorites`,
    count: getCountForFilter(tasks, `favorites`),
  },
  {
    title: `Repeating`,
    count: getCountForFilter(tasks, `repeating`),
  },
  {
    title: `Tags`,
    count: getCountForFilter(tasks, `tags`),
  },
  {
    title: `Archive`,
    count: getCountForFilter(tasks, `archive`),
  }
];
