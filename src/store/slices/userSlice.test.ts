import { fetchUsers, fetchRepos } from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./userSlice";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../../utils/githubApi";

const server = setupServer(
  http.get(`${API_BASE_URL}/search/users`, async ({ request }) => 
    HttpResponse.json({ items: [{ login: "testuser", id: 1 }] })
  ),

  http.get(`${API_BASE_URL}/users/:username/repos`, async ({ params }) => 
    HttpResponse.json([{ id: 1, name: "test-repo", stargazers_count: 10 }])
  )
);

const createTestStore = () => configureStore({
  reducer: { users: userReducer }
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("userSlice", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  test("should return the initial state", () => {
    expect(store.getState().users).toEqual({
      users: [],
      repos: {},
      status: "idle",
    });
  });

  test("should handle fetchUsers.fulfilled", async () => {
    await store.dispatch(fetchUsers("testuser") as any);
    expect(store.getState().users.users).toHaveLength(1);
    expect(store.getState().users.users[0].login).toBe("testuser");
  });

  test("should handle fetchRepos.fulfilled", async () => {
    await store.dispatch(fetchRepos("testuser") as any);
    expect(store.getState().users.repos["testuser"]).toHaveLength(1);
    expect(store.getState().users.repos["testuser"][0].name).toBe("test-repo");
  });
});
