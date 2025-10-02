export const convertToSelect = (data: any) => {
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
  }));
};
