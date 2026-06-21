export class ContactLimitReachedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactLimitReachedError';
  }
}
