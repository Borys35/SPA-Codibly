import Button from "@mui/material/Button";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import Renderer, { ReactTestRenderer } from "react-test-renderer";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Error from "../Error";

expect.extend(matchers);

describe("Error", () => {
  let renderer: ReactTestRenderer;

  beforeEach(() => {
    renderer = Renderer.create(
      <Error
        error="TEST_ERROR"
        onRefetchClick={() => {}}
        data-testid="error-1"
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("check if error renders correctly", () => {
    expect(renderer.toTree()).toMatchSnapshot();
  });

  it("check if error button works", () => {
    expect(typeof renderer.root.findByType(Button).props.onClick).toBe(
      "function"
    );
  });
});
