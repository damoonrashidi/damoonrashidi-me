import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = () => {
  const response = {
    results: [
      {
        objectId: 245,
        title: "Nesso 2025 Upsell",
        link: "http://example.com/1",
        created: "2025-03-01",
        priority: "HIGH",
        project: "Nesso",
        description: "Deal created 2025-03-01",
        reporter_type: "Account Manager",
        status: "In Progress",
        ticket_type: "Bug",
        updated: "2016-09-28",
        actions: [
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: "http://localhost:3001/i/quote",
            label: "Manage deal",
          },
        ],
      },
      {
        objectId: 246,
        title: "Nesso 2025 Upsell v2",
        link: "http://example.com/1",
        created: "2025-03-01",
        priority: "HIGH",
        project: "Nesso",
        description: "Deal created 2025-03-01",
        reporter_type: "Account Manager",
        status: "In Progress",
        ticket_type: "Bug",
        updated: "2016-09-28",
        actions: [
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: "http://localhost:3001/i/quote",
            label: "Manage deal",
          },
        ],
      },
    ],
  };

  return Response.json(response);
};
