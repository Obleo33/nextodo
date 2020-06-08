import * as React from "react";
import moment from "moment";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount, shallow } from "enzyme";
import TodoCard from "./TodoCard";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

configure({ adapter: new Adapter() });

const testCardProps = {
  id: "abcde",
  task: "Test",
  completed: false,
  date: moment(),
  index: 2,
  fullArr: [{}, {}, {}],
};

describe("<TodoCard />", () => {
  it("renders the card", () => {
    const wrapper = mount(<TodoCard {...testCardProps} />);
    const testCard = wrapper.find(TodoCard);
    expect(testCard).toHaveLength(1);
  });
});
