/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from "@testing-library/react";
import EmojiPollButtons, { EmojiPollButtonsProps } from "../emoji-poll-buttons";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Create a mock store
const mockStore = configureStore([]);

const mockHandleEmotSelect = jest.fn();

const setup = (props: Partial<EmojiPollButtonsProps> = {}) => {
  const defaultProps: EmojiPollButtonsProps = {
    handleEmotSelect: mockHandleEmotSelect,
    _index: 0,
  };
  const mergedProps = { ...defaultProps, ...props };

  // Provide the mock store to the component
  const store = mockStore({
    Poll: {
      poll: [],
    },
  });

  render(
    <Provider store={store}>
      <EmojiPollButtons {...mergedProps} />
    </Provider>
  );
};

describe("EmojiPollButtons component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders buttons with icons and values", () => {
    setup();
    // expect(screen.getAllByTestId("btn-poll")).toHaveLength(3);
    expect(screen.getAllByTestId(/btn-poll-name/)).toHaveLength(3);
    expect(screen.getByText("Good")).toBeInTheDocument();
    expect(screen.getByText("Not Sure")).toBeInTheDocument();
    expect(screen.getByText("Bad")).toBeInTheDocument();
  });

  test("calls handleEmotSelect on button click", () => {
    setup();
    fireEvent.click(screen.getByText("Good"));
    expect(mockHandleEmotSelect).toHaveBeenCalledWith(
      { icon: "👍", value: "Good" },
      0
    );
  });

  test("changes opacity and transforms on icon hover", () => {
    setup();
    const textElement = screen.getByText("Good");
    const parentElement = textElement.parentElement;
    fireEvent.mouseOver(textElement);
    const computedStyles = window.getComputedStyle(textElement);
    const computedParentStyles = window.getComputedStyle(parentElement!);
    const opacity = computedStyles.getPropertyValue("opacity");
    const transform = computedParentStyles.getPropertyValue("transform");
    expect(opacity).toBe("1");
    expect(transform).toBe("translateY(-10px)");
  });

  test("resets opacity and transforms on icon mouse out", () => {
    setup();
    const textElement = screen.getByText("Good");
    fireEvent.mouseOver(textElement);
    fireEvent.mouseOut(textElement);
    const computedStyles = window.getComputedStyle(textElement);
    const opacity = computedStyles.getPropertyValue("opacity");
    expect(opacity).toBe("0");
  });
});
