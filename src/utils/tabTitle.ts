export const tabTitle = (title: string): string => {
  const siteName = document.title.split("|")[0];
  return siteName + " | " + title;
};
