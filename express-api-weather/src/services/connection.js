import { connect } from "mongoose";

export class MongoseConnection {
  constructor(uri) {
    this.uri = uri;
  }

  connection() {
    connect(this.uri)
      .then(() => console.log("DB connected"))
      .catch((err) => console.log(err.message));
  }
}
