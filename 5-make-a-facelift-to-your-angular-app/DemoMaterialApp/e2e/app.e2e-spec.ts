import { DemoMaterialAppPage } from './app.po';

describe('demo-material-app App', () => {
  let page: DemoMaterialAppPage;

  beforeEach(() => {
    page = new DemoMaterialAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
