const mockElement = (cy, params) => {
  const el = {
    _addEventFields: (event) => ({ target: el, ...event }),
    _json: () => ( cy._json[cy._jsonIndex(el.id())] ),
    cy: jest.fn(() => ( cy )),
    classes: jest.fn(() => ( el._json.classes )),
    data: jest.fn(() => ( el._json().data )),
    group: jest.fn(() => ( params.group )),
    emit: jest.fn((event) => ( cy.emit(el._addEventFields(event)) )),
    id: jest.fn(() => ( params.data.id )),
    json: jest.fn((json) => ( json ? cy._json[cy._jsonIndex(el.id())] = json : el._json() )),
    position: jest.fn((position) => ( position ? el._json().position = position : el._json().position )),
    remove: jest.fn(() => ( cy._elements = cy._elements.filter(el => el !== this) )),
    select: jest.fn(() => ( el.emit({ type: 'select' }) )),
    source: jest.fn(() => ( cy.elements(`#${el.data().source}`).first() )),
    sourceEndpoint: jest.fn(() => ( el.source().position() )),
    target: jest.fn(() => ( cy.elements(`#${el.data().target}`).first() )),
    targetEndpoint: jest.fn(() => ( el.target().position() )),
  };
  return el;
};

const mockCollection = (elements) => ({
  length: elements.length,
  emit: (event) => elements.forEach(element => element.emit(event)),
  first: () => elements[0],
  json: (json) => elements.forEach(element => element.json(json)),
  remove: () => elements.forEach(element => element.remove()),
});

const mockCore = (options) => {
  const cy = {
    _addEventFields: (event) => ({ cy, target: cy, ...event }),
    _container: options.container,
    _eventHandlers: {},
    _json: options.elements,
    _jsonIndex: (id) => cy._json.findIndex(json => json.data.id === id),
    _layout: options.layout,
    _maxZoom: options.maxZoom,
    _style: options.style,
    add: jest.fn((json) => {
      cy._json.push(json);
      const element = mockElement(cy, json);
      cy._elements.push(element);
      return element;
    }),
    container: jest.fn(() => ( cy._container )),
    edgehandles: jest.fn(),
    elements: jest.fn((selector) => { // expects selector with id, e.g. #petri-net-1
      const id = selector.substring(1);
      return mockCollection(cy._elements.filter(el => el.id() === id));
    }),
    emit: jest.fn((event) => {
      if (cy._eventHandlers[event.type] === undefined) {
        return;
      }
      cy._eventHandlers[event.type].forEach(handler => handler(cy._addEventFields(event)));
    }),
    json: jest.fn(() => ( cy._json )),
    layout: jest.fn((layout = undefined) => ( layout ? cy._layout = layout : cy._layout )),
    maxZoom: jest.fn((maxZoom = undefined) => ( maxZoom ? cy._maxZoom = maxZoom : cy._maxZoom )),
    on: jest.fn((type, callback) => {
      if (cy._eventHandlers[type] === undefined) {
        cy._eventHandlers[type] = [];
      }
      cy._eventHandlers[type].push(callback);
    }),
    style: jest.fn((style = undefined) => ( style ? cy._style = style : cy._style)),
  };
  cy._elements = options.elements.map(element => mockElement(cy, element));
  return cy;
};

const cytoscape = jest.fn().mockImplementation(mockCore);
cytoscape.use = jest.fn(ext => ext(cytoscape));
export default cytoscape;
