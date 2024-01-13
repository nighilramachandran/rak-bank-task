import { render, screen } from "@testing-library/react";
import VerticalCarousel, { carouslProps } from "../vertical-carousel";

const setup = (props: Partial<carouslProps> = {}) => {
  const defaultProps: carouslProps = {
    slides: [
      { description: "Question 1", polling: <div>Emot Slide 1</div> },
      { description: "Question 2", polling: <div>Emot Slide 2</div> },
    ],
    currentSlide: 0,
    type: "question",
  };
  const mergedProps = { ...defaultProps, ...props };

  render(<VerticalCarousel {...mergedProps} />);
};

describe("VerticalCarousel component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders question slide with description", () => {
    setup();
    const text = screen.getByTestId("type-question-index-0").textContent;
    expect(text).toBe("Question 1");
    expect(text).not.toBe("Question 2");
    expect(text).not.toBe("Emot Slide 1");
  });

  test("renders emot slide with polling content", () => {
    setup({ type: "emot" });
    const text = screen.getByTestId("type-emot-index-0").textContent;
    expect(text).toBe("Emot Slide 1");
    expect(text).not.toBe("Emot Slide 2");
    expect(text).not.toBe("Question 1");
  });
});
