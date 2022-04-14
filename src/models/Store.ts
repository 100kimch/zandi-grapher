export class AppStore {
  isPageLoading: boolean;
  storedVersion = '';

  constructor() {
    this.isPageLoading = false;
    return { ...this };
  }
}
