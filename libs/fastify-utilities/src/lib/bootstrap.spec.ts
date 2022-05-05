import { bootStrap, RegisterFastifyServerFunction } from "./bootstrap.js";
import { expect, assert } from "chai";
import sinon from "sinon";
import Sinon from "sinon";
import { FastifyInstance } from "fastify";
sinon.assert.expose(assert, { prefix: "" });
const register = async () => {
  return {
    listen: function (port: string | number) {
      return;
    },
  } as unknown as Partial<FastifyInstance>;
};

const callback = sinon.spy(register) as Sinon.SinonSpy;
let callBackReturn: Sinon.SinonSpy;
before(async function () {
  const registerResult = await register();
  callBackReturn = sinon.spy(registerResult.listen);
  bootStrap(callback, 3000);
});
describe("Bootstrap function", function () {
  it("Should call a Passed Register Function", function () {
    callback.calledOnce;
  });
  it("Should Call The listen function with 3000", function () {
    callBackReturn.calledOnceWith(3000);
  });
});
