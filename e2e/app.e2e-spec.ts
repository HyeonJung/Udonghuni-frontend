import { UdonghuniFrontPage } from './app.po';

describe('udonghuni-front App', () => {
  let page: UdonghuniFrontPage;

  beforeEach(() => {
    page = new UdonghuniFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
