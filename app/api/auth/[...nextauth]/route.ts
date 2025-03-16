import { handlers } from "@/auth"

export const GET = async (req: Request) => {
  console.log('GET request to [...nextauth]');
  return handlers.GET(req);
};

export const POST = async (req: Request) => {
  console.log('POST request to [...nextauth]');
  return handlers.POST(req);
};

export const PUT = async (req: Request) => {
  console.log('PUT request to [...nextauth]');
  return handlers.PUT(req);
};