function composeFromFiles(folderPaths, updateTypes) {}

function compose(sources) {
  const result = [];

  sources.forEach(source => {
    const dateItems = result.filter(dateItem => dateItem.date === source.date);
    const isAdded = dateItems.length;

    const dateItem = isAdded ? dateItems[0] : { date: source.date };

    const attributes = Object.keys(source).filter(key => key !== 'date');
    attributes.forEach(attribute => {
      dateItem[attribute] = source[attribute];
    });

    if (!isAdded) result.push(dateItem);
  });

  return result;
}

module.exports = {
  compose
};
