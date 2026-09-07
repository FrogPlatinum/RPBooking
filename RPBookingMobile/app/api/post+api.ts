export function GET(request: Request) {
  const data = {
    events: [
    {
      id: 1,
      name: "Sejt Event"
    },
    {
      id: 2,
      name: "Endnu et sejt event"
    },
    {
      id: 3,
      name: "Og ENDNU et sejt event"
    },
  ],
    
  };
  return Response.json(data);
}
