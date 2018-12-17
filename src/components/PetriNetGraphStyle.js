import oneToken from '../images/one-token.svg';
import twoTokens from '../images/two-tokens.svg';
import threeTokens from '../images/three-tokens.svg';
import fourTokens from '../images/four-tokens.svg';
import fiveTokens from '../images/five-tokens.svg';
import sixTokens from '../images/six-tokens.svg';
import sevenTokens from '../images/seven-tokens.svg';
import eightTokens from '../images/eight-tokens.svg';
import nineTokens from '../images/nine-tokens.svg';

const primaryColor = '#404040';
const secondaryColor = '#BFBFBF';
const selectedColor = '#1890ff';
const textColor = '#242424';
const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const fontSize = 12;

const generateImageWithNumber = (number) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
      <text x="50%" y="50%" dy=".3em" fill="black" style='font-family: ${fontFamily}; font-size: 20px; text-anchor: middle;'>
        ${number}
      </text>
    </svg>
  `;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const cachedImages = {};
const getImageWithNumber = (number) => {
  if (cachedImages[number] === undefined) {
    cachedImages[number] = generateImageWithNumber(number);
  }
  return cachedImages[number];
}

const tokenImages = [
  oneToken, twoTokens, threeTokens, fourTokens, fiveTokens,
  sixTokens, sevenTokens, eightTokens, nineTokens,
];
const getBackgroundImageOfPlace = (place) => {
  const number = place.data('numberOfTokens');
  if (number === 0) {
    return [];
  }
  else if (number < 10) {
    return tokenImages[number - 1];
  }

  return getImageWithNumber(number);
}

export default [
  {
    selector: '*',
    style: {
      'font-size': fontSize,
      'font-family': fontFamily,
      'color': textColor,
    },
  },
  {
    selector: 'node',
    style: {
      'border-color': primaryColor,
      'border-width': 2,
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 10,
      'background-color': secondaryColor,
      'background-fit': 'cover',
      'label': 'data(label)',
    }
  },
  {
    selector: 'node.highlighted',
    style: {
      'background-color': selectedColor,
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-color': selectedColor,
    }
  },
  {
    selector: 'node.place',
    style: {
      'height': 80,
      'width': 80,
      'background-image': (element) => getBackgroundImageOfPlace(element),
    },
  },
  {
    selector: 'node.transition',
    style: {
      'shape': 'rectangle',
      'height': 80,
      'width': 20,
    },
  },
  {
    selector: 'node.token',
    style: {
      'height': 10,
      'width': 10,
      'background-color': 'black',
      'border-width': 0,
    },
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'target-arrow-shape': 'triangle',
      'line-color': primaryColor,
      'target-arrow-color': primaryColor,
      'curve-style': 'bezier',
      'label': 'data(weight)',
      'text-margin-y': 14,
    },
  },
  {
    selector: 'edge:selected',
    style: {
      'line-color': selectedColor,
      'target-arrow-color': selectedColor,
    },
  },
  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      'opacity': 0
    },
  },
];
