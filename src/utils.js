export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getCountForFilter = function (list, filter) {
  let count = 0;
  switch (filter) {
    case `all`:
      count = list.length;
      break;
    case `overdue`:
      count = (list.filter((task) => task.dueDate > Date.now())).length;
      break;
    case `today`:
      count = (list.filter((task) => (task.dueDate > Date.now() - 24 * 60 * 60 * 1000) && (task.dueDate < Date.now() + 24 * 60 * 60 * 1000))).length;
      break;
    case `favorites`:
      count = list.filter((task) => task.isFavorite === true).length;
      break;
    case `repeating`:
      count = list.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])).length;
      break;
    case `tags`:
      count = list.filter((task) => task.tags.size > 0).length;
      break;
    case `archive`:
      count = list.filter((task) => task.isArchive === true).length;
      break;
  }
  return count;
};
