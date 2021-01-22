const { compareObjects } = require('../src/diff');
const { Mutation } = require('../src/diff/mutation');

describe('tests/diff.spec.js', () => {
  describe('Определение разницы между двумя объектами', () => {
    test('Определяется отсутствие разницы между двумя пустыми объектами', () => {
      const objectA = {};
      const objectB = {};

      const difference = compareObjects(objectA, objectB);

      expect(difference).toStrictEqual({});
    });

    test('Определяется отсутствие разницы между двумя объектами с одним идентичным свойством', () => {
      const objectA = { propertyA: 'valueA' };
      const objectB = { propertyA: 'valueA' };

      const difference = compareObjects(objectA, objectB);

      expect(difference).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.UNCHANGED
        }
      });
    });

    test('Определяется отсутствие разницы между двумя объектами с двумя идентичными свойствами', () => {
      const objectA = { propertyA: 'valueA', propertyB: 'valueB' };
      const objectB = { propertyA: 'valueA', propertyB: 'valueB' };

      const difference = compareObjects(objectA, objectB);

      expect(difference).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'valueB',
          mutation: Mutation.UNCHANGED
        }
      });
    });

    test('Определяется добавление одного нового свойства относительно пустого объекта', () => {
      const objectA = {};
      const objectB = { propertyA: 'valueA' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          newValue: 'valueA',
          mutation: Mutation.ADDED
        }
      });
    });

    test('Определяется добавление двух новых свойств относительно пустого объекта', () => {
      const objectA = {};
      const objectB = { propertyA: 'valueA', propertyB: 'valueB' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          newValue: 'valueA',
          mutation: Mutation.ADDED
        },
        propertyB: {
          newValue: 'valueB',
          mutation: Mutation.ADDED
        }
      });
    });

    test('Определяется добавление одного нового свойства относительно непустого объекта', () => {
      const objectA = { propertyA: 'valueA' };
      const objectB = { propertyA: 'valueA', propertyB: 'valueB' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          newValue: 'valueB',
          mutation: Mutation.ADDED
        }
      });
    });

    test('Определяется добавление двух новых свойств относительно непустого объекта', () => {
      const objectA = { propertyA: 'valueA' };
      const objectB = { propertyA: 'valueA', propertyB: 'valueB', propertyC: 'valueC' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          newValue: 'valueB',
          mutation: Mutation.ADDED
        },
        propertyC: {
          newValue: 'valueC',
          mutation: Mutation.ADDED
        }
      });
    });

    test('Определяется удаление одного свойства относительно пустого объекта', () => {
      const objectA = { propertyA: 'valueA' };
      const objectB = {};

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.REMOVED
        }
      });
    });

    test('Определяется удаление двух свойств относительно пустого объекта', () => {
      const objectA = { propertyA: 'valueA', propertyB: 'valueB' };
      const objectB = {};

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.REMOVED
        },
        propertyB: {
          oldValue: 'valueB',
          mutation: Mutation.REMOVED
        }
      });
    });

    test('Определяется удаление одного свойства относительно непустого объекта', () => {
      const objectA = { propertyA: 'valueA', propertyB: 'valueB' };
      const objectB = { propertyA: 'valueA' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'valueB',
          mutation: Mutation.REMOVED
        }
      });
    });

    test('Определяется удаление двух свойств относительно непустого объекта', () => {
      const objectA = { propertyA: 'valueA', propertyB: 'valueB', propertyC: 'valueC' };
      const objectB = { propertyA: 'valueA' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'valueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'valueB',
          mutation: Mutation.REMOVED
        },
        propertyC: {
          oldValue: 'valueC',
          mutation: Mutation.REMOVED
        }
      });
    });

    test('Определяется обновление единственного свойства объекта', () => {
      const objectA = { propertyA: 'oldValueA' };
      const objectB = { propertyA: 'newValueA' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          newValue: 'newValueA',
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление единственного свойства объекта значением другого типа', () => {
      const objectA = { propertyA: 'oldValueA' };
      const objectB = { propertyA: 0 };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          newValue: 0,
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление двух свойств объекта', () => {
      const objectA = { propertyA: 'oldValueA', propertyB: 'oldValueB' };
      const objectB = { propertyA: 'newValueA', propertyB: 'newValueB' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          newValue: 'newValueA',
          mutation: Mutation.UPDATED
        },
        propertyB: {
          oldValue: 'oldValueB',
          newValue: 'newValueB',
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление двух свойств объекта значениями другого типа', () => {
      const objectA = { propertyA: 'oldValueA', propertyB: 'oldValueB' };
      const objectB = { propertyA: 0, propertyB: 1 };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          newValue: 0,
          mutation: Mutation.UPDATED
        },
        propertyB: {
          oldValue: 'oldValueB',
          newValue: 1,
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление одного из двух свойств объекта', () => {
      const objectA = { propertyA: 'oldValueA', propertyB: 'oldValueB' };
      const objectB = { propertyA: 'oldValueA', propertyB: 'newValueB' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'oldValueB',
          newValue: 'newValueB',
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление одного из двух свойств объекта значением другого типа', () => {
      const objectA = { propertyA: 'oldValueA', propertyB: 'oldValueB' };
      const objectB = { propertyA: 'oldValueA', propertyB: 0 };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'oldValueB',
          newValue: 0,
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление двух из трёх свойств объекта', () => {
      const objectA = { propertyA: 'oldValueA', propertyB: 'oldValueB', propertyC: 'oldValueC' };
      const objectB = { propertyA: 'oldValueA', propertyB: 'newValueB', propertyC: 'newValueC' };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'oldValueB',
          newValue: 'newValueB',
          mutation: Mutation.UPDATED
        },
        propertyC: {
          oldValue: 'oldValueC',
          newValue: 'newValueC',
          mutation: Mutation.UPDATED
        }
      });
    });

    test('Определяется обновление двух из трёх свойств объекта значениями другого типа', () => {
      const objectA = { propertyA: 'oldValueA', propertyB: 'oldValueB', propertyC: 'oldValueC' };
      const objectB = { propertyA: 'oldValueA', propertyB: 0, propertyC: 1 };

      const result = compareObjects(objectA, objectB);

      expect(result).toStrictEqual({
        propertyA: {
          oldValue: 'oldValueA',
          mutation: Mutation.UNCHANGED
        },
        propertyB: {
          oldValue: 'oldValueB',
          newValue: 0,
          mutation: Mutation.UPDATED
        },
        propertyC: {
          oldValue: 'oldValueC',
          newValue: 1,
          mutation: Mutation.UPDATED
        }
      });
    });
  });
});
