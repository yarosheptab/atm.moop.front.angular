export const environment = {
  production: true,
  get appUrl(): string {
    return window.location.host;
  },
  get backApi(): string {
    return `${this.appUrl}/api`
  }
};
