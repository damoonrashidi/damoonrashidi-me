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
    //    [ "dealname", "Adlibris 2025" ],
    //    [ "dealtype", "newbusiness" ]

    console.log(
      `routing to http://localhost:3001/i/quote?${searchParams.toString()}`,
    );

    const response = {
      results: [
        {
          objectId: 245,
          title: "Adlibris 2025 Upsell",
          link: "http://example.com/1",
          created: "2025-03-01",
          priority: "HIGH",
          project: "Adlibris",
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
          title: "Adlibris Tracking only",
          link: "http://example.com/1",
          created: "2025-03-01",
          priority: "HIGH",
          project: "Adlibris",
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
      primaryAction: {
        type: "IFRAME",
        width: 1100,
        height: 900,
        uri: `http://localhost:3001/i/quote?${searchParams.toString()}`,
        label: "Create Quote",
        associatedObjectProperties: [],
        buttonType: "PRIMARY",
      },
    };

    return Response.json(response);
  },
};
