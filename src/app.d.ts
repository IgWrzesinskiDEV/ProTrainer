// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lib/lucia/auth.ts").Auth;
  //type DatabaseUserAttributes = {};
  //type DatabaseSessionAttributes = {};
}
