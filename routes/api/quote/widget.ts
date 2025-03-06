import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = () => {
  return Response.json({
    type: "IFRAME",
    width: 890,
    height: 748,
    uri: "https://witty-sides-check.loca.lt/",
    label: "Edit",
    associatedObjectProperties: [],
  });
};
