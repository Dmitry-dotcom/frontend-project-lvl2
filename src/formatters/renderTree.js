
const makeIndent = (count) => `${' '.repeat(count)}`;
const defaultIndent = 4;

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }

  const keys = Object.keys(value);

  return keys.map((key) => {
    const currentValue = value[key];

    return `{\n${makeIndent(defaultIndent * depth)}${key}: ${currentValue}\n${makeIndent((defaultIndent * depth) - defaultIndent)}}`;
  });
};

const renderTree = (ast, depth = 1) => {
  const result = ast.map((node) => {
    const {
      name,
      type,
      value,
      newValue,
      oldValue,
      children,
    } = node;

    const strWithNewVal = `${makeIndent((defaultIndent * depth) - (defaultIndent / 2))}+ ${name}: ${stringify(newValue, depth + 1)}`;
    const strWithOldVal = `${makeIndent((defaultIndent * depth) - (defaultIndent / 2))}- ${name}: ${stringify(oldValue, depth + 1)}`;

    switch (type) {
      case 'nested':
        return `${makeIndent(defaultIndent * depth)}${name}: ${renderTree(children, depth + 1)}`;
      case 'unchanged':
        return `${makeIndent(defaultIndent * depth)}${name}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return `${strWithNewVal}\n${strWithOldVal}`;
      case 'added':
        return `${makeIndent((defaultIndent * depth) - (defaultIndent / 2))}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'deleted':
        return `${makeIndent((defaultIndent * depth) - (defaultIndent / 2))}- ${name}: ${stringify(value, depth + 1)}`;
      default:
        throw new Error(`ERROR: unknown node type - ${type}`);
    }
  });

  return `{\n${result.join('\n')}\n${makeIndent((defaultIndent * depth) - defaultIndent)}}`;
};

export default renderTree;