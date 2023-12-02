import * as generalCommands from './commands/general';
import * as storageModalCommands from './commands/storageModal';
import * as networkCommands from './commands/network';

Cypress.Commands.addAll(generalCommands);
Cypress.Commands.addAll(storageModalCommands);
Cypress.Commands.addAll(networkCommands);

export {};

