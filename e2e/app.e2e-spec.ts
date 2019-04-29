import { ReportPortalPage } from './app.po';

describe('report-portal App', function() {
  let page: ReportPortalPage;

  beforeEach(() => {
    page = new ReportPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
