import { Before } from 'cucumber';
import { HookHandler } from '../hook-handler.interface';
import chalk from 'chalk';
import parameters from '../../../parameters';
import fixturesLoader from '../../../fixtures/fixtures-loader.helper';

const logRequestTime = timeStart => {
  const timeDiff = process.hrtime(timeStart);

  console.log(chalk.black.bgYellow('Request took ' + (timeDiff[0] + timeDiff[1] / 1000000000) + ' seconds'));
};

class ReloadFixturesHook implements HookHandler {
  public handleHook() {
    Before('@reloadFixtures', (scenario, callback) => {
      console.log(chalk.black.bgYellow('Reloading fixtures'));

      const timeStart = process.hrtime();

      fixturesLoader
        .reloadFixtures(parameters.getReloadFixturesEndpoint())
        .then(response => {
          if (response.status === 200) {
            console.log(chalk.black.bgGreen('Fixtures reloaded'));
          } else {
            console.log(chalk.black.bgRed('There was a problem with fixtures reloading. The response is: '), response);
          }

          logRequestTime(timeStart);

          callback();
        })
        .catch(error => {
          console.log(chalk.black.bgRed('An error occurred during fixtures reloading: '), error);

          logRequestTime(timeStart);

          callback();
        });
    });
  }

  public getPriority() {
    return 990;
  }
}

export const reloadFixturesHook = new ReloadFixturesHook();
