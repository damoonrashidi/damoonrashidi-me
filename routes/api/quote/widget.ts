import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = () => {
  const response = {
    results: [
      {
        objectId: 245,
        title: "API-22: APIs working too fast",
        link: "http://example.com/1",
        created: "2016-09-15",
        priority: "HIGH",
        project: "API",
        description:
          "Customer reported that the APIs are just running too fast. This is causing a problem in that they're so happy.",
        reporter_type: "Account Manager",
        status: "In Progress",
        ticket_type: "Bug",
        updated: "2016-09-28",
        actions: [
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: "https://damoonrashidi.me/iframe",
            label: "Edit",
            associatedObjectProperties: [],
          },
        ],
      },
    ],
    primaryAction: {
      type: "IFRAME",
      width: 890,
      height: 748,
      uri: "https://damoonrashidi.me/iframe",
      label: "Settings",
    },
  };

  return Response.json(response);
};
