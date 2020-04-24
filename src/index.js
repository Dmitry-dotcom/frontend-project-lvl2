import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import makeAst from './makeAst.js';
import getFormatter from './formatters/index.js';

const getFileData = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const type = path.extname(fileName).slice(1);
  const content = fs.readFileSync(absolutePath, 'utf-8');

  return { content, type };
};

const makeDiff = (firstFileName, secondFileName, format) => {
  const firstData = getFileData(firstFileName);
  const secondData = getFileData(secondFileName);

  const ast = makeAst(parse(firstData), parse(secondData));
  const makeOutput = getFormatter(format);

  return makeOutput(ast);
};

export default makeDiff;
