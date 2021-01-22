const { Mutation } = require('./mutation');

function compareObjects(objectA, objectB) {
  return assign(
    compareObjectAwithObjectB(objectA, objectB),
    compareObjectBwithObjectA(objectB, objectA)
  );
}

function compareObjectAwithObjectB(objectA, objectB) {
  return Object.keys(objectA).reduce((mutations, key) => {
    const oldValue = get(objectA, key);
    const newValue = get(objectB, key);
    const mutation = has(objectB, key)
      ? oldValue === newValue
        ? unchanged(oldValue)
        : updated(oldValue, newValue)
      : removed(oldValue);
    return assign(mutations, { [key]: mutation });
  }, {});
}

function compareObjectBwithObjectA(objectB, objectA) {
  return Object.keys(objectB).reduce((mutations, key) => {
    return has(objectA, key)
      ? mutations
      : assign(mutations, { [key]: added(get(objectB, key)) });
  }, {});
}

function get(target, key) {
  return Reflect.get(target, key);
}

function has(target, key) {
  return Reflect.has(target, key);
}

function assign(target, source) {
  return Object.assign(target, source);
}

function added(newValue) {
  return { mutation: Mutation.ADDED, newValue };
}

function removed(oldValue) {
  return { mutation: Mutation.REMOVED, oldValue };
}

function updated(oldValue, newValue) {
  return { mutation: Mutation.UPDATED, oldValue, newValue };
}

function unchanged(oldValue) {
  return { mutation: Mutation.UNCHANGED, oldValue };
}

module.exports = { compareObjects };
