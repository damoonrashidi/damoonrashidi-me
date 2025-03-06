import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    console.log(searchParams);

    // "userId", "78155026" ],
    //    [ "userEmail", "damoon.rashidi@plock.io" ],
    //    [ "associatedObjectId", "148018975992" ],
    //    [ "associatedObjectType", "DEAL" ],
    //    [ "portalId", "145871305" ],
    //    [ "hs_object_id", "148018975992" ],
    //    [ "dealname", "Nesso 2025" ],
    //    [ "dealtype", "newbusiness" ]

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
              width: 1100,
              height: 900,
              uri: `http://localhost:3001/i/quote?${searchParams.toString()}`,
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
              width: 1100,
              height: 900,
              uri: `http://localhost:3001/i/quote?${searchParams.toString()}`,
              label: "Manage deal",
            },
          ],
        },
      ],
    };

    return Response.json(response);
  },
};
