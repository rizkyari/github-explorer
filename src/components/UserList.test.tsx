import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserList from "./UserList";

const mockStore = configureStore();
const store = mockStore({
  users: {
    users: [{ login: "testuser", avatar_url: "https://example.com/avatar.png"  }],
    repos: {},
    status: "idle",
  },
});

describe("UserList Component", () => {
  test("renders user list", () => {
    render(
      <Provider store={store}>
        <UserList users={[{ login: "testuser", avatar_url: "https://example.com/avatar.png"  }]} />
      </Provider>
    );

    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  test("expands and collapses user repositories", async () => {
    render(
      <Provider store={store}>
        <UserList users={[{ login: "testuser", avatar_url: "https://example.com/avatar.png"  }]} />
      </Provider>
    );

    fireEvent.click(screen.getByText("testuser"));

    expect(screen.getByText("Loading repositories...")).toBeInTheDocument();
  });
});
