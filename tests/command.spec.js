const { Command } = require('../src/app/command');
const { createCommandParser } = require('../src/app/command/parser');

describe('tests/command-parser.spec.js', () => {
  describe('Определение команды приложения для набора аргументов командной строки', () => {
    describe('Определяется команда вывода справочной информации', () => {
      test.each([
        [['/usr/bin/node', '/home/username/script.js', '-h']],
        [['/usr/bin/node', '/home/username/script.js', '--help']]
      ])('Определяется команда вывода справочной информации для набора аргументов %j', (argv) => {
        const sut = createCommandParser();

        const command = sut.parseCommand(argv);

        expectHelpCommand(command);
      });

      test.each([
        [['/usr/bin/node', '/home/username/script.js', '-u']],
        [['/usr/bin/node', '/home/username/script.js', '--unknown']]
      ])('Определяется команда вывода справочной информации для неизвестного набора аргументов %j', (argv) => {
        const sut = createCommandParser();

        const command = sut.parseCommand(argv);

        expectHelpCommand(command);
      });

      test('Определяется команда вывода справочной информации для пустого набора аргументов', () => {
        const sut = createCommandParser();
        const argv = ['/usr/bin/node', '/home/username/script.js'];

        const command = sut.parseCommand(argv);

        expectHelpCommand(command);
      });

      function expectHelpCommand(command) {
        expect(command).toStrictEqual({ key: Command.HELP });
      }
    });

    describe('Определяется команда вывода версии приложения', () => {
      test.each([
        [['/usr/bin/node', '/home/username/script.js', '-V']],
        [['/usr/bin/node', '/home/username/script.js', '--version']]
      ])('Определяется команда вывода версии приложения для набора аргументов %j', (argv) => {
        const sut = createCommandParser();

        const command = sut.parseCommand(argv);

        expect(command).toStrictEqual({ key: Command.VERSION });
      });
    });
  });
});
