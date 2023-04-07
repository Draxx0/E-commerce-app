export const findAll = async (model: string): Promise<unknown> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${model}`);
  const data = await response.json();
  return data;
};
