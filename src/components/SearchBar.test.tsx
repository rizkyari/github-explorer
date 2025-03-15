import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { AnyAction, Middleware } from "redux";
import { RootState } from "../store/store";
import SearchBar from "./SearchBar";
import { fetchUsers } from "../store/slices/userSlice";

// Configure mock store with Redux Thunk
const middlewares: Middleware[] = [thunk as unknown as Middleware];

const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
const store = mockStore({
  users: { users: [], repos: {}, status: "idle" },
});

// Mock Redux dispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("SearchBar Component", () => {
  beforeEach(() => {
    store.clearActions(); // Clear any previous actions before each test
  });

  test("updates input field and triggers search", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Ensure input exists
    const input = screen.getByPlaceholderText("Enter GitHub username");
    expect(input).toBeInTheDocument();

    // Simulate user typing in search bar
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(input).toHaveValue("testuser");
  });

  test("clicking search button dispatches fetchUsers", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Simulate user typing
    const input = screen.getByPlaceholderText("Enter GitHub username");
    fireEvent.change(input, { target: { value: "testuser" } });

    // Mock dispatch
    store.dispatch = jest.fn();

    // Simulate clicking search button
    fireEvent.click(screen.getByText("Search"));

    // Ensure `fetchUsers` was dispatched
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fetchUsers("testuser"));
  });
});
