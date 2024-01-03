class ClientError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.statusCode = code;
  }
}

export { ClientError };
