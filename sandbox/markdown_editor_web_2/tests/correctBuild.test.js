const shell = require("shelljs");

function build() {
  // Run external tool synchronously
  return shell.exec("npm run build").code;
}

test("builds vue project", () => {
  expect(build()).toBe(0);
});
