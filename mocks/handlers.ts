import { http, HttpResponse, delay } from "msw";
import { scenarios } from "./data/scenarios";
import { vehicles } from "./data/vehicles";
import { tasks } from "./data/tasks";
import { incidents } from "./data/incidents";
import { zones } from "./data/zones";

export const handlers = [
  http.get("/api/scenarios", async () => {
    await delay(300);

    return HttpResponse.json(scenarios);
  }),

  http.get("/api/scenarios/:id", async ({ params }) => {
    await delay(300);

    const scenario = scenarios.find((item) => item.id === params.id);

    if (!scenario) {
      return HttpResponse.json(
        { message: "Scenario not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(scenario);
  }),

  http.get("/api/vehicles", async () => {
    await delay(250);
    return HttpResponse.json(vehicles);
  }),

  http.get("/api/tasks", async () => {
    await delay(250);
    return HttpResponse.json(tasks);
  }),

  http.get("/api/incidents", async () => {
    await delay(250);
    return HttpResponse.json(incidents);
  }),

  http.get("/api/zones", async () => {
    await delay(250);
    return HttpResponse.json(zones);
  }),
];
