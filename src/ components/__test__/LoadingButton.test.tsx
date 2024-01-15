import { render, screen, fireEvent } from "@testing-library/react";
import LoadingButton from "../loading-button";

describe("LoadingButton component", () => {
  test("renders button with children", () => {
    render(
      <LoadingButton onClick={() => {}} loading={false}>
        Click me
      </LoadingButton>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("renders disabled button when loading is true", () => {
    render(
      <LoadingButton onClick={() => {}} loading={true}>
        Click me
      </LoadingButton>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("renders enabled button when loading is false", () => {
    render(
      <LoadingButton onClick={() => {}} loading={false}>
        Click me
      </LoadingButton>
    );
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  test("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();
    render(
      <LoadingButton onClick={onClickMock} loading={false}>
        Click me
      </LoadingButton>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  test("renders CircularProgress when loading is true", () => {
    render(
      <LoadingButton onClick={() => {}} loading={true}>
        Click me
      </LoadingButton>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("does not render CircularProgress when loading is false", () => {
    render(
      <LoadingButton onClick={() => {}} loading={false}>
        Click me
      </LoadingButton>
    );
    expect(screen.queryByRole("progressbar")).toBeNull();
  });
  test("match the snapshot", () => {
    const container = document.body;
    expect(container).toMatchSnapshot();
  });
});
