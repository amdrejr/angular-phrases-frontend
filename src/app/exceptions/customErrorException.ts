
export class customErrorException extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ErrorException';
    this.status = status;
  }
}
